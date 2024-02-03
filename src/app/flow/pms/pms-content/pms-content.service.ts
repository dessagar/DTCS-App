// pms-content.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// pms-content.service.ts
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PmsContentService {
  
  private reloadSubject = new Subject<void>();

  triggerReload(): void {
    this.reloadSubject.next();
  }

  getReloadObservable(): Observable<void> {
    return this.reloadSubject.asObservable();
  }
}
