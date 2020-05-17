import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.scss']
})
export class GenealogyComponent implements OnInit {
  selector = 0;
  title: string;

  constructor(private router: Router,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
    const paths = this.router.url.split('/');
    const to = paths[paths.length - 1];
    switch (to) {
      case 'enterprisegraph':
        this.selector = 0;
        break;
      case 'investmentgraph':
        this.selector = 1;
        break;
      case 'associationgraph':
        this.selector = 2;
        break;
      case 'equitystructuregraph':
        this.selector = 3;
        break;
      case 'suspectedcontroller':
        this.selector = 4;
        break;
    }
  }

  ngOnInit() {
    this.title = localStorage.getItem('name');

    // 移动到顶部位置
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 0,
      scrollTarget: undefined
    });
    pageScrollInstance.setScrollPosition(0);
    this.pageScrollService.start(pageScrollInstance);
  }

  changePage(page: number) {
    this.selector = page;
  }

}
