import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entreprise } from '../../class/entreprise/entreprise';

import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  urlEntreprise: string = "http://127.0.0.1:8000/api/entreprises";
    //urlBatiment: string ="admin.map-pym.com/api/entreprises";
  entreprises: Entreprise[];
  entreprise: Entreprise;
  subjectEntreprises = new Subject<Entreprise[]>();
  subjectEntreprise = new Subject<Entreprise>();
  constructor(private httpClient: HttpClient) {

  }
  requestHTTP() {
    return this.httpClient.get<Entreprise[]>(this.urlEntreprise);
  }
  getEntrepriseByHTTP() {
    this.requestHTTP().subscribe(res => {
      this.entreprises = res;
      this.subjectEntreprises.next(this.entreprises);
    });
  }

  getEntrepriseById(id: number) {
    this.entreprise = this.entreprises.find((Entreprise) => { return Entreprise.id === id; });
    this.subjectEntreprise.next(this.entreprise);
  }

}
