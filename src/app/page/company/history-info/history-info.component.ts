import {Component, OnInit} from '@angular/core';
import {PageScrollConfig} from 'ngx-page-scroll';

@Component({
  selector: 'app-history-info',
  templateUrl: './history-info.component.html',
  styleUrls: ['./history-info.component.scss']
})
export class HistoryInfoComponent implements OnInit {
  page=1;

  constructor() {
  }

  ngOnInit() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;
  }

}
