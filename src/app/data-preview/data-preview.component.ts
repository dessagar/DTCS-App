// data-preview.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  newDataSubject = new Subject<any>();

  recentData: any;
  leftColumn: any[] = []; // Declare leftColumn property
  rightColumn: any[] = []; // Declare rightColumn property

  constructor(private dataService: DataService,) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getRecentData().subscribe(
      (data: any[]) => {
        console.log('Server Response:', data);
  
        if (data.length > 0) {
          this.recentData = data[0];
          console.log('Recent Data:', this.recentData);
  
          if (Array.isArray(this.recentData.files)) {
            console.log('Files:', this.recentData.files);
          } else {
            console.log('Files property is missing or not an array.');
          }
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
    return `http://localhost:3000/uploads/${fileName}`;
  }
  
  getVideoPreviewUrl(fileName: string): string {
    return `http://localhost:3000/uploads/${fileName}`;
  }
  
  onSaveClick(): void {
    const newData = { name: this.recentData.name, chosenOption: this.recentData.chosenOption };
  
    // Add the new tile to the appropriate column based on chosenOption
    const targetColumn = newData.chosenOption === 'iMedOne Knowledge' ? this.leftColumn : this.rightColumn;
    targetColumn.push({ title: newData.name});
  
    // Clear the form or take any other action as needed
  
    // You might want to update the UI by re-assigning the columns to trigger change detection
    this.leftColumn = [...this.leftColumn];
    this.rightColumn = [...this.rightColumn];
  }
  

}
