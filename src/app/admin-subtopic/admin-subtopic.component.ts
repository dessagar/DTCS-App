import { Component } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-admin-subtopic',
  templateUrl: './admin-subtopic.component.html',
  styleUrls: ['./admin-subtopic.component.scss']
})
export class AdminSubtopicComponent {
  selectedItem: string = 'iMedOne Overview';
  showAddSubtopicForm: boolean = false;
    newSubtopicTitle: string = '';
    newSubtopicDescription: string = '';
    subtopics: any[] = []; // Initialize with any existing subtopics

    titleDescriptionData: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    // Fetch title and description data when the component initializes
    this.fetchTitleAndDescriptionData();
  }

  fetchTitleAndDescriptionData(): void {
    this.cardService.fetchTitleAndDescription()
      .subscribe(
        (response: any[]) => {
          this.titleDescriptionData = response;
        },
        (error) => {
          console.error('Error fetching title and description data:', error);
          // Handle error (e.g., show an error message to the user)
        }
      );
  }
  onSelectItem(item: string) {
    this.selectedItem = item;
  }

//   deleteCard(event: MouseEvent, index: number) {
//     const cardElement = (event.target as HTMLElement).closest('.card');
    
//     if (cardElement) {
//         cardElement.remove();
//     }
//     this.titleDescriptionData.splice(index, 1);
// }

deleteCard(event: MouseEvent, index: number) {
  // Get the ID of the item to be deleted
  const itemId = this.titleDescriptionData[index]._id;

  // Send a DELETE request to the server to delete the item
  this.cardService.deleteTitleDescription(itemId)
    .subscribe(
      () => {
        // Remove the item from the array if deletion is successful
        this.titleDescriptionData.splice(index, 1);
        console.log('Item deleted successfully');
      },
      (error) => {
        console.error('Error deleting item:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
}
// toggleAddSubtopic() {
//   this.showAddSubtopicForm = !this.showAddSubtopicForm;
// }


// addSubtopic() {
//   // Add the new subtopic to the list
//   this.subtopics.push({
//       title: this.newSubtopicTitle,
//       description: this.newSubtopicDescription,
//       subCount: 0 // Initially set to 0, you can adjust as needed
//   });

//   // Reset the form fields
//   this.newSubtopicTitle = '';
//   this.newSubtopicDescription = '';

//   // Hide the form
//   this.showAddSubtopicForm = false;
// }

//     deleteSubtopic(subtopic: any) {
//         // Implement deletion logic here, you may remove the subtopic from the array
//         const index = this.subtopics.indexOf(subtopic);
//         if (index !== -1) {
//             this.subtopics.splice(index, 1);
//         }
//     }
}
