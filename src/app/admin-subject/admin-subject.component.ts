import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent {
  selectedItem: string = 'iMedOne Overview';

  onSelectItem(item: string) {
    this.selectedItem = item;
  }
}
