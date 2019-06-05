import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batiment } from 'src/app/class/batiment/batiment';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BatimentService {
  urlBatiment: string = environment.api + "batiments";
  batiments: Batiment[];
  batiment: Batiment;
  subjectBatiments = new Subject<Batiment[]>();
  SubjectBatiment = new Subject<Batiment>();
  constructor(private httpClient: HttpClient) { }

  requestHTTP() {
    return this.httpClient.get<Batiment[]>(this.urlBatiment);
  }
  getBatimentByHTTP() {
    this.requestHTTP().subscribe(res => {
      this.batiments = res;
      this.subjectBatiments.next(this.batiments);
    });
  }
  getBatimentById(id: number) {
    this.batiment = this.batiments.find((Batiment) => { return Batiment.id === id; });
    this.SubjectBatiment.next(this.batiment);
  }
}
