import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-hotnews',
  templateUrl: './hotnews.component.html',
  styleUrls: ['./hotnews.component.scss']
})
export class HotnewsComponent implements OnInit {
  d: any;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any, private commonService: CommonService) {
  }

  ngOnInit() {

    let pageScrollInstance: PageScrollInstance = PageScrollInstance
      .newInstance({document: this.document, pageScrollDuration: 0, scrollTarget: undefined});
    pageScrollInstance.setScrollPosition(0);
    this.pageScrollService.start(pageScrollInstance);

    this.commonService.getNewsInfo(localStorage.getItem('url')).then((x: any) => {
      console.log(x);
      this.d = x;
    });
  }


}
