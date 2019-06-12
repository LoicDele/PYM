import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  //Observable string sources
  private batimentZoomSource = new Subject<string>();
  private batimentDezoomSource = new Subject<any>();
  private i: number = 0;

  //Observable string streams
  batimentZoom = this.batimentZoomSource.asObservable();
  batimentDezoom = this.batimentDezoomSource.asObservable();
  //Service message commands
  zoomBatiment(id:string){
    this.batimentZoomSource.next(id);
  }
  dezoomBatiment(){
    this.i= this.i +1;
    this.batimentDezoomSource.next(this.i.toString());
  }

  constructor() { }
}
