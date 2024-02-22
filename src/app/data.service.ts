import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend server URL

  constructor(private http: HttpClient) {}
  getRecentData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRecentData`);
  }
  storeData(data: any): Observable<any> {
    const url = `${this.baseUrl}/submitData`;
    return this.http.post(url, data);
  }
  getSubjects(chosenOption: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/subjects?chosenOption=${chosenOption}`);
  }
}
