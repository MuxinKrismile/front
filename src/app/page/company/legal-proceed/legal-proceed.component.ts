import {Component, OnInit} from '@angular/core';
import {PageScrollConfig} from 'ngx-page-scroll';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';

@Component({
  selector: 'app-legal-proceed',
  templateUrl: './legal-proceed.component.html',
  styleUrls: ['./legal-proceed.component.scss']
})
export class LegalProceedComponent implements OnInit {
  page = 1;
  d: any;
  num: any[] = [];

  constructor(private commonService: CommonService, private companyService: CompanyService) {
  }

  ngOnInit() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;

    this.commonService.getLegalactionInfo(this.companyService.cid).then(x => {
      this.d = x;
      console.log(this.d);
      for (let i = 0; i < 3; i++) {
        this.num[i] = Math.floor(Math.random() * (90 - 1 + 1) + 10);
      }
    });
  }

  yData = [];

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
      text: '企业对外投资区域分布图',
      textStyle: {
        fontSize: 13,
      },
      x: 'left'
    },
    tooltip: {
      show: true,
      formatter: function (params) {
        return params.name + '：' + params.data['value'] + '%';
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {show: true},
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
  option = {
    title: {
      text: '法律诉讼年份分布',
      textStyle: {
        fontSize: 13,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['裁判文书', '法院公告', '开庭公告'],
      x: 'center',
      y: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {show: true},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '7%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['2014', '2015', '2016', '2017', '2018']
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '裁判文书',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'insideTop',
        },
      },
      data: [0, 319, 665, 1359, 416]
    }, {
      name: '法院公告',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'insideTop',
        },
      },
      data: [34, 62, 70, 59, 16]
    }, {
      name: '开庭公告',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'insideTop',
        },
      },
      data: [1, 15, 93, 739, 295]
    }]
  };
}
