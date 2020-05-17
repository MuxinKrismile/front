import {Component} from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent {
  username: string;
  password: string;
  rePassword: string;
  mail: string;

  constructor(private commonService: CommonService) {

  }

  valid() {
    if (this.password !== this.rePassword) {
      return false;
    } else if (!this.mail) {
      return false;
    } else if (!this.username) {
      return false;
    } else if (!this.password) {
      return false;
    } else if (!this.rePassword) {
      return false;
    }
    return true;
  }

  register() {
    if (this.valid()) {
      this.commonService.register(this.username, this.mail, this.password).then(x => {
        console.log(x);
      });
    }
  }
}
