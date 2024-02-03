import { Component } from '@angular/core';

@Component({
  selector: 'app-clang',
  templateUrl: './clang.component.html',
  styleUrls: ['./clang.component.scss']
})
export class ClangComponent {

  toggleDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdownItem = target.closest('.dropdown-item');

    if (dropdownItem) {
      dropdownItem.classList.toggle('active');
    }
  }
}
