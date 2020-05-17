import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-trademark',
  templateUrl: './trademark.component.html',
  styleUrls: ['./trademark.component.scss']
})
export class TrademarkComponent implements OnInit {
  d: any;
  searchContent = '';

  /*搜索的关键字*/

  constructor(private commonService: CommonService) {
    this.searchContent = this.commonService.brandSearch;
  }

  ngOnInit() {
    this.commonService.getBrandInfo(localStorage.getItem('brandId')).then((x: any) => {
      this.d = x;
    });
  }

}
