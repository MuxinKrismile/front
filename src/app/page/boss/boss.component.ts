import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {CompanyService} from '../../service/company.service';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss']
})
export class BossComponent implements OnInit {
  page = 1;
  kind = Array(2).fill(-1);
  kindLast = Array(2).fill(-1);
  provinces = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '广西', '内蒙', '西藏', '宁夏', '新疆'];
  works = ['农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业', '建筑业', '批发和零售业', '交通运输、仓储和邮政业', '住宿和餐饮业',
    '信息传输、软件和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '教育', '文化、体育和娱乐业', '公共管理、社会保障和社会组织', '国际组织'];

  constructor(private router: Router, private companyService: CompanyService) {
  }

  proFlag = false;
  workFlag = false;

  ngOnInit() {
  }

  selValue(idx, select) {
    if (this.kindLast[idx] == select) {
      this.kind[idx] = -1;
      this.kindLast[idx] = -1;
    } else {
      this.kind[idx] = select;
      this.kindLast[idx] = select;
    }
  }

  selBoss() {
   localStorage.setItem('bid', '27');
    this.router.navigate(['bossinfo']);
  }

  openProvince() {
    this.proFlag = !this.proFlag;
  }

  openWork() {
    this.workFlag = !this.workFlag;
  }
}
