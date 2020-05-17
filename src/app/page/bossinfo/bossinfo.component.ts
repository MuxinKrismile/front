import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../service/common.service';
import {PageScrollConfig} from 'ngx-page-scroll';
import {CompanyService} from '../../service/company.service';
import {BossModal} from '../company/modals/boss.modal';
import {PersonModal} from '../company/modals/person.modal';

@Component({
  selector: 'app-bossinfo',
  templateUrl: './bossinfo.component.html',
  styleUrls: ['./bossinfo.component.scss']
})
export class BossinfoComponent implements OnInit {

  selector = 0;
  d: any;

  changePage(page: number) {
    this.selector = page;
  }

  constructor(private modalService: NgbModal,
              private commonService: CommonService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;

    this.commonService.getBossInfoById(this.companyService.bid).then(x => {
      this.d = x;
    });
  }

  bugHanddle = (bug) => {
    if (bug.length > 75)
      bug = bug.slice(0, 75);
    return bug;
  };

  openLg(content: number, id: number) {
    if (content == 0) {
      localStorage.setItem('bid', id.toString());
      this.modalService.open(BossModal, {size: 'sm'});
    } else if (content == 1) {
      localStorage.setItem('bid', id.toString());
      this.modalService.open(PersonModal, {size: 'lg'});
    }
  }

  data = [{
    name: '北京',
    value: 5.3
  },
    {
      name: '天津',
      value: 3.8
    },
    {
      name: '上海',
      value: 4.6
    },
    {
      name: '重庆',
      value: 3.6
    },
    {
      name: '河北',
      value: 3.4
    },
    {
      name: '河南',
      value: 3.2
    },
    {
      name: '云南',
      value: 1.6
    },
    {
      name: '辽宁',
      value: 4.3
    },
    {
      name: '黑龙江',
      value: 4.1
    },
    {
      name: '湖南',
      value: 2.4
    },
    {
      name: '安徽',
      value: 3.3
    },
    {
      name: '山东',
      value: 3.0
    },
    {
      name: '新疆',
      value: 1
    },
    {
      name: '江苏',
      value: 3.9
    },
    {
      name: '浙江',
      value: 3.5
    },
    {
      name: '江西',
      value: 2.0
    },
    {
      name: '湖北',
      value: 2.1
    },
    {
      name: '广西',
      value: 3.0
    },
    {
      name: '甘肃',
      value: 1.2
    },
    {
      name: '山西',
      value: 3.2
    },
    {
      name: '内蒙古',
      value: 3.5
    },
    {
      name: '陕西',
      value: 2.5
    },
    {
      name: '吉林',
      value: 4.5
    },
    {
      name: '福建',
      value: 2.8
    },
    {
      name: '贵州',
      value: 1.8
    },
    {
      name: '广东',
      value: 3.7
    },
    {
      name: '青海',
      value: 0.6
    },
    {
      name: '西藏',
      value: 0.4
    },
    {
      name: '四川',
      value: 3.3
    },
    {
      name: '宁夏',
      value: 0.8
    },
    {
      name: '海南',
      value: 1.9
    },
    {
      name: '台湾',
      value: 0.1
    },
    {
      name: '香港',
      value: 0.1
    },
    {
      name: '澳门',
      value: 0.1
    }
  ];

  chartOption = {
    title: {
      text: '关联企业区域分布图',
      textStyle: {
        fontSize: 13,
      },
      x: 'left'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        saveAsImage: {show: true}
      }
    },
    tooltip: {
      show: true,
      formatter: function (params) {
        return params.name + '：' + params.data['value'] + '%';
      },
    },
    visualMap: {
      type: 'continuous',
      text: ['高', '低'],
      showLabel: true,
      seriesIndex: [0],
      calculable: true,
      min: 0,
      max: 7,
      inRange: {
        color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
      },
      textStyle: {
        color: '#000'
      },
      bottom: 30,
    },
    geo: {
      roam: false,
      map: 'china',
      layoutSize: '80%',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        emphasis: {
          areaColor: '#fff464'
        }
      },

    },
    series: [{
      name: 'mapSer',
      type: 'map',
      roam: false,
      geoIndex: 0,
      label: {
        show: false,
      },
      data: this.data,
    }]
  };

  options = {
    grid: {
      top: 100,
      right: 20,
      bottom: 75,
      left: 75,
      backgroundColor: '#fbfbfb'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        saveAsImage: {show: true}
      }
    },
    title: {
      text: '关联企业行业分布图',
      textStyle: {
        fontSize: 13,
      },
      x: 'left'
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        rotate: 20
      },
      splitLine: {
        show: false
      },
      data: ['批发和零售业', '金融业', '租赁和商务服务业', '信息传输、软件和信息技术服务业', '科学研究和技术服务业']
    },
    yAxis: {
      axisLine: {
        show: true
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#dbdbdb',
          width: 0.5
        }
      },
      axisTick: {
        show: true
      }
    },
    series: [{
      data: [1, 1, 3, 4, 5],
      type: 'bar',
      barMaxWidth: 40,
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      itemStyle: {
        normal: {
          color: '#72adf4',
        }
      },
    }]
  };
}
