import {Component, HostListener, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  kind = 0;
  holder = '请输入企业名称、人名，产品名等，多关键词用空格隔开，如“小米 雷军';
  key: string = '';
  headline: any;
  recommend: any;

  items: any[] = [];

  @ViewChild('myDrop') myDrop;
  @ViewChild('input') input;

  width = 0;

  filter = (array: string[], key: string) => array.filter(x => x.includes(key));

  k = 0;
  provinces: string[] = ['河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北'
    , '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾'];

  constructor(private router: Router, private commonService: CommonService) {

  }

  ngOnInit() {
    this.commonService.getNews().then((x: any) => {
      this.headline = x.filter((x, y) => y % 2 == 0);
      this.recommend = x.filter((x, y) => y % 2 == 1);
    });
  }

  click(id): void {
    localStorage.setItem('cid', id);
    this.router.navigate(['company']);
  }

  selSpecial(sel) {
    this.commonService.special = sel;
    this.router.navigate(['/brands']);
  }

  selPromise(sel) {
    this.commonService.promise = sel;
    this.router.navigate(['/promise']);
  }

  search() {
    this.router.navigate(['/search'], {queryParams: {key: this.key, kind: this.kind}});
  }

  keyChanged(event) {
    this.width = this.input.nativeElement.offsetWidth;
    this.key = event;

    if (this.key.length !== 0) {
      this.commonService.getSearchHint(this.key, this.kind).then((x: any[]) => {
        console.log(x);
        this.items = x.map(x => x._source);
        if (this.items.length > 0)
          this.myDrop.open();
      });
    }
    else
      this.myDrop.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = this.input.nativeElement.offsetWidth;
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  changeKind(kind) {
    this.kind = kind;
    switch (kind) {
      case 0:
        this.holder = '请输入企业名称、人名，产品名等，多关键词用空格隔开，如“小米 雷军”';
        break;
      case 1:
        this.holder = '请输入企业名称、注册号或统一社会信用代码，如“小米科技”';
        break;
      case 2:
        this.holder = '请输入法人名称或股东名称，如“马云”';
        break;
      case 3:
        this.holder = '请输入高管名称，如“李嘉诚”';
        break;
      case 4:
        this.holder = '请输入品牌或产品的关键字，如“企信通”';
        break;
      case 5:
        this.holder = '请输入企业注册地址、联系电话、邮箱或网址，如“苏州工业园区”';
        break;
      case 6:
        this.holder = '请输入企业经营范围，如“软件”';
        break;
    }
  }

  findNews(s) {
    localStorage.setItem('url', s);
    this.router.navigate(['/hotnews']);
  }
}
