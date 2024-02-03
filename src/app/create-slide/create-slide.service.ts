// create-slide.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateSlideService {
  private apiUrl = 'http://localhost:3000'; 
  private slidesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient,
    private router: Router) {}

  // Remove the local slides array
  // private slides: any[] = [];

  // Modify getSlides to make an HTTP GET request


  addSlide(slide: any) {
    return this.http.post(`${this.apiUrl}/slides`, slide);
  }
  getSlides() {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }
  getSlideValues() {
    return this.http.get(`${this.apiUrl}/slide-values`);
  }

  setSlideValues(values: any) {
    // You can implement an HTTP PUT request to update values on the server if needed
    console.log('Setting slide values:', values);
  }

  addSlideToModules(newSlide: any, selectedModules: string[]) {
    // You can implement an HTTP POST request to add the slide to modules on the server
    console.log('Adding slide to modules:', newSlide, selectedModules);
  }
   // In CreateSlideService
   deleteSlide(slideId: string): Observable<void> {
    const url = `${this.apiUrl}/slides/${slideId}`; // Update the URL with the correct endpoint
    return this.http.delete<void>(url);
  }
  updateSlide(slideId: string, updatedSlide: any): Observable<any> {
    const url = `${this.apiUrl}/slides/${slideId}`;
    return this.http.put(url, updatedSlide);
  }

  uploadInternalVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', file);
  
    return this.http.post(`${this.apiUrl}/upload-video`, formData);
  }
  // Function to add a new slide and navigate to the create slide route
  addNewSlide() {
    // Logic to add a new slide, if applicable

    // Navigating to the create slide route
    this.router.navigate(['/createslide']);
  }

  // If your slide requires parameters (e.g., an ID)
  addNewSlideWithParams(slideId: number) {
    // Logic to add a new slide with parameters, if applicable

    // Navigating to the create slide route with parameters
    this.router.navigate(['/createslide',slideId]);
  }
}