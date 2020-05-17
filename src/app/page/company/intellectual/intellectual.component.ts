import {Component, OnInit} from '@angular/core';
import {PageScrollConfig} from 'ngx-page-scroll';

@Component({
  selector: 'app-intellectual',
  templateUrl: './intellectual.component.html',
  styleUrls: ['./intellectual.component.scss']
})
export class IntellectualComponent implements OnInit {
  page=1;

  constructor() {
  }

  ngOnInit() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;
  }

}
