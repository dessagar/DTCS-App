// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedSlideSubject = new BehaviorSubject<any>(null);
  selectedSlide$ = this.selectedSlideSubject.asObservable();

  // Correct method name is setSelectedSlide, not getSelectedSlide
  setSelectedSlide(slide: any) {
    this.selectedSlideSubject.next(slide);
  }
}