// Import necessary modules and services 
import { Component, OnInit } from '@angular/core';
import { CreateSlideService } from 'src/app/create-slide/create-slide.service';
import { PmsContentService } from './pms-content.service';
@Component({
  selector: 'app-pms-content',
  templateUrl: './pms-content.component.html',
  styleUrls: ['./pms-content.component.scss']
})
export class PmsContentComponent  {

  constructor(
    private createSlideService: CreateSlideService,
    private pmsContentService: PmsContentService
    ) {this.pmsContentService.getReloadObservable().subscribe(() => {
      this.loadSlides();
    });
  }

  slides: any[] = [];

ngOnInit() {
  this.loadSlides();
}

loadSlides() {
  this.createSlideService.getSlides().subscribe((existingSlides: any[]) => {
    // Assuming that you have a property like 'timestamp' to identify the order of slides
    const newSlides = this.slides.filter(slide => !existingSlides.some(existing => existing.timestamp === slide.timestamp));
    this.slides = [...existingSlides, ...newSlides];
  });
}
  
  // Define content data
  contentData = {
    title: '1Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  contentData1 = {
    title: '2Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };
  contentData3 = {
    title: '3Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  activeTab: string = 'local';  

  videoData: any[] = [
    { title: 'Video 1', text: 'Some quick example text for Video 1.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 2', text: 'Some quick example text for Video 2.', source: 'https://www.youtube.com/embed/G36GbmO0AYg' },
    { title: 'Video 3', text: 'Some quick example text for Video 3.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 4', text: 'Some quick example text for Video 4.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
  ];

  // localData: any[] = [
  //   { title: 'Local Video 1', text: 'Some quick example text for Local Video 1.' , source: 'assets/videos/iMedOnePms.mp4'},
  //   { title: 'Local Video 2', text: 'Some quick example text for Local Video 2.' , source: 'assets/videos/iMedOnePms.mp4' },
  //   { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' },
  //   { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' }
  // ];

  // Method to set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
