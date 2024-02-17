import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent {
  title = 'angular-project';
  selectedItem: string='iMedOne Overview';
  subjects: any[] = [];
  newSubject: any = { title: '', subtopics: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch subjects from the database on component initialization
    this.fetchSubjects();
  }

  onSelectItem(item: string) {
    this.selectedItem = item;
  }

  fetchSubjects(): void {
    // Make an HTTP GET request to fetch subjects from the backend
    this.http.get<any[]>('http://localhost:3000/api/subjects').subscribe(
      response => {
        this.subjects = response;
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  saveSubject(form: any): void {
    if (form.valid) {
      // Make an HTTP POST request to save the new subject to the backend
      this.http.post<any>('http://localhost:3000/api/subjects', this.newSubject).subscribe(
        response => {
          console.log('Subject saved successfully:', response);
          // Clear form fields
          this.newSubject = { title: '', subtopics: 0 };
          // Close the modal
          document.getElementById('addSubjectModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
          const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
          // Fetch subjects again to update the list
          this.fetchSubjects();
        },
        error => {
          console.error('Error saving subject:', error);
        }
      );
    }
  }
}
