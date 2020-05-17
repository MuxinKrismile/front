import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {BossModal} from '../../company/modals/boss.modal';
import {PersonModal} from '../../company/modals/person.modal';
import {DeleteModal} from '../../company/modals/delete.modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit, OnDestroy {
  d: any;
  unSubscriber;

  constructor(private modalService: NgbModal, private router: Router, private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getMonitorCompany(localStorage.getItem('userId')).then(x => {
      this.d = x;
    });
    this.unSubscriber = this.commonService.subjectMonitor.subscribe(() => {
      this.commonService.getMonitorCompany(localStorage.getItem('userId')).then(x => {
        this.d = x;
        console.log(this.d);
      });
    });
  }

  selectCompany(id) {
    localStorage.setItem('cid', id);
    this.router.navigate(['company/basicinfo']);
  }

  openModal(id) {
    console.log(id);
    this.commonService.mid = id;
    this.modalService.open(DeleteModal, {windowClass: 'ass-modal'});
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
