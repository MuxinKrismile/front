import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  oldPas: any = '';
  newPas: any = '';
  conPas: any = '';

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.newPas === this.conPas) {
      console.log('duile');
      this.commonService.changePas(localStorage.getItem('userId'), this.oldPas, this.newPas).then(x => {
        console.log(x);
        if (x === true) {
          this.oldPas = '';
          this.newPas = '';
          this.conPas = '';
        } else {
          alert('原密码不正确');
        }
      });
    } else {
      alert('两次密码输入不一致');
      this.newPas = '';
      this.conPas = '';
    }
  }
}
