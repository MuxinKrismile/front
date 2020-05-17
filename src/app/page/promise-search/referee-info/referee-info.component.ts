import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-referee-info',
  templateUrl: './referee-info.component.html',
  styleUrls: ['./referee-info.component.scss']
})
export class RefereeInfoComponent implements OnInit {
  searchContent = '';/*搜索的关键字*/

  constructor(private commonService: CommonService) {
    this.searchContent=this.commonService.promiseSearch;
  }

  ngOnInit() {
  }

  selectZx(sel) {
    this.commonService.promise = sel;
  }

}
