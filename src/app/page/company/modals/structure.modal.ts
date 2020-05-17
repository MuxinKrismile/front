import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';


@Component({
  selector: 'structure-modal',
  template: `
    <div #div class="modal-header">
      <h4 class="modal-title">股权结构</h4>
      <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="mb-1 info">
        <span style="font-size: 18px;color: #333;">疑似实际控制人：</span> <span class="relation">{{p1}}</span> <span
        class="final-radio-wrap"> <span id="final-radio">{{relation}}</span> </span> <span class="relation">{{p2}}</span>

        <div class="legend" style="visibility: visible;">
          <span class="big-block"></span>
          <span class="big-text">大股东</span>
          <span class="ent-block ml-3"></span>
          <span class="ent-text">企业股东</span>
          <span class="person-block  ml-3"></span>
          <span class="person-text">自然人股东</span>
        </div>
      </div>
      <indented-tree *ngIf="flag" [width]="width" [dataset]="data"></indented-tree>
    </div>
  `,
  styleUrls: ['./modal.scss']

})
export class StructureModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  div: ElementRef;

  flag: boolean = false;

  width = 0;

  p1 = '?';

  p2 = '?';

  relation = '?';

  constructor(public bsModalRef: NgbActiveModal,
              private commonService: CommonService,
              private companyService: CompanyService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });

    this.commonService.getEquityStructureGraphById(this.companyService.cid).then((x: any) => {
      this.data = x.Result;
      this.p2 = this.data.name;
      if (this.data.ControllerData) {
        this.p1 = this.data.ControllerData.name;
        this.relation = this.data.ControllerData.PercentTotal;
      }
      this.flag = true;
    });
  }

  data: any;
}

