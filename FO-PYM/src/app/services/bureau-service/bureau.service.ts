import { Injectable } from '@angular/core';
import { Bureau } from 'src/app/class/bureau/bureau';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BureauService {
  urlBureau: string = "http://127.0.0.1:8000/api/bureaux";
  //urlBureau: string ="http://admin.map-pym.com/api/bureaux";
  bureaux: Bureau[];
  subjectBureaux = new Subject<Bureau[]>();
  constructor(private httpClient: HttpClient) { }

  requestHTTP() {
    return this.httpClient.get<Bureau[]>(this.urlBureau);
  }
  getBureauByHTTP() {
    this.requestHTTP().subscribe(res => {
      this.bureaux = res;
      this.subjectBureaux.next(this.bureaux);
    });
  }

}
