import {Component, EventEmitter, Output} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-multi-node',
  templateUrl: './multi-node.component.html',
  styleUrls: ['../find-relation.component.scss']
})
export class MultiNodeComponent {
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  arg: string;

  line = 2;

  company = Array(5);

  rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start);

  showDemo() {
    const url = '9cce0780ab7644008b73bc2120479d31_雷军,02ff6e6bed57a655db1bc67dfa829984_刘德,2c2a4a5d83f570b42fc9a5b92a0dbe75_林斌';
    this.emitter.emit(url);
  }

  recieve(e, id) {
    this.company[id] = e;
  }

  begin() {
    this.arg = '';
    this.company.forEach(x => {
      let c = x.company;
      if (x.boss) {
        c = c + '_' + x.boss;
      }
      this.arg = this.arg + ',' + c;
    });
    this.arg = this.arg.substring(1);

    this.emitter.emit(this.arg);
  }

  add(arg) {
    if (arg == 0 && this.line < 4)
      this.line = this.line + 1;
    if (arg == 1 && this.line > 1)
      this.line = this.line - 1;
  }
}
