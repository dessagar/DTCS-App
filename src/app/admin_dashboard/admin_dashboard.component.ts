import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TitleService } from './title.service'; // Update the path

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
    cards: Card[] = [
        { title: 'iMedOne Overview', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        { title: 'Admin', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'Rights', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'GSUS', newTitle: '',subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'ISUS', newTitle: '',subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        { title: 'C#', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'JavaScript', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'Angular', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false },
        { title: 'Python', newTitle: '', subtopics :'Sub Topics(0)', selected: false, isEditing: false, isDisabled: false },
        { title: 'Ruby', newTitle: '', subtopics :'Sub Topics(10)', selected: false, isEditing: false, isDisabled: false }


        // Add more card objects as needed
    ];

    leftColumn: Card[];
    rightColumn: Card[];

    constructor(private titleService: TitleService, private router: Router) {
        const midpoint = Math.ceil(this.cards.length / 2);
        this.leftColumn = this.cards.slice(0, midpoint);
        this.rightColumn = this.cards.slice(midpoint);
    }

    getCardTitle(index: number): string {
        return this.cards[index].title;
    }

    setCardTitle(index: number, newTitle: string) {
        this.cards[index].title = newTitle;
    }

    // startEditing(index: number) {
    //     this.cards[index].isEditing = true;
    //     this.cards[index].newTitle = this.getCardTitle(index); // Initialize the input field with the current title
    // }

    // stopEditing(index: number) {
    //     this.cards[index].isEditing = false;
    //     this.setCardTitle(index, this.cards[index].newTitle);
    // }

    // deleteCard(index: number) {
    //     this.cards[index].isDisabled = true;
    //     console.log('Card deleted or disabled');
    // }

    // deleteCard(index: number) {
    //     this.cards.splice(index, 1); // Remove the card from the array
    // }

    startEditing(column: string, index: number) {
        if (column === 'left') {
            this.leftColumn[index].isEditing = true;
            this.leftColumn[index].newTitle = this.leftColumn[index].title;
        } else if (column === 'right') {
            this.rightColumn[index].isEditing = true;
            this.rightColumn[index].newTitle = this.rightColumn[index].title;
        }
    }
    
    stopEditing(column: string, index: number) {
        if (column === 'left') {
            this.leftColumn[index].isEditing = false;
            this.leftColumn[index].title = this.leftColumn[index].newTitle;
        } else if (column === 'right') {
            this.rightColumn[index].isEditing = false;
            this.rightColumn[index].title = this.rightColumn[index].newTitle;
        }
    }
    
    deleteCard(column: string, index: number) {
        if (column === 'left') {
            this.leftColumn.splice(index, 1);
        } else if (column === 'right') {
            this.rightColumn.splice(index, 1);
        }
    }

    // deleteSelectedCards() {
    //     const selectedCards = this.cards.filter((card) => card.selected);
    //     // Perform deletion logic here (e.g., remove from array)
    //     for (const selectedCard of selectedCards) {
    //         const index = this.cards.indexOf(selectedCard);
    //         if (index !== -1) {
    //             this.cards.splice(index, 1);
    //         }
    //     }
    // }

    logout() {
        // Clear user-related information (if any)
        // For example, you may need to clear authentication tokens or user data from the local storage
    
        // Navigate to the login page
        this.router.navigate(['/login']);
      }

}
