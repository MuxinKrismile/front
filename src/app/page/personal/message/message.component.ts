import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  k = 0;
  d: any;
  unSubscriber;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getMessages(localStorage.getItem('userId')).then(x => {
      this.d = x;
    });
    this.unSubscriber = this.commonService.subjectMonitor.subscribe(() => {
      this.commonService.getMessages(localStorage.getItem('userId')).then(x => {
        this.d = x;
        console.log(this.d);
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
