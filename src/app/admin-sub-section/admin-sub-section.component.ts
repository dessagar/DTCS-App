import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sub-section',
  templateUrl: './admin-sub-section.component.html',
  styleUrls: ['./admin-sub-section.component.scss']
})
export class AdminSubSectionComponent {
  labelName: string = '';
  selectedOwner: string = '';
  selectedSubtopic: string = '';
  selectedEligibility: string = '';

  selectedFiles: File[] = [];
  constructor(private router: Router) {}


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
 // Function to preview a file (you can implement your logic)
 previewFile(file: File): void {
  console.log('Previewing file:', file.name);
  this.router.navigate(['/preview'], { state: { fileData: file } });
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
  selectOwner(ownerValue: string) {
    this.selectedOwner = ownerValue;
  }
  
}