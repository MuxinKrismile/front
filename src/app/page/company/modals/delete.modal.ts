import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {CompanyService} from '../../../service/company.service';


@Component({
  selector: 'delete-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">移除监控</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="text-center">
          <div style="font-size:38px"><i class="fa fa-trash-o mr-2" style="color: #128bed"></i>确定移除?</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" (click)="deleteMonitor(bsModalRef)">确认</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.scss']

})
export class DeleteModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  size: string;

  constructor(public bsModalRef: NgbActiveModal,
              private commonService: CommonService) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });
    this.flag = true;
  }

  deleteMonitor(bsModalRef) {
    this.commonService.cancelMonitor(this.commonService.mid).then(() => {
      bsModalRef.dismiss();
      this.commonService.subjectMonitor.next();
    });
  }

}

