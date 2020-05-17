import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-executed-info',
  templateUrl: './executed-info.component.html',
  styleUrls: ['./executed-info.component.scss']
})
export class ExecutedInfoComponent implements OnInit {
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
