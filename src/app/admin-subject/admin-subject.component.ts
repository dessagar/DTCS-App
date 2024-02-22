import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent {
  title = 'angular-project';
  selectedItem: string='iMedOne Knowledge';
  subjects: any[] = [];
  newSubject: any = { title: '', subtopics: 0 };

  constructor(private http: HttpClient,private router: Router) {}


  onSelectItem(item: string) {
    this.selectedItem = item;
  }


 
}
