import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {EditNote} from '../../../entity/EditNote';


@Component({
  selector: 'editmodal-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">编辑笔记</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <textarea class="form-control noteEditContent noteDetail" rows="5"
                      placeholder="{{note}}" [(ngModel)]="note"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" (click)="submit(bsModalRef)">提交</button>
      </div>
    </div>
  `,
  styleUrls: ['./note.modal.scss']

})
export class EditNoteModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  note: any;

  d: any;

  flag = false;

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
    this.commonService.getNote(localStorage.getItem('editNoteId')).then((x) => {
      this.d = x as EditNote;
      this.note = this.d.content;
      this.flag = true;
    });
  }

  submit(bsModalRef) {
    console.log(this.note);
    const editNote = new EditNote(localStorage.getItem('editNoteId'), this.note);
    this.commonService.updateNote(editNote).then((x) => {
      bsModalRef.dismiss();
      this.commonService.subjectNote.next();
    });
  }
}

