import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  k: number = 0;

  @Input('data') data;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  close() {
    this.clicked.emit();
  }

  ngOnInit() {
  }

}
