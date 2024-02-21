import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TitleService } from './title.service'; // Update the path

interface Card {
    title: string;
    newTitle: string;
    subtopics:string;
    selected: boolean;
    isEditing: boolean;
    isDisabled: boolean;
}


@Component({
  selector: 'app-admin_dashboard',
  templateUrl: './admin_dashboard.component.html',
  styleUrls: ['./admin_dashboard.component.scss']
})


export class Admin_dashboardComponent {
    cards: Card[] = [
        // { title: 'iMedOne Overview', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'Admin', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'Rights', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'GSUS', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'ISUS', newTitle: '',subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'C#', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'JavaScript', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'Angular', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'Python', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        // { title: 'Ruby', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false }
    ];

    

    // leftColumn: Card[];
    // rightColumn: Card[];

    iMedoneSubjects: any[] = [];
    skillSubjects: any[] = [];
  
    constructor(private router: Router, private http: HttpClient) { }
  
    ngOnInit(): void {
      this.fetchData();
    }
  

    // constructor(private titleService: TitleService, private router: Router, private http: HttpClient) {
    //     const midpoint = Math.ceil(this.cards.length / 2);
    //     this.leftColumn = this.cards.slice(0, midpoint);
    //     this.rightColumn = this.cards.slice(midpoint);     
    // }

    // ngOnInit() {
    //     const storedLeftColumn = localStorage.getItem('leftColumn');
    //     const storedRightColumn = localStorage.getItem('rightColumn');
    
    //     console.log('Stored Left Column:', storedLeftColumn);
    //     console.log('Stored Right Column:', storedRightColumn);
    
    //     if (storedLeftColumn && storedRightColumn) {
    //         this.leftColumn = JSON.parse(storedLeftColumn);
    //         this.rightColumn = JSON.parse(storedRightColumn);
    //     } else {
    //         this.leftColumn = [];
    //         this.rightColumn = [];
    //     }
    
    //     console.log('Left Column:', this.leftColumn);
    //     console.log('Right Column:', this.rightColumn);
    // }
    
    

    getCardTitle(index: number): string {
        return this.cards[index].title;
    }

    setCardTitle(index: number, newTitle: string) {
        this.cards[index].title = newTitle;
    }

    
    // startEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = true;
    //         this.leftColumn[index].newTitle = this.leftColumn[index].title;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = true;
    //         this.rightColumn[index].newTitle = this.rightColumn[index].title;
    //     }

    //     const updatedTitle = this.leftColumn[index].newTitle;
    // const cardIndex = index; 
    // this.http.put(`/api/cards/${cardIndex}`, { title: updatedTitle })
    //   .subscribe(() => {
    //     this.leftColumn[index].title = updatedTitle;
    //   });
    // }
    
    // stopEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = false;
    //         this.leftColumn[index].title = this.leftColumn[index].newTitle;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = false;
    //         this.rightColumn[index].title = this.rightColumn[index].newTitle;
    //     }
    // }
    
    // deleteCard(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn.splice(index, 1);
    //     } else if (column === 'right') {
    //         this.rightColumn.splice(index, 1);
    //     }

    //     const cardIndex = index; 
    //     this.http.delete(`/api/cards/${cardIndex}`)
    //   .subscribe(() => {
    //     this.leftColumn.splice(index, 1);
    //   });
    // }

    // startEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = true;
    //         this.leftColumn[index].newTitle = this.leftColumn[index].title;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = true;
    //         this.rightColumn[index].newTitle = this.rightColumn[index].title;
    //     }
    // }
    
    // stopEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = false;
    //         this.leftColumn[index].title = this.leftColumn[index].newTitle;
    //         this.updateLocalStorage();
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = false;
    //         this.rightColumn[index].title = this.rightColumn[index].newTitle;
    //         this.updateLocalStorage();
    //     }
    // }
    
    // deleteCard(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn.splice(index, 1);
    //         this.updateLocalStorage();
    //     } else if (column === 'right') {
    //         this.rightColumn.splice(index, 1);
    //         this.updateLocalStorage();
    //     }
    // }
    
    // updateLocalStorage() {
    //     localStorage.setItem('leftColumn', JSON.stringify(this.leftColumn));
    //     localStorage.setItem('rightColumn', JSON.stringify(this.rightColumn));
    // }
  

    logout() {
        this.router.navigate(['/login']);
      }

     
  fetchData(): void {
    this.http.get<any[]>('/api/data').subscribe(
      data => {
        this.iMedoneSubjects = data.filter(subject => subject.chosenOption === 'iMedone Knowledge');
        this.skillSubjects = data.filter(subject => subject.chosenOption === 'Skill Knowledge');
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteSubject(id: string): void {
    // Implement delete logic
  }

}
