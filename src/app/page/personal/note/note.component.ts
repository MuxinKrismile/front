import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../service/common.service';
import {EditNoteModal} from '../../company/modals/edit-note.modal';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  d: any;
  unSubscriber;

  constructor(private modalService: NgbModal, private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getNotes(localStorage.getItem('userId')).then(x => {
      this.d = x;
    });
    this.unSubscriber = this.commonService.subjectNote.subscribe(() => {
      this.commonService.getNotes(localStorage.getItem('userId')).then(x => {
        this.d = x;
      });
    });
  }

  openModal(id) {
    localStorage.setItem('editNoteId', id);
    this.modalService.open(EditNoteModal);
  }

  deleteNote(id) {
    this.commonService.deleteNote(id).then(() => {
      this.commonService.getNotes(localStorage.getItem('userId')).then(x => {
        this.d = x;
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
