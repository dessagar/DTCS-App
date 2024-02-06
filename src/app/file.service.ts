// file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend base URL

  constructor(private http: HttpClient) {}
  getFileContent(filename: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseUrl}/preview/${filename}`, { responseType: 'arraybuffer' });
  }
  }

