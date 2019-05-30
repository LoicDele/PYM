import { Component, OnInit, Input } from '@angular/core';
import { Bureau } from 'src/app/class/bureau/bureau';
import { Subscription } from 'rxjs';
import { BureauService } from 'src/app/services/bureau-service/bureau.service';

@Component({
  selector: 'app-bureau-view',
  templateUrl: './bureau-view.component.html',
  styleUrls: ['./bureau-view.component.scss']
})
export class BureauViewComponent implements OnInit {
  //@Input() idBat: number;
  bureaux: Bureau[];
  subscriptionBureau: Subscription;

  constructor(private bureauService: BureauService) { }

  ngOnInit() {
    this.subscriptionBureau = this.bureauService.subjectBureaux.subscribe(res => { this.bureaux = res; });
    this.bureauService.getBureauByHTTP();
  }

}
