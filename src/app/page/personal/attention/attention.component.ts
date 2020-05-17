import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupModal} from '../../company/modals/group.modal';
import {EditGroupModal} from '../../company/modals/edit-group.modal';
import {CommonService} from '../../../service/common.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit, OnDestroy {
  tabs: any;
  groups: any;
  flag_tabs: any;
  flag_idx = 0;
  d: any;
  unSubscriber: any;
  unSubscriber1: any;

  constructor(private modalService: NgbModal, private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getGroups().then((x) => {
      this.tabs = ['全部'];
      this.groups = x;
      this.tabs = [...this.tabs, ...(this.groups.map(z => z.type))];
      this.flag_tabs = Array(this.tabs.length).fill(false);
      this.flag_tabs[this.flag_idx] = true;
    });
    this.unSubscriber1 = this.commonService.subjectGroup.subscribe(() => {
      this.commonService.getGroups().then((x) => {
        this.tabs = ['全部'];
        this.groups = x;
        this.tabs = [...this.tabs, ...(this.groups.map(z => z.type))];
        this.flag_tabs = Array(this.tabs.length).fill(false);
        this.flag_tabs[this.flag_idx] = true;
      });
    });
    this.commonService.getAttentionCompany(localStorage.getItem('userId'), this.commonService.groupId).then((x) => {
      this.d = x;
    });
    this.unSubscriber = this.commonService.subjectAttention.subscribe(() => {
      this.commonService.getAttentionCompany(localStorage.getItem('userId'), this.commonService.groupId).then(x => {
        this.d = x;
      });
    });
  }

  openModal(id) {
    this.commonService.attentionId = id;
    this.commonService.groupId = this.flag_idx;
    this.modalService.open(GroupModal, {windowClass: 'ass-modal'});
  }

  editModal() {
    this.modalService.open(EditGroupModal, {windowClass: 'dark-modal'});
  }

  changeTab(idx, type) {
    this.flag_tabs[this.flag_idx] = false;
    this.flag_tabs[idx] = true;
    this.flag_idx = idx;
    if (idx === 0) {
      this.commonService.getAttentionCompany(localStorage.getItem('userId'), idx).then((x) => {
        this.d = x;
      });
    } else {
      for (const x of this.groups) {
        if (type === x.type) {
          this.commonService.getAttentionCompany(localStorage.getItem('userId'), x.id).then((z) => {
            this.d = z;
          });
        }
      }
    }
  }

  deleteAttention(id) {
    this.commonService.deleteAttention(id).then(() => {
      this.commonService.getAttentionCompany(localStorage.getItem('userId'), this.flag_idx).then(x => {
        this.d = x;
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
    this.unSubscriber1.unsubscribe();
  }
}
