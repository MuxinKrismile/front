import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';
import {UpdateAttention} from '../../../entity/UpdateAttention';


@Component({
  selector: 'group-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">选择分组</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <div class="mb-2 choice" *ngFor="let g of groups">
            <label class="radio">{{g}}<input type="radio" [(ngModel)]="group" [value]="g"
                                             (click)="onCheck(g)"><i></i></label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" (click)="submit(bsModalRef)">保存</button>
      </div>
    </div>
  `,
  styleUrls: ['./group.modal.scss']

})
export class GroupModal implements OnInit {
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
      this.group = this.groups[0];
      this.flag = true;
    });
  }

  onCheck(radio) {
    this.group = radio;
  }

  submit(bsModalRef) {
    bsModalRef.dismiss();
    for (const x of this.tabs) {
      if (x.type === this.group) {
        const updateAttention = new UpdateAttention(this.commonService.attentionId, x.id);
        this.commonService.updateAttention(updateAttention).then((z) => {
          this.commonService.subjectAttention.next();
        });
      }
    }
  }
}

