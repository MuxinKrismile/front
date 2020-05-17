import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-search-boss',
  templateUrl: './search-boss.component.html',
  styleUrls: ['./search-boss.component.scss']
})
export class SearchBossComponent implements OnInit {

  width = 0;
  key: string = '';

  @ViewChild('myDrop') myDrop;
  @ViewChild('input') input;

  items: string[] = ['雷军'];


  filter = (array: string[], key: string) => array.filter(x => x.includes(key));


  constructor(private router: Router, private commonService: CommonService) {
  }

  click(value: string): void {
    this.key = value;
    this.input.nativeElement.focus();
  }

  ngOnInit() {
  }

  /* keyChanged(event) {
     this.width = this.input.nativeElement.offsetWidth;
     this.key = event;
     if (!(this.filter(this.items, this.key).length === 0 || this.key.length === 0)) {
       this.myDrop.open();
     } else {
       this.myDrop.close();
     }
   }*/

  selBoss() {
    if (this.key.trim() != null) {
      this.commonService.getBossId(this.key).then(x => {
        const d = x;
        if (d != null) {
          localStorage.setItem('bid', d.toString());
          this.router.navigate(['bossinfo']);
        } else {
          alert('不好意思，数据库查不到这个人物！！！');
        }
      });
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.selBoss();
    }
  }
}
