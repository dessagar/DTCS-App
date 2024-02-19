// admin-sub-section.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { CardService } from '../card.service';
import { EditModeService } from '../edit-mode.service';


@Component({
  selector: 'app-admin-sub-section',
  templateUrl: './admin-sub-section.component.html',
  styleUrls: ['./admin-sub-section.component.scss']
})
export class AdminSubSectionComponent implements OnInit {
  private quill!: Quill;
  title: string = '';
  description: string = '';
  isEditMode: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cardService: CardService,
    private editModeService: EditModeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeQuill();
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.description = params['description'];
    });

    this.editModeService.isEditMode$.subscribe((isEditMode) => {
      this.isEditMode = isEditMode;
    });
    this.route.queryParams.subscribe(params => {
      // Check if 'title' and 'description' parameters exist
      if (params['title'] && params['description']) {
        // Set isEditMode to true if the parameters exist
        this.isEditMode = true;
      }
    });
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
    console.log('Is Edit Mode:', this.isEditMode);
  
    const editorContent = this.quill.root.innerHTML;
  
    if (this.isEditMode) {
      this.updateContent(editorContent);
    } else {
      this.router.navigate(['/preview'], { state: { content: editorContent } });
      this.storeContent(editorContent);
    }
  }
  
  updateContent(editorContent: string): void {
    this.http.post('http://localhost:3000/update-content', {
      title: this.title,
      description: this.description,
      content: editorContent,
    }).subscribe(
      (response) => {
        console.log('Data updated successfully:', response);
        this.editModeService.setEditMode(false);
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
  }
  
  storeContent(editorContent: string): void {
    this.http.post('http://localhost:3000/store-content', {
      title: this.title,
      description: this.description,
      content: editorContent,
    }).subscribe(
      (response) => {
        console.log('Data stored successfully:', response);
        // Additional logic if needed
      },
      (error) => {
        console.error('Error storing data:', error);
      }
    );
  }

  

  addCardInAdminSubtopic(): void {
    this.cardService.fetchTitleAndDescription()
      .subscribe(
        (response: any[]) => {
          // You can add logic here to update the UI in admin-subtopic.component.html
        },
        (error) => {
          console.error('Error fetching title and description data:', error);
        }
      );
  }
}
