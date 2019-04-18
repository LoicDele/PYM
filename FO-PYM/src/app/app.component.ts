import { Component, OnInit } from '@angular/core';

import { EntrepriseService } from './services/entreprise-service/entreprise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'semag';
  entreprises: any[];
  constructor(private enrepriseService: EntrepriseService){
  }

  ngOnInit(){
  }
}
