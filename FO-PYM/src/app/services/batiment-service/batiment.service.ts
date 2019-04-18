import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batiment } from 'src/app/class/batiment/batiment';
import { Observable, of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BatimentService {
  urlBatiment: string ="http://127.0.0.1:8000/api/batiments";
  batiments: Batiment[];
  subjectBatiments = new Subject<Batiment[]>();
  constructor(private httpClient: HttpClient) { }

  requestHTTP(){
    return this.httpClient.get<Batiment[]> (this.urlBatiment);
  }
  getBatimentByHTTP(){
    this.requestHTTP().subscribe(res => {
      this.batiments = res;
      this.subjectBatiments.next(this.batiments);
    });
  }
}
