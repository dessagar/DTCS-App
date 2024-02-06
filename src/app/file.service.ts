// file.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private selectedFile: File | undefined;

  setSelectedFile(file: File): void {
    this.selectedFile = file;
  }

  getSelectedFile(): File | undefined {
    return this.selectedFile;
  }
}
