import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

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
  textareaContent: string ='';
  selectedItem: string = 'iMedOne Overview';


  selectedFiles: File[] = [];
  constructor(private http: HttpClient,private router: Router,
    private dataService: DataService) {}

    storeAndNavigateToPreview() {
      const dataToStore = {
        name: this.labelName,
        eligibility: this.selectedEligibility,
        chosenOption: this.selectedItem,
        textareaContent: this.textareaContent,
        files: this.selectedFiles.map(file => file.name),
        // Add other properties as needed
      };
    
      this.dataService.storeData(dataToStore).subscribe(
        (response) => {
          console.log('Data stored successfully:', response);
          // After storing data, navigate to the preview page
          this.router.navigate(['/datapreview']);
        },
        (error) => {
          console.error('Error storing data:', error);
          // Handle error as needed
        }
      );
       // Create a FormData object to append files
       const formData = new FormData();
    
       // Append other data to FormData
       formData.append('name', this.labelName);
       formData.append('eligibility', this.selectedEligibility);
       formData.append('chosenOption', this.selectedItem);
       formData.append('textareaContent', this.textareaContent);
     
       // Append each file to FormData
       for (const file of this.selectedFiles) {
         formData.append('files', file, file.name);
       }
     
       // Upload files and other data to the server
       this.http.post('http://localhost:3000/upload-files-and-data', formData)
         .subscribe(
           (response) => {
             console.log('Data and files uploaded successfully:', response);
             // After storing data and uploading files, navigate to the preview page
             this.router.navigate(['/datapreview']);
           },
           (error) => {
             console.error('Error uploading files and data:', error);
             // Handle error as needed
           }
         );
    }
    
    

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
      // Handle the response from the backend (if needed)
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
  selectOwner(ownerValue: string) {
    this.selectedOwner = ownerValue;
  }
  onSelectItem(item: string) {
    this.selectedItem = item;
  }
}