import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  recentData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getRecentData().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.recentData = data[0]; // Use the first item if the array is not empty
        } else {
          console.log('No recent data found.');
        }
      },
      (error) => {
        console.error('Error fetching recent data:', error);
      }
    );
  }

  isImage(fileName: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
  }

  isVideo(fileName: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(fileName);
  }

  getImagePreviewUrl(fileName: string): string {
    // Adjust the path based on your server configuration
    return `http://localhost:3000/uploads/${fileName}`;
  }

  getVideoPreviewUrl(fileName: string): string {
    // Adjust the path based on your server configuration
    return `http://localhost:3000/uploads/${fileName}`;
  }
}
