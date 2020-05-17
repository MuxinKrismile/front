import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';
import {Monitor} from '../../../entity/monitor';
import {SaveAttention} from '../../../entity/SaveAttention';
import {Group} from '../../../entity/group';


@Component({
  selector: 'boss-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">添加关注</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="mb-2 choice" *ngFor="let g of groups;let idx=index">
          <label class="radio">{{g}}<input type="radio" [(ngModel)]="group" [value]="g"
                                           (click)="onAttentionCheck(g)"><i></i></label>
        </div>
        <div class="mb-2 choice d-flex">
          <label class="radio">更多...<input type="radio" [(ngModel)]="group" (click)="onAttentionCheck('添加')"><i></i></label>
          <input *ngIf="ainputFlag" type="text" [(ngModel)]="addGroup" class="ml-2 form-control pl-1" style="width: 120px;height: 26px"/>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" (click)="saveSel(bsModalRef)">确认</button>
      </div>
    </div>
  `,
  styleUrls: ['./save-group.modal.scss']

})
export class SaveGroupModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  d;

  size: string;

  groups: any;
  tabs: any;
  group: any;
  ainputFlag = false;
  addGroup: any;

  constructor(public bsModalRef: NgbActiveModal,
              private commonService: CommonService, private companyService: CompanyService) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });

    this.commonService.getGroups().then((x) => {
      this.tabs = x;
      this.groups = this.tabs.map(z => z.type);
      this.group = this.groups[0];
      this.flag = true;
    });
  }

  onAttentionCheck(radio) {
    if (radio === '添加') {
      this.ainputFlag = true;
    } else {
      this.group = radio;
    }
  }

  saveSel(bsModalRef) {
    bsModalRef.dismiss();
    if (this.group === undefined) {
      const saveAttention = new SaveAttention(localStorage.getItem('userId'), this.companyService.cid, 0, this.addGroup);
      console.log(saveAttention);
      this.commonService.addAttention(saveAttention).then((y) => {
        if (y !== 0) {
          this.companyService.subjectHaveAttention.next();
        }
      });
    } else {
      for (const x of this.tabs) {
        if (x.type === this.group) {
          console.log(x.id);
          console.log(this.group);
          const saveAttention = new SaveAttention(localStorage.getItem('userId'), this.companyService.cid, x.id, this.group);
          this.commonService.addAttention(saveAttention).then((y) => {
            this.companyService.subjectHaveAttention.next();
          });
        }
      }
    }
  }
}

