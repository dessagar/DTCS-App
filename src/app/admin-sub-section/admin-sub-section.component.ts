import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';


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
  selectedItem: string = 'iMedOne Knowledge';


  selectedFiles: File[] = [];
  constructor(private http: HttpClient,private router: Router,
    private dataService: DataService) {}

    storeAndNavigateToPreview() {
      // Upload files first
      this.uploadFiles().subscribe(
        (uploadResponse) => {
          // Upload successful, now store other data
          const dataToStore = {
            name: this.labelName,
            eligibility: this.selectedEligibility,
            chosenOption: this.selectedItem,
            textareaContent: this.textareaContent,
            files: uploadResponse.files,
            // Add other properties as needed
          };
    
          // Combine the upload and store observables using forkJoin
          forkJoin([
            this.dataService.storeData(dataToStore),
            // Add other observables if needed
          ]).subscribe(
            ([storeResponse]) => {
              console.log('Data stored successfully:', storeResponse);
              // After storing data and uploading files, navigate to the preview page
              this.router.navigate(['/datapreview']);
            },
            (error) => {
              console.error('Error storing data:', error);
              // Handle store error as needed
            }
          );
        },
        (uploadError) => {
          console.error('Error uploading files:', uploadError);
          // Handle upload error as needed
        }
      );
    }
    
    uploadFiles(): Observable<any> {
      const formData = new FormData();
      this.selectedFiles.forEach(file => {
        formData.append('files', file);
      });
    
      // Log the filenames before uploading
      this.selectedFiles.forEach(file => {
        console.log('Uploading file:', file.name);
      });
    
      // Return the HTTP POST request
      return this.http.post('http://localhost:3000/upload-multiple-files', formData);
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