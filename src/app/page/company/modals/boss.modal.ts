import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';


@Component({
  selector: 'boss-modal',
  template: `
    <div #div *ngIf="flag" class="modal-header">
      <h4 class="modal-title">{{d.person.name}}的人物介绍</h4>
      <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{d.person.introduction}}</p>
    </div>
  `,
  styleUrls: ['./modal.scss']

})
export class BossModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  d;

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

    this.commonService.getBossInfoById(this.companyService.bid).then((x: any) => {
      console.log(x);
      this.d = x;
      this.flag = true;
    });
  }

}

