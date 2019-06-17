import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Batiment } from 'src/app/class/batiment/batiment';
import { BatimentService } from 'src/app/services/batiment-service/batiment.service';
import { Subscription } from 'rxjs';
import { InteractionService } from '../../services/interaction-service/interaction.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-batiment-view',
  templateUrl: './batiment-view.component.html',
  styleUrls: ['./batiment-view.component.scss']
})
export class BatimentViewComponent implements OnInit, OnDestroy {
  batiment: Batiment;
  subscriptionBatiment: Subscription;
  idBat: number;
  toogle = true;
  constructor(private batimentService: BatimentService, private route: ActivatedRoute, private interactionService: InteractionService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.idBat = +this.route.snapshot.params['id'];
      this.subscriptionBatiment = this.batimentService.SubjectBatiment.subscribe(res => {this.batiment = res;});
      this.batimentService.getBatimentById(+this.route.snapshot.params['id']);
    });
    $(".data").css('height','100%');
  }
  ngOnDestroy(): void {
    this.subscriptionBatiment.unsubscribe();
    var newHeight = 56;
    $(".data").animate({top: newHeight});
    $(".arrow-data").removeClass('rotate');
    $(".data").css('height','');
  }
  deZoom(){
    this.interactionService.dezoomBatiment()
    var newHeight = 56;
    $(".data").animate({top: newHeight});
    $(".arrow-data").removeClass('rotate');
  }

  hideInfos(){
    if(this.toogle){
      this.toogle = false;
      var windowHeight = $(window).height();
      var modalHeight = 0;
      var offset = 100;

      var newHeight = windowHeight - (modalHeight + offset);
      $(".data").animate({top: newHeight});
      $(".arrow-data").addClass('rotate');
    }
    else{
      this.toogle = true;
      var windowHeight = $(window).height();
      var newHeight = 56;
      $(".data").animate({top: newHeight});
      $(".arrow-data").removeClass('rotate');
    }
  }
}
