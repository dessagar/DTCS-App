import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnChanges, OnInit {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() performer!: string;
  @Input() imageSrc!: string;
  @Input() modalId!: string;
  @Input() modalTarget!: string;
  @Input() activeTab: string = 'local'; // Initialize activeTab to 'video'
  @Input() videoData!: any[];
  @Input() localData: any[] = []; // Assuming localData is an array of video information

  ngOnInit(): void {
    console.log('OnInit - Title:', this.title);
    console.log('OnInit - SubTitle:', this.subTitle);
    console.log('OnInit - Performer:', this.performer);
    console.log('OnInit - ImageSrc:', this.imageSrc);
  }

  constructor(private sanitizer: DomSanitizer) {}

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     $('#carouselExampleIndicators').carousel(); // Add your Bootstrap carousel initialization code
  //   });
  // }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);  

    if (changes['activeTab'] || changes['videoData'] || changes['localData']) {
      console.log('Active Tab:', this.activeTab);
      console.log('Video Data:', this.videoData);
      console.log('Local Data:', this.localData);

      // Sanitize video URLs
      // Inside CarouselComponent ngOnChanges method
this.videoData.forEach(video => {
  video.safeSource = this.sanitizer.bypassSecurityTrustResourceUrl(video.source);
});


      // Your logic here
    }
  }
  getVideoUrl(filename: string): SafeResourceUrl {
    // Remove the fake path part
    const sanitizedFilename = filename.replace(/^.*[\\\/]/, '');
    const videoUrl = `http://localhost:3000/uploads/${sanitizedFilename}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  
}
