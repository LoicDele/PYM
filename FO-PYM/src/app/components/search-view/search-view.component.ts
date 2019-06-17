import { Component, OnInit } from '@angular/core';
import { Entreprise } from 'src/app/class/entreprise/entreprise';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntrepriseService } from 'src/app/services/entreprise-service/entreprise.service';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction-service/interaction.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {

  entreprises: Entreprise[];
  urlEntreprise: string = environment.sharedfolder + "logos/";
  subscriptionEntreprise: Subscription;
  toogle = true;
  constructor(private entrepriseService: EntrepriseService, private interactionService: InteractionService) {

  }
  ngOnInit() {
    this.subscriptionEntreprise = this.entrepriseService.subjectEntreprises.subscribe(res => { this.entreprises = res });
    this.entrepriseService.getEntrepriseByHTTP();
    $(".data").css('height', '100%');
  }

  ngOnDestroy() {
    this.subscriptionEntreprise.unsubscribe();
    var newHeight = 56;
    $(".data").animate({ top: newHeight });
    $(".arrow-data").removeClass('rotate');
    $(".data").css('height', '');
  }

  focus(id: number) {
    this.interactionService.zoomBatiment(id.toString());
  }

  deZoom() {
    this.interactionService.dezoomBatiment();
    var newHeight = 56;
    $(".data").animate({ top: newHeight });
    $(".arrow-data").removeClass('rotate');
  }

  hideInfos() {
    if (this.toogle) {
      this.toogle = false;
      var windowHeight = $(window).height();
      var modalHeight = 0;
      var offset = 100;

      var newHeight = windowHeight - (modalHeight + offset);
      $(".data").animate({ top: newHeight });
      $(".arrow-data").addClass('rotate');
    }
    else {
      this.toogle = true;
      var windowHeight = $(window).height();
      var newHeight = 56;
      $(".data").animate({ top: newHeight });
      $(".arrow-data").removeClass('rotate');
    }
  }
}
