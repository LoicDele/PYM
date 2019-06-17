import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html',
  styleUrls: ['./footer-view.component.scss']
})
export class FooterViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    $("#footer").hide();
    $("#footer").css({'height': 0});

  }
}
