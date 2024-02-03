import { Component, OnInit } from '@angular/core';
import { AskmeService } from './askme.service';






@Component({
  selector: 'app-askme',
  templateUrl: './askme.component.html',
  styleUrls: ['./askme.component.scss']
})



export class AskmeComponent  {
  questions: any[] = [];
  newQuestion: string = '';
  unansweredQuestions: any[] = [];
  unansweredCount: number = 0;
  showUnansweredQuestions: boolean = false;

 
  


  constructor(
    private chatService: AskmeService,
  ) {}

  ngOnInit(): void {
    // Fetch questions on component initialization
    this.fetchQuestions();
  }

  

  
  // formatTimestamp(timestamp: string): string {
  //   const formattedDate = this.datePipe.transform(timestamp, 'hh:mm a, dd/MM/yyyy');
  //   return formattedDate ? formattedDate : timestamp;
  // }

  formatTimestamp(timestamp: string): string {
    try {
      // Replace 'T' with ' , '
      let formattedTimestamp = timestamp.replace('T', ' , ');
  
      // Take the part until the second occurrence of ':'
      const indexOfFirstColon = formattedTimestamp.indexOf(':');
      if (indexOfFirstColon >= 0) {
        const indexOfSecondColon = formattedTimestamp.indexOf(':', indexOfFirstColon + 1);
        if (indexOfSecondColon >= 0) {
          formattedTimestamp = formattedTimestamp.substring(0, indexOfSecondColon);
        }
      }
  
      return formattedTimestamp || timestamp;
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp;
    }
  }
  
  
  
  
  
  

 
  

  askQuestion() {
    // Send new question to the server
    this.chatService.askQuestion(this.newQuestion).subscribe(() => {
      // After asking, fetch updated questions
      this.fetchQuestions();
      this.newQuestion = ''; // Clear the input field
    });
  }

  replyToQuestion(question: any) {
    const answer = prompt('Enter your answer:');
    if (answer) {
      if (!question.answers) {
        question.answers = [];
      }
      question.answers.push(answer);
      this.updateAnswersInDatabase(question._id, question.answers);
    }
  }


  fetchQuestions() {
    // Fetch all questions from the server
    this.chatService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      // Filter unanswered questions
      this.unansweredQuestions = questions.filter((q) => !q.answered);
      this.unansweredCount = this.unansweredQuestions.length;
    });
  }

  toggleUnansweredQuestions() {
    this.showUnansweredQuestions = !this.showUnansweredQuestions;
  }

  private updateAnswersInDatabase(questionId: string, answers: string[]) {
    this.chatService.addAnswers(questionId, answers).subscribe(() => {
      this.fetchQuestions();
    });
  }

  showAllAnswers(question: any) {
    // question.showAllAnswers = true; 
    question.showAllAnswers = !question.showAllAnswers;
    // Fetch all answers for the specific question
    // and display them
  }
  // toggleShowAllAnswers(question: any) {
  //   question.showAllAnswers = !question.showAllAnswers;
  // }

  
  

  
}
