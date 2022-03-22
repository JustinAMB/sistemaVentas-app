import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  resizeObservable$: Observable<Event>;
resizeSubscription$: Subscription;

  navbar:boolean=false;
  tam:boolean=true;
  constructor() { 
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.tam=window.innerWidth<768;
      this.navbar=(window.innerWidth<768)  && (!this.navbar);
    })
    
  }
}
