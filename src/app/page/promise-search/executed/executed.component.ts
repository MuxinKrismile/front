import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {default as EXECUTED, Executed} from './executed';

@Component({
  selector: 'app-executed',
  templateUrl: './executed.component.html',
  styleUrls: ['./executed.component.scss']
})
export class ExecutedComponent implements OnInit {
  page = 1;
  executeds: Executed[] = EXECUTED;
  searchContent = '';/*搜索的关键字*/

  /*搜索的关键字*/

  constructor(private commonService: CommonService) {
    this.searchContent=this.commonService.promiseSearch;
  }

  ngOnInit() {
  }

  selectZx(sel) {
    this.commonService.promise = sel;
  }
}
