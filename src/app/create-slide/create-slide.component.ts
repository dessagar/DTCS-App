// create-slide.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { CreateSlideService } from '../create-slide/create-slide.service';
import { PmsContentService } from '../flow/pms/pms-content/pms-content.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';



import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
  selector: 'app-create-slide',
  templateUrl: './create-slide.component.html',
  styleUrls: ['./create-slide.component.scss']
})
export class CreateSlideComponent implements OnInit {
  serverBaseUrl = 'http://localhost:3000'; // Update this with your server's base URL

  slideForm!: FormGroup;
  addedSlides: any[] = [];
  slides: any[] = [];
  selectedImageFile: File | null = null;
  imageSrc: string = ''; // Variable to store the image source
  videoSrc: string = '';
  slideDeleted = false;

  modules: string[] = ['PMS', 'CARE', 'GRM', 'LSM'];
  moduleControls: { [key: string]: FormControl } = {};

  externalVideos!: FormArray;
  internalVideos!: FormArray;
  isExternal: boolean = true;
  slideSuccess = false;

  // Add editing state variables
  isEditing = false;
  editingSlideId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private createSlideService: CreateSlideService,
    private pmsContentService: PmsContentService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private http: HttpClient // Inject the HttpClient service
  ) {
    const storedSlides = localStorage.getItem('addedSlides');
    this.addedSlides = storedSlides ? JSON.parse(storedSlides) : [];
    this.modules.forEach((module) => {
      this.moduleControls[module] = new FormControl(false);
    });

    this.externalVideos = this.fb.array([]);
    this.internalVideos = this.fb.array([]);
  }

  ngOnInit() {
    if (this.addedSlides.length === 0) {
      const storedSlides = localStorage.getItem('addedSlides');
      this.addedSlides = storedSlides ? JSON.parse(storedSlides) : [];
    }

    this.modules.forEach((module) => {
      this.moduleControls[module] = new FormControl(false);
    });
    this.slideForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      performer: [''],
      image: [''],
      externalVideos: this.externalVideos,
      internalVideos: this.internalVideos,
    });
    this.modules.forEach((module) => {
      this.moduleControls[module].reset(false);
    });
  }

  get videoControls(): AbstractControl[] {
    return this.isExternal ? this.externalVideos.controls : this.internalVideos.controls;
  }

  addExternalVideo() {
    this.externalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        youtubeUrl: ['', Validators.pattern('^(https?\\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')],
      })
    );
  }

  addInternalVideo() {
    this.internalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        localVideoFile: [''],
      })
    );
  }

  removeVideo(videoType: string, index: number) {
    const videos = videoType === 'externalVideos' ? this.externalVideos : this.internalVideos;
    videos.removeAt(index);
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      this.slideForm.patchValue({
        image: file.name,
      });
  
      // Upload the image file to the server
      this.uploadImage(file);
    }
  }
  
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    this.http.post(`${this.serverBaseUrl}/upload`, formData).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully:', response.filename);
  
        // Update imageSrc property for immediate display in the carousel
        this.imageSrc = this.getImageUrl(response.filename);
  
        // Use imageUrl as needed, for example, save it in your form or display it in your component
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error appropriately
      }
    );
  }
  
  getImageUrl(image: string | null): string {
    if (!image) {
      return 'image not found';
    }
    return `${this.serverBaseUrl}/${image}`;
  }
  
  

  onVideoChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      // Call the method to upload the video file to the server
      this.uploadVideo(file, index);
    }
  }
  
  uploadVideo(file: File, index: number) {
    const formData = new FormData();
    formData.append('video', file);
  
    this.http.post(`${this.serverBaseUrl}/upload-video`, formData).subscribe(
      (response: any) => {
        console.log('Video uploaded successfully:', response.filename);
  
        // Update the videoSrc property for immediate display in the carousel
        this.videoSrc = this.getVideoUrl(response.filename);
  
        // Update the video file in the internalVideos array
        const videoControl = this.internalVideos.at(index).get('localVideoFile');
        if (videoControl) {
          videoControl.setValue(response.filename);
        }
      },
      (error) => {
        console.error('Error uploading video:', error);
        // Handle the error appropriately
      }
    );
  }
  
  getVideoUrl(video: string | null): string {
    if (!video) {
      return 'video not found';
    }
    return `${this.serverBaseUrl}/${video}`;
  }
  
  clearVideos() {
    const videosArray = this.isExternal ? this.externalVideos : this.internalVideos;
    while (videosArray.length !== 0) {
      videosArray.removeAt(0);
    }
  }

  onSubmit(): void {
    console.log('Form submitted!');
  
    if (this.slideForm.valid) {
      const selectedModules = this.modules.filter(module => this.moduleControls[module].value);
  
      if (selectedModules.length > 0) {
        // Iterate over the externalVideos FormArray and check for undefined YouTube URLs
      for (let i = 0; i < this.externalVideos.length; i++) {
        const youtubeUrl = this.externalVideos.at(i).get('youtubeUrl')?.value;

        if (!youtubeUrl) {
          // Handle the case where YouTube URL is undefined
          console.error('YouTube URL is undefined for external video at index', i);
          // Optionally, you can break out of the loop or perform additional handling
        } else {
          // Process the YouTube URL
          console.log('Processing YouTube URL:', youtubeUrl);
        }
      }
        if (this.isEditing && this.editingSlideId) {
          // Editing an existing slide
          const updatedSlide = {
            ...this.slideForm.value,
            selectedModules: selectedModules,
          };
  
          console.log('Editing Slide ID:', this.editingSlideId);
          console.log('Updated Slide Data:', updatedSlide);
  
          this.createSlideService.updateSlide(this.editingSlideId, updatedSlide).subscribe(
            response => {
              console.log('Slide updated successfully:', response);

              // Update the local addedSlides array
              this.addedSlides = this.addedSlides.map((slide) =>
                slide._id === response._id ? response : slide
              );

              // Update the local storage
              localStorage.setItem('addedSlides', JSON.stringify(this.addedSlides));

              // Optionally, reset form or perform other actions
              this.resetForm();
              this.isEditing = false; // Set editing flag to false after resetting the form

              this.clearVideos();
  
              this.slideSuccess = true;
              this.editingSlideId = null;
  
              setTimeout(() => {
                this.slideSuccess = false;
              }, 2000);
            },
            error => {
              console.error('Error updating slide:', error);
              // Handle the error appropriately
            }
          );
        } else {
          // Creating a new slide
          const newSlide = {
            ...this.slideForm.value,
            selectedModules: selectedModules,
          };
  
          this.createSlideService.addSlide(newSlide).subscribe(
            response => {
              console.log('Slide added successfully:', response);
              this.pmsContentService.triggerReload();
  
              // Push the newly added slide to the addedSlides array
              this.addedSlides.push(response);
  
              // Save addedSlides to localStorage
              localStorage.setItem('addedSlides', JSON.stringify(this.addedSlides));
  
              // Optionally, reset form or perform other actions
              this.resetForm();
              this.clearVideos();
  
              this.slideSuccess = true;
  
              setTimeout(() => {
                this.slideSuccess = false;
              }, 2000);
            },
            error => {
              console.error('Error adding slide:', error);
              // Handle the error appropriately
            }
          );
        }
      }
    }
  }
  
  resetForm() {
    this.slideForm.reset();
    this.selectedImageFile = null;
  }

showSlideDetails(slide: any) {
  // Logic to show the details of the selected slide
  console.log('Selected Slide:', slide);
  // You can add code to display the slide details in a modal or another section
}
deleteSlide(slideId: string, index: number) {
  // Make the API call to delete the slide from the database
  this.createSlideService.deleteSlide(slideId).subscribe(
    () => {
      console.log('Slide deleted successfully.');

      this.slideDeleted = true;
      setTimeout(() => {
        this.slideDeleted = false;
      }, 2000)
      // Remove the slide from addedSlides
      this.addedSlides.splice(index, 1);

      // Update the local storage
      localStorage.setItem('addedSlides', JSON.stringify(this.addedSlides));
    },
    (error) => {
      console.error('Error deleting slide:', error);
      // Handle the error appropriately
    }
  );
}
onSlideTitleClick(slide: any) {
  this.isEditing = true; // Set the editing flag to true
  this.editingSlideId = slide._id; // Store the ID of the slide being edited

  // Populate the form with the selected slide data
  this.slideForm.patchValue({
    title: slide.title,
    subtitle: slide.subtitle,
    performer: slide.performer,
    image: slide.image || null,
    // ... other form controls
  });

  // Populate externalVideos
  this.clearVideos();
  slide.externalVideos.forEach((externalVideo: any) => {
    this.addExternalVideo();
    const externalVideoForm = this.externalVideos.at(this.externalVideos.length - 1);
    externalVideoForm.patchValue(externalVideo);
  });

  // Populate internalVideos
  slide.internalVideos.forEach((internalVideo: any) => {
    this.addInternalVideo();
    const internalVideoForm = this.internalVideos.at(this.internalVideos.length - 1);
    internalVideoForm.patchValue(internalVideo);
  });

  // Optionally, update the selectedModules checkboxes based on the slide data
  this.modules.forEach((module) => {
    this.moduleControls[module].setValue(slide.selectedModules.includes(module));
  });
  this.cdRef.detectChanges();
}
}
// Populate internalVideos
// slide.internalVideos.forEach((internalVideo: any) => {
//   this.addInternalVideo();
//   const internalVideoForm = this.internalVideos.at(this.internalVideos.length - 1);

//   internalVideoForm.patchValue({
//     videoTitle: internalVideo.videoTitle || '',  
//     videoDescription: internalVideo.videoDescription || '',
//     localVideoFile: '',  
//   });
// });
