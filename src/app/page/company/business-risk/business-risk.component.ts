import {Component, OnInit} from '@angular/core';
import {PageScrollConfig} from 'ngx-page-scroll';

@Component({
  selector: 'app-business-risk',
  templateUrl: './business-risk.component.html',
  styleUrls: ['./business-risk.component.scss']
})
export class BusinessRiskComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;
  }

}
