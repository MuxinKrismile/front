import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {
  kind = 0;
  d: any;
  unSubscriber;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUser(localStorage.getItem('userId')).then(x => {
      this.d = x;
    });
    this.unSubscriber = this.authService.subjectUser.subscribe(() => {
      this.authService.getUser(localStorage.getItem('userId')).then(x => {
        this.d = x;
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
