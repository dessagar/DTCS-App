import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-subtopic',
  templateUrl: './admin-subtopic.component.html',
  styleUrls: ['./admin-subtopic.component.scss']
})
export class AdminSubtopicComponent {
  selectedItem: string = 'iMedOne Overview';

  onSelectItem(item: string) {
    this.selectedItem = item;
  }

  deleteCard(event: MouseEvent) {
    // Get the parent card element
    const cardElement = (event.target as HTMLElement).closest('.card');
    
    // Remove the card if found
    if (cardElement) {
        cardElement.remove();
    }
}
}
