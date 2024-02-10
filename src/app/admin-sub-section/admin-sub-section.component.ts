import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { CardService } from '../card.service';

@Component({
  selector: 'app-admin-sub-section',
  templateUrl: './admin-sub-section.component.html',
  styleUrls: ['./admin-sub-section.component.scss']
})
export class AdminSubSectionComponent {
  private quill!: Quill;
  
  title: string = '';
  description: string = '';

  constructor(private http: HttpClient, private router: Router,
    private cardService: CardService) {}

  ngOnInit(): void {
    this.initializeQuill();
  }

  private initializeQuill(): void {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'align', 'link', 'image', 'video', 'clean'],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
        ],
      }
    });
  }

  previewContent(): void {
    const editorContent = this.quill.root.innerHTML;
    this.router.navigate(['/preview'], { state: { content: editorContent } });
// Send a POST request to your server with the title, description, and content
this.http.post('http://localhost:3000/store-content', { title: this.title, description: this.description, content: editorContent })
.subscribe(
  (response) => {
    console.log('Data stored successfully:', response);

    // After storing the data, trigger card addition in admin-subtopic
    this.addCardInAdminSubtopic();

    // Handle success (e.g., show a success message to the user)
  },
  (error) => {
    console.error('Error storing data:', error);
    // Handle error (e.g., show an error message to the user)
  }
);
  }
  // Function to add a card in admin-subtopic
  addCardInAdminSubtopic(): void {
    // Fetch title and description data from the server
    this.cardService.fetchTitleAndDescription()
      .subscribe(
        (response: any[]) => {
          // Send a message or event to admin-subtopic.component.ts to add a card with the fetched data
          // You can use a shared service or another method to communicate between components
        },
        (error) => {
          console.error('Error fetching title and description data:', error);
          // Handle error (e.g., show an error message to the user)
        }
      );
  }
}  
