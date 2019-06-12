import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  //Observable string sources
  private batimentFocusSource = new Subject<string>();

  //Observable string streams
  batimentFocus = this.batimentFocusSource.asObservable();

  //Service message commands
  focusBatiment(id:string){
    this.batimentFocusSource.next(id);
  }
  constructor() { }
}
