import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';


@Component({
  selector: 'person-modal',
  template: `
    <div #div class="modal-header">
      <h4 class="modal-title">人物图谱</h4>
      <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body p-0">
      <tree *ngIf="flag" [width]="width" [height]="height" [showValue]="true" [dataset]="dataset"></tree>
    </div>
  `,
  styleUrls: ['./modal.scss']

})
export class PersonModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  dataset;

  size: string;

  constructor(public bsModalRef: NgbActiveModal,
              private commonService: CommonService,
              private companyService: CompanyService) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });

    this.commonService.getBossGraphById(this.companyService.bid).then((x: any) => {
      this.dataset = x;
      this.flag = true;
    });
  }

}

