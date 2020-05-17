import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-lostpro',
  templateUrl: './lostpro.component.html',
  styleUrls: ['./lostpro.component.scss']
})
export class LostproComponent implements OnInit, OnDestroy {
  page = 1;
  lostpros: any;
  searchContent = '';
  /*搜索的关键字*/
  unSubscriber;

  constructor(private router: Router, private commonService: CommonService) {
    this.searchContent=this.commonService.promiseSearch;
  }

  ngOnInit() {
    this.commonService.getLostPro(this.searchContent).then((x: any) => {
      this.lostpros = x.map(z => z._source);
    });
    this.unSubscriber = this.commonService.subjectPromise.subscribe(x => {
      this.searchContent = x;
      this.commonService.getLostPro(x).then((x: any) => {
        console.log('ggg' + this.searchContent);
        this.lostpros = x.map(z => z._source);
      });
    });
  }

  replaceFun = (source: string, key: string) => {
    if (source)
      return source.replace(key, '<em>' + key + '</em>');
  };

  selPromiseInfo(id) {
    localStorage.setItem('promiseId', id);
    this.router.navigate(['/promise-search/lostpro-info']);
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
