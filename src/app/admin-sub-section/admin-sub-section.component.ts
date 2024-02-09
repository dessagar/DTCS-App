import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';

@Component({
  selector: 'app-admin-sub-section',
  templateUrl: './admin-sub-section.component.html',
  styleUrls: ['./admin-sub-section.component.scss']
})
export class AdminSubSectionComponent {
  private quill!: Quill;

  constructor(private http: HttpClient, private router: Router) {}

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
  }
  


  title: string = '';
  description: string = '';
  selectedSubtopic: string = '';
  selectedEligibility: string = '';

  selectedFiles: File[] = [];
  
// Method to handle file selection
onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  // Append the newly selected files to the existing array
  this.selectedFiles = this.selectedFiles.concat(Array.from(files));
}

// Function to get the file type based on the file extension
getFileType(file: File): string {
  return file.type.split('/')[1].toUpperCase();
}
previewFile(file: File): void {
  const formData = new FormData();
  formData.append('file', file);

  this.http.post('http://localhost:3000/upload-file', formData)
    .subscribe((response) => {
      console.log('File uploaded successfully:', response);
    });
}



// Function to delete a file
deleteFile(file: File): void {
  const index = this.selectedFiles.indexOf(file);
  if (index !== -1) {
    this.selectedFiles.splice(index, 1);
  }
}
  // Populate dropdown options
  owners: { label: string, value: string }[] = [
    { label: 'Owner 1', value: 'owner1' },
    { label: 'Owner 2', value: 'owner2' },
    // Add more owners as needed
  ];

  subtopics: { label: string, value: string }[] = [
    { label: 'Subtopic 1', value: 'subtopic1' },
    { label: 'Subtopic 2', value: 'subtopic2' },
    // Add more subtopics as needed
  ];

  eligibilities: { label: string, value: string }[] = [
    { label: 'Eligibility 1', value: 'eligibility1' },
    { label: 'Eligibility 2', value: 'eligibility2' },
    // Add more eligibilities as needed
  ];
  // selectOwner(ownerValue: string) {
  //   this.selectedOwner = ownerValue;
  // }
  
}