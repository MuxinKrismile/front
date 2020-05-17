import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../../entity/bean';
import {CompanyService} from '../../../service/company.service';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-search-body',
  templateUrl: './search-body.component.html',
  styleUrls: ['./search-body.component.scss'],
  providers: [DatePipe]
})
export class SearchBodyComponent implements OnInit, OnDestroy, OnChanges{
  @Input() com: Company[] = [];
  @Input() k: string;
  @Output() fromChild = new EventEmitter<number>();
  selected = '0';

  company: Company[] = [];

  subscription: Subscription;

  constructor(private companyService: CompanyService,
              private commonService: CommonService,
              private router: Router,
              private pipe: DatePipe) {
  }

  page = 1;

  replaceFun = (source: string, key: string) => source.replace(key, '<em>' + key + '</em>');

  sort(e) {
    this.fromChild.emit(e);
  }

  navigate(id) {
    localStorage.setItem('cid', id);
    this.router.navigate(['company']);
  }

  ngOnInit(): void {
    this.commonService.map = new Map();
    this.subscription = this.commonService.filterSubject.subscribe(() => {
      this.company = this.filter(this.com);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.company = this.filter(this.com);
  }

  filter(c: Company[]) {
    let gg = c;
    this.commonService.map.forEach((v, k) => {
      if(k == 2) {
        gg = gg.filter(x => x.status.search(v) != -1);
      }

      if(k == 3) {
        let low = 0;
        let up = 500;
        switch (v) {
          case 0:
            up = 500;
            low = 0;
            break;
          case 1:
            low = 500;
            up = 1000;
            break;
          case 2:
            low = 1000;
            up = 5000;
            break;
          case 3:
            low = 5000;
            up = 9999999;
            break;
        }
        gg = gg.filter(x => x.money > low && x.money < up);
      }

      if(k == 4) {
        gg = gg.filter(x => this.pipe.transform(x.foundTime, 'yyyy-MM-dd').includes(v));
      }

      if(k == 5) {
        gg = gg.filter(x => x.addr.includes(v));
      }
    });

    return gg;
  }

}
