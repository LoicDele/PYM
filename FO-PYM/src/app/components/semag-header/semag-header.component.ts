import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../services/entreprise-service/entreprise.service';
import { Entreprise } from '../../class/entreprise/entreprise';
import { Subscription } from 'rxjs';
import { BatimentService } from '../../services/batiment-service/batiment.service';
import { Batiment } from 'src/app/class/batiment/batiment';
import { InteractionService } from '../../services/interaction-service/interaction.service';

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

  toggleCollapse() {
    this.show = !this.show;
  }
  constructor(private entrepriseService: EntrepriseService, private batimentService: BatimentService, private interactionService: InteractionService) {
  }
  ngOnInit() {

    this.subscriptionEntreprise = this.entrepriseService.subjectEntreprises.subscribe(res => { this.entreprises = res; });
    this.subscriptionBatiment = this.batimentService.subjectBatiments.subscribe(res => { this.batiments = res; });
    this.entrepriseService.getEntrepriseByHTTP();
    this.batimentService.getBatimentByHTTP();
  }
  focus(id: number) {
    this.interactionService.zoomBatiment(id.toString());
  }
}



