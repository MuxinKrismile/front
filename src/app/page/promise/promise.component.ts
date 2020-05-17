import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {
  kind = 0;
  holder = '输入姓名/组织名';
  title = '失信人';
  searchContent = '';

  constructor(private commonService: CommonService, private router: Router) {
    this.changeKind(this.commonService.promise);
  }

  ngOnInit() {
  }

  changeTab() {
    this.commonService.promiseSearch=this.searchContent;
    if (this.commonService.promise == 0) {
      this.router.navigate(['/promise-search']);
    } else if (this.commonService.promise == 1) {
      this.router.navigate(['/promise-search/executed']);
    } else if (this.commonService.promise == 2) {
      this.router.navigate(['/promise-search/referee']);
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.changeTab();
    }
  }

  changeKind(kind) {
    this.kind = kind;
    this.commonService.promise = kind;
    switch (kind) {
      case 0:
        this.holder = '输入姓名/组织名';
        this.title = '失信人';
        break;
      case 1:
        this.holder = '输入姓名/组织名';
        this.title = '被执行人';
        break;
      case 2:
        this.holder = '请输入裁判文书名称';
        this.title = '裁判文书';
        break;
    }
  }
}
