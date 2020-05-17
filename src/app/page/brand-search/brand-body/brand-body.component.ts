import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand-body',
  templateUrl: './brand-body.component.html',
  styleUrls: ['./brand-body.component.scss']
})
export class BrandBodyComponent implements OnInit, OnDestroy {
  page = 1;
  trademarks: any;
  searchContent = '';
  /*搜索的关键字*/
  unSubscriber;

  constructor(private router: Router, private commonService: CommonService) {
    this.searchContent=this.commonService.brandSearch;
  }

  ngOnInit() {
    this.commonService.getBrand(this.commonService.brandSearch).then(x => {
      this.trademarks = x;
    });
    this.unSubscriber = this.commonService.subject.subscribe(x => {
      this.commonService.getBrand(x).then(x => {
        this.trademarks = x;
      });
    });
  }

  selBrandInfo(id) {
    localStorage.setItem('brandId', id);
    this.router.navigate(['/brand-search/trademark']);
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
