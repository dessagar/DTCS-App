import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { CardService } from '../admin_dashboard/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  // constructor(private cardService: CardService) {}

  // // Function to update card title
  // updateCardTitle(newTitle: string): void {
  //   this.cardService.updateCardTitle(newTitle);
  // }

  constructor(private router: Router) { }
  logout() {
    // Clear user-related information (if any)
    // For example, you may need to clear authentication tokens or user data from the local storage

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
