import {Component, OnInit} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {

    const ob = new Observable(e => {
      setTimeout(() => {
        e.next('GG');
      }, 10000);
    });

    const p = new Promise((res, rej) => {
      ob.subscribe(next => {
        res(next);
      }, err => {
        rej(err);
      });
    });

    p.then(x => {
      this.data = x;
    }).catch(err => {

    });
  }
}
