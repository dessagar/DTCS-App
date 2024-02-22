import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend server URL

  // Assuming these arrays are present in the service to store tile data
  leftColumn: any[] = [];
  rightColumn: any[] = [];

  // Use BehaviorSubject for newData$
  public newDataSubject = new BehaviorSubject<any>(null);
  newData$ = this.newDataSubject.asObservable();

  constructor(private http: HttpClient) {
    
  }

  setNewData(data: any): void {
    this.newDataSubject.next(data);
  }

  getRecentData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getRecentData`);
  }

  storeData(data: any): Observable<any> {
    const url = `${this.baseUrl}/submitData`;

    // Assuming 'chosenOption' is a property in the incoming data
    if (data.chosenOption === 'iMedOne Knowledge') {
      this.leftColumn.push({ title: data.name, subtopics: data.subtopics }); // Modify as per your data structure
    } else if (data.chosenOption === 'Skill Knowledge') {
      this.rightColumn.push({ title: data.name, subtopics: data.subtopics }); // Modify as per your data structure
    }

    // Store data on the server
    return this.http.post(url, data);
  }

  getSubjects(chosenOption: string): Observable<any> {
    // Assuming an API endpoint to fetch subjects based on chosenOption
    return this.http.get<any>(`${this.baseUrl}/api/subjects?chosenOption=${chosenOption}`);
  }
  // Inside your DataService class
deleteCard(column: string, index: number): Observable<any> {
  const url = `${this.baseUrl}/deleteCard`; // Replace with your actual delete endpoint
  const data = {
      column: column,
      index: index,
  };
  return this.http.post(url, data);
}

}
