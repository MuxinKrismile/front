import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {Group} from '../../../entity/group';


@Component({
  selector: 'editgroup-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">编辑分组</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="new-add">
          <a (click)="adGroup()"><span class="plus">+</span><span class="caption">新建分组</span></a>
        </div>
        <div *ngIf="addGroup" class="col-xs-24 margin-t-1x">
          <div class="group-label">
            <label class="sr-only">分组名称</label>
            <input class="group-content" placeholder="输入分组名字" [(ngModel)]="group" maxlength="50">
            <div class="btns">
              <button class="mr-2 btn btn-primary btn-sm" (click)="addSave()">保存</button>
              <button class="btn btn-outline-dark btn-sm" (click)="addCancel()">取消</button>
            </div>
          </div>
        </div>
        <div *ngFor="let g of groups; let idx=index">
          <div *ngIf="saveGroup[idx]" class="col-xs-24 margin-t-1x">
            <div class="group-label">
              <div class="group-label-inner hidelong">{{g}}
                <div class="icons font-16">
                  <span class="icon icon-rename cursor-p"></span><span
                  class="icon icon-delete margin-l-1x cursor-p"></span>
                </div>
                <div class="btns hide">
                  <button class="butn mr-2" style="color: #d3d3d3;" (click)="edGroup(idx)">
                    <i class="fa fa-pencil" style="font-size: 22px;"></i>
                  </button>
                  <button class="butn" style="color: #d3d3d3" (click)="delGroup(idx,g)">
                    <i class="fa fa-trash" style="font-size: 22px"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div *ngIf="!saveGroup[idx]" class="col-xs-24 margin-t-1x">
            <div class="group-label">
              <label class="sr-only">分组名称</label>
              <input class="group-content" value="" placeholder="{{g}}" [(ngModel)]="groupName" maxlength="50">
              <div class="btns">
                <button class="mr-2 btn btn-primary btn-sm" (click)="saGroup(idx,g,bsModalRef)">保存</button>
                <button class="btn btn-outline-dark btn-sm" (click)="canGroup(idx)">取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./group.modal.scss']

})
export class EditGroupModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  size: string;

  groups: any;
  tabs: any;
  addGroup = false;
  saveGroup: any;
  groupName: any;
  group: any;

  constructor(public bsModalRef: NgbActiveModal,
              private commonService: CommonService) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });

    this.commonService.getGroups().then((x) => {
      this.tabs = x;
      this.groups = this.tabs.map(z => z.type);
      this.saveGroup = Array(this.groups.length).fill(true);
      this.flag = true;
    });
  }

  adGroup(idx) {
    this.addGroup = true;
  }

  addSave() {
    const group = new Group(0, this.group);
    this.commonService.addGroup(group).then((x) => {
      this.commonService.getGroups().then((y) => {
        this.addGroup = false;
        this.tabs = y;
        this.groups = this.tabs.map(y => y.type);
        this.saveGroup = Array(this.groups.length).fill(true);
        this.commonService.subjectGroup.next();
      });
    });
  }

  addCancel() {
    this.addGroup = false;
  }

  edGroup(idx) {
    this.saveGroup[idx] = false;
  }

  delGroup(idx, type) {
    for (const x of this.tabs) {
      if (x.type === type) {
        this.commonService.deleteGroup(x.id).then(() => {
          this.commonService.getGroups().then((y) => {
            this.tabs = y;
            this.groups = this.tabs.map(y => y.type);
            this.commonService.subjectGroup.next();
          });
        });
      }
    }
  }

  saGroup(idx, type, bsModalRef) {
    bsModalRef.dismiss();
    this.saveGroup[idx] = true;
    for (const x of this.tabs) {
      if (x.type === type) {
        const group = new Group(x.id, this.groupName);
        this.commonService.updateGroup(group).then((z) => {
          this.commonService.subjectGroup.next();
        });
      }
    }
  }

  canGroup(idx) {
    this.saveGroup[idx] = true;
  }
}

