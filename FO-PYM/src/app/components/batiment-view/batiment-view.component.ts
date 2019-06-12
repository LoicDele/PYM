import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Batiment } from 'src/app/class/batiment/batiment';
import { BatimentService } from 'src/app/services/batiment-service/batiment.service';
import { Subscription } from 'rxjs';
import { InteractionService } from '../../services/interaction-service/interaction.service';

@Component({
  selector: 'app-batiment-view',
  templateUrl: './batiment-view.component.html',
  styleUrls: ['./batiment-view.component.scss']
})
export class BatimentViewComponent implements OnInit, OnDestroy {
  batiment: Batiment;
  subscriptionBatiment: Subscription;
  idBat: number
  constructor(private batimentService: BatimentService, private route: ActivatedRoute, private interactionService: InteractionService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.idBat = +this.route.snapshot.params['id'];
      this.subscriptionBatiment = this.batimentService.SubjectBatiment.subscribe(res => {this.batiment = res;});
      this.batimentService.getBatimentById(+this.route.snapshot.params['id']);
    });
  }
  ngOnDestroy(): void {
    this.subscriptionBatiment.unsubscribe();

  }
  deZoom(){
    this.interactionService.dezoomBatiment()
  }
}
