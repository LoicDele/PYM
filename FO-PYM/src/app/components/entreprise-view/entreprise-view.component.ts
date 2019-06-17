import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise-service/entreprise.service';
import { Entreprise } from 'src/app/class/entreprise/entreprise';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InteractionService } from '../../services/interaction-service/interaction.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-entreprise-view',
  templateUrl: './entreprise-view.component.html',
  styleUrls: ['./entreprise-view.component.scss']
})
export class EntrepriseViewComponent implements OnInit, OnDestroy {
  entreprise: Entreprise;
  urlEntreprise: string = environment.sharedfolder + "logos/";
  subscriptionEntreprise: Subscription;
  idEnt: number;
  toogle = true;
  constructor(private entrepriseService: EntrepriseService, private route: ActivatedRoute, private interactionService: InteractionService) {

  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.idEnt = +this.route.snapshot.params['id'];
      this.subscriptionEntreprise = this.entrepriseService.subjectEntreprise.subscribe(res => { this.entreprise = res; });
      this.entrepriseService.getEntrepriseById(+this.route.snapshot.params['id']);
    });
  }

  ngOnDestroy() {
    this.subscriptionEntreprise.unsubscribe();
    var newHeight = 0.05 * $(window).height();
    $(".data").animate({ top: newHeight });
    $(".arrow-data").removeClass('rotate');
  }

  deZoom() {
    this.interactionService.dezoomBatiment();
    var newHeight = 0.05 * $(window).height();
    $(".data").animate({ top: newHeight });
    $(".arrow-data").removeClass('rotate');
  }

  hideInfos() {
    if (this.toogle) {
      this.toogle = false;
      var windowHeight = $(window).height();
      var modalHeight = 0;
      var offset = 150;

      var newHeight = windowHeight - (modalHeight + offset);
      $(".data").animate({ top: newHeight });
      $(".arrow-data").addClass('rotate');
    }
    else {
      this.toogle = true;
      var windowHeight = $(window).height();
      var newHeight = 0.05 * windowHeight;
      $(".data").animate({ top: newHeight });
      $(".arrow-data").removeClass('rotate');
    }
  }
}
