import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CompanyService} from '../../service/company.service';
import {Company} from '../../entity/bean';
import {Subscription} from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../service/common.service';
import {Monitor} from '../../entity/monitor';
import {StructureModal} from './modals/structure.modal';
import {NoteModal} from './modals/note.modal';
import {SaveGroupModal} from './modals/save-group.modal';
import {Attention} from '../../entity/attention';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  selector = 0;
  company: Company;
  subscription: Subscription;
  subscription1: any;
  alreadyAttention = false;
  alreadyMonitor = false;

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  constructor(private router: Router,
              private pageScrollService: PageScrollService,
              private companyService: CompanyService, private modalService: NgbModal, private commonService: CommonService,
              @Inject(DOCUMENT) private document: any) {
    const paths = this.router.url.split('/');
    const to = paths[paths.length - 1];
    switch (to) {
      case 'basicinfo':
        this.selector = 0;
        break;
      case 'legalproceed':
        this.selector = 1;
        break;
      case 'operatingcondition':
        this.selector = 2;
        break;
      case 'businessrisk':
        this.selector = 3;
        break;
      case 'businessreport':
        this.selector = 4;
        break;
      case 'intellectual':
        this.selector = 5;
        break;
      case 'historyinfo':
        this.selector = 6;
        break;
    }
  }

  ngOnInit() {
    // 移动到顶部位置
    const pageScrollInstance: PageScrollInstance = PageScrollInstance
      .newInstance({document: this.document, pageScrollDuration: 0, scrollTarget: undefined});
    pageScrollInstance.setScrollPosition(0);
    this.pageScrollService.start(pageScrollInstance);

    this.subscription = this.companyService.getSubject().subscribe(x => {
      this.company = x as Company;
      const monitor = new Monitor(localStorage.getItem('userId'), this.company.id);
      this.commonService.selectMonitor(monitor).then((z) => {
        if (z === null) {
          this.alreadyMonitor = false;
        } else {
          this.alreadyMonitor = true;
        }
      });
      const attention = new Monitor(localStorage.getItem('userId'), this.company.id);
      this.commonService.selectAttention(attention).then((z) => {
        if (z === null) {
          this.alreadyAttention = false;
        } else {
          this.alreadyAttention = true;
        }
      });
      this.subscription1 = this.companyService.subjectHaveAttention.subscribe(() => {
        const attention1 = new Monitor(localStorage.getItem('userId'), this.company.id);
        this.commonService.selectAttention(attention1).then((z) => {
          if (z === null) {
            this.alreadyAttention = false;
          } else {
            this.alreadyAttention = true;
          }
        });
      });
    });
  }

  bugHanddle = (bug) => {
    if (bug.length > 50) {
      bug = bug.slice(0, 50);
    }
    return this.reformNoticeContent(bug);
  };

  modalReference: NgbModalRef;

  openAttention(content) {
    this.modalService.open(SaveGroupModal, {windowClass: 'ass-modal'});
  }

  openNote() {
    /* this.modalService.open(NoteModal, {size: 'lg'});*/
    this.modalService.open(NoteModal, {windowClass: 'ass-modal'});
  }

  cancelAttention(id) {
    const attention = new Attention(localStorage.getItem('userId'), id);
    this.commonService.selectAttention(attention).then((z) => {
      const id1 = (z as Attention).id;
      this.commonService.deleteAttention(id1).then(() => {
        this.alreadyAttention = false;
      });
    });
  }

  saveMonitor() {
    this.alreadyMonitor = !this.alreadyMonitor;
    this.modalReference.close();
  }

  startMonitor(id) {
    const monitor = new Monitor(localStorage.getItem('userId'), id);
    this.commonService.addMonitor(monitor).then((x) => {
      if (x === 1) {
        this.alreadyMonitor = true;
      } else {
        this.alreadyMonitor = false;
      }
    });
  }

  cancelMonitor(id) {
    const monitor = new Monitor(localStorage.getItem('userId'), id);
    this.commonService.selectMonitor(monitor).then((z) => {
      console.log(z);
      const id = (z as Monitor).id;
      this.commonService.cancelMonitor(id).then(() => {
        this.alreadyMonitor = false;
      });
    });
  }

  // 过滤<p>标签
  reformNoticeContent = (content) => {
    content = content.split('');
    let tagBoolean = false;
    content.forEach((c, index) => {
      if ('<' === c) {
        tagBoolean = true;
      } else if ('>' === c) {
        content[index] = '';
        tagBoolean = false;
      }
      if (tagBoolean) {
        content[index] = '';
      }
    });
    content = content.join('');
    return content;
  };


  changePage(page: number) {
    this.selector = page;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }


  option = {
    'tooltip': {
      'formatter': function (param) {
        if (param.dataType === 'edge') {
          return param.data.category + ': ' + param.data.target;
        }
        return param.data.category + ': ' + param.data.name;
      }
    },
    'title': {
      'text': ''
    },
    'legend': [{
      'data': ['自然人股东', '企业股东', '大股东']
    }],
    'series': [{
      'top': 0,
      'label': {
        'normal': {
          'show': true,
          'position': 'inside',
          'textStyle': {
            'fontSize': 16
          }
        }
      },
      'roam': true,
      'edgeLabel': {
        'normal': {
          'show': true,
          'formatter': function (param) {
            return param.data.category;
          },
          'textStyle': {
            'fontSize': 16
          }
        }
      },
      'bottom': 0,
      'data': [{
        'name': '小米科技有限责任公司',
        'draggable': true,
        'category': '公司名称'
      }, {
        'name': '黎万强 \n股权比例:70% 缴纳金额:20万',
        'draggable': true,
        'symbolSize': [300, 40],
        /*"label": {
          "normal": {
            "textBorderWidth": 1,
            "textBorderColor": 'white',
          }
        },*/
        'category': '自然人股东'
      }, {
        'name': '洪峰',
        'draggable': true,
        'category': '自然人股东'
      }, {
        'name': '刘德',
        'draggable': true,
        'category': '自然人股东'
      }, {
        'name': '雷军',
        'draggable': true,
        'category': '大股东'
      }],
      'categories': [{
        'name': '公司名称'
      }, {
        'name': '自然人股东'
      }, {
        'name': '企业股东'
      }, {
        'name': '大股东'
      }],
      'type': 'graph',
      'focusNodeAdjacency': true,
      'force': {
        'repulsion': 1000,
        'edgeLength': [150, 300]
      },
      'layout': 'force',
      'symbolSize': [240, 30],
      'links': [{
        'target': '黎万强 \n股权比例:70% 缴纳金额:20万',
        'source': '小米科技有限责任公司',
        'category': '自然人股东'
      }, {
        'target': '洪峰',
        'source': '小米科技有限责任公司',
        'category': '自然人股东'
      }, {
        'target': '刘德',
        'source': '小米科技有限责任公司',
        'category': '自然人股东'
      }, {
        'target': '雷军',
        'source': '小米科技有限责任公司',
        'category': '大股东'
      }],
      'symbol': 'path://M19.300,3.300 L253.300,3.300 C262.136,3.300 269.300,10.463 269.300,19.300 L269.300,21.300 C269.300,30.137 262.136,37.300 253.300,37.300 L19.300,37.300 C10.463,37.300 3.300,30.137 3.300,21.300 L3.300,19.300 C3.300,10.463 10.463,3.300 19.300,3.300 Z',
      'lineStyle': {
        'normal': {
          'opacity': 0.9,
          'width': 1,
          'curveness': 0.1
        }
      }
    }],
    'animationEasingUpdate': 'quinticInOut',
    'animationDurationUpdate': 1500
  };

}
