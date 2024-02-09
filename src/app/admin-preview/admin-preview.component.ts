import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContentService } from './content.service';

@Component({
  selector: 'app-admin-preview',
  templateUrl: './admin-preview.component.html',
  styleUrls: ['./admin-preview.component.scss']
})
export class AdminPreviewComponent implements OnInit {
  filename: string = '';
  fileContent: ArrayBuffer | null = null;
  fileType: string = '';
  content: SafeHtml = '';
  subjectAdded = false;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private contentService: ContentService
    ) {}

  ngOnInit(): void {
    // Retrieve content from route state
    const rawHtml = history.state.content || '';
    
    // Sanitize the HTML to allow embedded YouTube videos
    this.content = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
     // Save content to the service when clicking "Save"
     this.contentService.saveContent(rawHtml);
  }
  // Function to be called on "Save" button click
  onSaveClick() {
  
    // Retrieve the raw HTML content
    const rawHtml = history.state.content || '';

    // Sanitize the HTML to allow embedded YouTube videos
    const sanitizedContent: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);

    // Save the content to the service
    this.contentService.saveContent(sanitizedContent.toString());
    this.subjectAdded = true;

    setTimeout(() => {
      this.subjectAdded = false;
    }, 2000);
  }
}



//   constructor(
//     private route: ActivatedRoute,
//     private fileService: FileService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit(): void {
//     this.filename = this.route.snapshot.paramMap.get('filename') || '';

//     this.fileService.getFileContent(this.filename).subscribe(
//       (content: ArrayBuffer) => {
//         this.fileContent = content;
//         this.fileType = this.getFileTypeFromExtension(this.getFileExtension(this.filename));
//       },
//       (error: any) => {
//         console.error('Error fetching file content:', error);
//       }
//     );
//   }

//   get safeFileContent(): SafeResourceUrl | null {
//     if (this.fileContent) {
//       const blob = new Blob([this.fileContent], { type: `application/${this.getFileExtension(this.filename)}` });

//       if (this.fileType === 'image' || this.fileType === 'video') {
//         return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
//       } else if (this.fileType === 'pdf') {
//         return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
//       }
//     }
//     return null;
//   }

//   getFileTypeFromExtension(extension: string): string {
//     if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
//       return 'image';
//     } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
//       return 'video';
//     } else if (extension === 'pdf') {
//       return 'pdf';
//     } else {
//       return '';
//     }
//   }

//   getFileExtension(filename: string): string {
//     return filename.split('.').pop()?.toLowerCase() || '';
//   }

//  previewFile(): void {
//   console.log('Previewing file:', this.filename);

//   const formData = new FormData();

//   const blob = new Blob([this.fileContent as BlobPart], { type: `application/${this.getFileExtension(this.filename)}` });

//   formData.append('file', new File([blob], this.filename));

//   this.fileService.uploadFile(formData).subscribe(
//     (response: any) => {
//       console.log('File uploaded successfully:', response);

//       const fileUrl = `${this.fileService.getBaseUrl()}/preview/${response.filename}`;
      
//       if (this.fileType === 'pdf') {
//         const newTab = window.open();
//         if (newTab) {
//           newTab.location.href = fileUrl;
//         }
//       } else {

//       }
//     },
//     (error) => {
//       console.error('Error uploading file:', error);
//     }
//   );
// }
// }