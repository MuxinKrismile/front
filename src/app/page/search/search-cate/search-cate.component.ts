import {Component, EventEmitter, Output} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-search-cate',
  templateUrl: './search-cate.component.html',
  styleUrls: ['./search-cate.component.scss']
})
export class SearchCateComponent {
  k: number = 0;
  kind = Array(7).fill(-1);
  ranges = ['企业名', '法人或股东', '高管', '品牌/产品', '联系方式', '经营范围'];
  types = ['企业', '社会组织', '香港公司', '台湾公司'];
  staues = ['暂无', '在业', '核准设立', '存续', '迁入', '迁出', '吊销', '撤销', '仍注册', '已告解散', '注销'];
  capitals = ['500万以下', '500~1000万', '1000~5000万', '5000万以上'];
  dates = ['2018', '2017', '2016', '2015', '2014', '2013'];
  provinces = ['安徽', '北京', '重庆', '福建', '广东', '广西', '湖北'];
  works = ['农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业'];

  constructor(private commonService: CommonService) {}

  @Output() filter: EventEmitter<number> = new EventEmitter<number>();

  selValue(idx, select) {
    if (this.commonService.map.get(idx) == select) {
      this.kind[idx] = -1;
      this.commonService.map.delete(idx);
    } else {
      this.kind[idx] = select;
      this.commonService.map.set(idx, select);
    }
    this.commonService.filterSubject.next();
  }

  invokeFilter() {
    this.filter.emit(500);
  }
}
