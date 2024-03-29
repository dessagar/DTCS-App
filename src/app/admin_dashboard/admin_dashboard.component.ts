import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from  '../data.service';



interface Card {
    title: string;
    newTitle: string;
    subtopics:string;
    selected: boolean;
    isEditing: boolean;
    isDisabled: boolean;
}


@Component({
  selector: 'app-admin_dashboard',
  templateUrl: './admin_dashboard.component.html',
  styleUrls: ['./admin_dashboard.component.scss']
})


export class Admin_dashboardComponent {
  leftColumn: any[] = [];
  rightColumn: any[] = [];
    iMedoneSubjects: any[] = [];
   skillSubjects: any[] = [];
  
  
    constructor(private router: Router, private http: HttpClient , private dataService: DataService) { }


    ngOnInit(): void {
      this.dataService.newDataSubject.subscribe((newData) => {
        if (newData) {
          console.log('Chosen Option:', newData.chosenOption);
          console.log('Left Column:', this.leftColumn);
          console.log('Right Column:', this.rightColumn);
    
          const targetColumn = newData.chosenOption === 'iMedOne Knowledge' ? this.leftColumn : this.rightColumn;
          targetColumn.push({ title: newData.name, subtopics: newData.subtopics });
    
          console.log('Updated Left Column:', this.leftColumn);
          console.log('Updated Right Column:', this.rightColumn);
        }
      });
    }
    
    
    // Inside your component class
deleteCard(column: string, index: number, title: string): void {
  // Assuming you have a method in your data service to delete a card
  this.dataService.deleteCard(column, index).subscribe(
      (deleteResponse) => {
          console.log('Card deleted successfully:', deleteResponse);

          // Remove the card from the local array
          if (column === 'right') {
              this.rightColumn.splice(index, 1);
          } else {
              // Handle the case for the left column if needed
          }
      },
      (deleteError) => {
          console.error('Error deleting card:', deleteError);
          // Handle delete error as needed
      }
  );
}


    // constructor(private titleService: TitleService, private router: Router, private http: HttpClient) {
    //     const midpoint = Math.ceil(this.cards.length / 2);
    //     this.leftColumn = this.cards.slice(0, midpoint);
    //     this.rightColumn = this.cards.slice(midpoint);     
    // }

    // ngOnInit() {
    //     const storedLeftColumn = localStorage.getItem('leftColumn');
    //     const storedRightColumn = localStorage.getItem('rightColumn');
    
    //     console.log('Stored Left Column:', storedLeftColumn);
    //     console.log('Stored Right Column:', storedRightColumn);
    
    //     if (storedLeftColumn && storedRightColumn) {
    //         this.leftColumn = JSON.parse(storedLeftColumn);
    //         this.rightColumn = JSON.parse(storedRightColumn);
    //     } else {
    //         this.leftColumn = [];
    //         this.rightColumn = [];
    //     }
    
    //     console.log('Left Column:', this.leftColumn);
    //     console.log('Right Column:', this.rightColumn);
    // }
    
    


    
    // startEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = true;
    //         this.leftColumn[index].newTitle = this.leftColumn[index].title;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = true;
    //         this.rightColumn[index].newTitle = this.rightColumn[index].title;
    //     }

    //     const updatedTitle = this.leftColumn[index].newTitle;
    // const cardIndex = index; 
    // this.http.put(`/api/cards/${cardIndex}`, { title: updatedTitle })
    //   .subscribe(() => {
    //     this.leftColumn[index].title = updatedTitle;
    //   });
    // }
    
    // stopEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = false;
    //         this.leftColumn[index].title = this.leftColumn[index].newTitle;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = false;
    //         this.rightColumn[index].title = this.rightColumn[index].newTitle;
    //     }
    // }
    
    // deleteCard(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn.splice(index, 1);
    //     } else if (column === 'right') {
    //         this.rightColumn.splice(index, 1);
    //     }

    //     const cardIndex = index; 
    //     this.http.delete(`/api/cards/${cardIndex}`)
    //   .subscribe(() => {
    //     this.leftColumn.splice(index, 1);
    //   });
    // }

    // startEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = true;
    //         this.leftColumn[index].newTitle = this.leftColumn[index].title;
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = true;
    //         this.rightColumn[index].newTitle = this.rightColumn[index].title;
    //     }
    // }
    
    // stopEditing(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn[index].isEditing = false;
    //         this.leftColumn[index].title = this.leftColumn[index].newTitle;
    //         this.updateLocalStorage();
    //     } else if (column === 'right') {
    //         this.rightColumn[index].isEditing = false;
    //         this.rightColumn[index].title = this.rightColumn[index].newTitle;
    //         this.updateLocalStorage();
    //     }
    // }
    
    // deleteCard(column: string, index: number) {
    //     if (column === 'left') {
    //         this.leftColumn.splice(index, 1);
    //         this.updateLocalStorage();
    //     } else if (column === 'right') {
    //         this.rightColumn.splice(index, 1);
    //         this.updateLocalStorage();
    //     }
    // }
    
    // updateLocalStorage() {
    //     localStorage.setItem('leftColumn', JSON.stringify(this.leftColumn));
    //     localStorage.setItem('rightColumn', JSON.stringify(this.rightColumn));
    // }
  

    logout() {
        this.router.navigate(['/login']);
      }

     
    

}
