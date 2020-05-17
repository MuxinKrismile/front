import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {default as SOFTWARE, Software} from './software';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  page = 1;
  searchContent = '';
  softwares: Software[] = SOFTWARE;

  constructor(private commonService: CommonService) {
    this.searchContent=this.commonService.brandSearch;
  }

  ngOnInit() {
  }

  selectZx(sel) {
    this.commonService.special = sel;
  }

}
