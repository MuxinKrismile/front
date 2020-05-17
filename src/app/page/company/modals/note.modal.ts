import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {EditNote} from '../../../entity/EditNote';
import {Monitor} from '../../../entity/monitor';
import {CompanyService} from '../../../service/company.service';
import {AddNote} from '../../../entity/AddNote';


@Component({
  selector: 'note-modal',
  template: `
    <div #div *ngIf="flag">
      <div class="modal-header">
        <h4 class="modal-title">笔记</h4>
        <button type="button" class="close" aria-label="Close" (click)="bsModalRef.dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div *ngIf="d&&d.length" class="nnote-list">
          <div class="item d-flex" *ngFor="let idx of d">
            <div class="content">{{idx.content}}
              <div class="time">{{idx.date}}</div>
            </div>
            <div class="ml-auto">
              <button class="butn mr-2" style="color: #d3d3d3;" (click)="editNote(idx.id)">
                <i class="fa fa-pencil" style="font-size: 22px;"></i>
              </button>
              <button class="butn" style="color: #d3d3d3" (click)="deleteNote(idx.id)">
                <i class="fa fa-trash" style="font-size: 22px"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <textarea class="form-control" style="resize: none;" rows="5"
                      placeholder="{{tip}}" [(ngModel)]="note"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="d-flex">
          <button type="button" class="btn btn-outline-primary mr-2" (click)="submit(bsModalRef)">提交</button>
          <button type="button" class="btn btn-outline-dark" (click)="cancel(bsModalRef)">取消</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./note.modal.scss']

})
export class NoteModal implements OnInit {
  @ViewChild('div') set assetInput(elRef: ElementRef) {
    this.div = elRef;
  }

  flag: boolean = false;

  div: ElementRef;

  width = 0;

  height;

  size: string;

  d: any;

  /*标识编辑或添加*/
  editFlag: any = true;

  note: any;
  tip: any = '请输入笔记…';

  constructor(public bsModalRef: NgbActiveModal, private companyService: CompanyService,
              private commonService: CommonService) {
    this.height = window.innerHeight * 0.85;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = this.div.nativeElement.offsetWidth;
    });
    const editNote = new Monitor(localStorage.getItem('userId'), this.companyService.cid);
    this.commonService.getCompanyNotes(editNote).then((x) => {
      this.d = x as EditNote;
      this.flag = true;
    });
  }

  deleteNote(id) {
    const editNote = new Monitor(localStorage.getItem('userId'), this.companyService.cid);
    this.commonService.deleteNote(id).then(() => {
      this.commonService.getCompanyNotes(editNote).then((x) => {
        this.d = x;
      });
    });
  }

  submit(bsModalRef) {
    if (this.editFlag === true) {
      const note = new AddNote(localStorage.getItem('userId'), this.companyService.cid, this.note);
      this.commonService.addNote(note).then((x) => {
        if (x !== 1) {
          alert('笔记写入失败');
        }
      });
    } else {
      const editNote = new EditNote(localStorage.getItem('editNoteId'), this.note);
      this.commonService.updateNote(editNote).then((x) => {
      });
    }
    bsModalRef.dismiss();
  }

  cancel(bsModalRef) {
    bsModalRef.dismiss();
    this.note = '请输入笔记…';
  }

  editNote(id) {
    this.editFlag = false;
    localStorage.setItem('editNoteId', id);
    this.commonService.getNote(id).then((x) => {
      this.note = (x as EditNote).content;
    });
  }

}

