import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction-service/interaction.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-information-view',
  templateUrl: './information-view.component.html',
  styleUrls: ['./information-view.component.scss']
})
export class InformationViewComponent implements OnInit {
  toogle = true;
  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    $(".data").css('height', '100%');
  }

  ngOnDestroy(): void {
    var newHeight = 56;
    $(".data").animate({ top: newHeight });
    $(".arrow-data").removeClass('rotate');
    $(".data").css('height', '');
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
