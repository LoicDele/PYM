import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../services/entreprise-service/entreprise.service';
import { Entreprise } from '../../class/entreprise/entreprise';
import { Subscription } from 'rxjs';
import { BatimentService } from '../../services/batiment-service/batiment.service';
import { Batiment } from 'src/app/class/batiment/batiment';
import { InteractionService } from '../../services/interaction-service/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semag-header',
  templateUrl: './semag-header.component.html',
  styleUrls: ['./semag-header.component.scss']
})
export class SemagHeaderComponent implements OnInit {
  entreprises: Entreprise[] = [];
  batiments: Batiment[] = [];
  subscriptionEntreprise: Subscription;
  subscriptionBatiment: Subscription;
  show: boolean = false;
  searchtext: string;
  routertab = [0,0,0];
  toggleCollapse() {
    this.show = !this.show;
  }
  constructor(private entrepriseService: EntrepriseService, private batimentService: BatimentService, private interactionService: InteractionService, private router: Router) {
  }
  ngOnInit() {

    this.subscriptionEntreprise = this.entrepriseService.subjectEntreprises.subscribe(res => { this.entreprises = res; });
    this.subscriptionBatiment = this.batimentService.subjectBatiments.subscribe(res => { this.batiments = res; this.initroutertab(); });
    this.entrepriseService.getEntrepriseByHTTP();
    this.batimentService.getBatimentByHTTP();

  }
  focus(id: number) {
    this.interactionService.zoomBatiment(id.toString());
  }
  go(id: number) {
    this.router.navigate(['/entreprise', id])
  }
  equipement(id: number) {
    this.router.navigate(['/batiment', this.routertab[id]])
    this.focus(this.routertab[id]);
  }
  initroutertab(){
    for (let bat of this.batiments) {
      if(bat.type == "IRVE"){
        this.routertab[1] = bat.id;
      }
      if(bat.type == "PAV"){
        this.routertab[2] = bat.id;
      }
      if(bat.type == "Arret de bus"){
        this.routertab[0] = bat.id;
      }
    }
  }
}



