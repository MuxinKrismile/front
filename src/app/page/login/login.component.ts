import {Component} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  rem = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    if (!this.username || !this.password) {
      alert('账号密码不能为空');
      return;
    } else {
      // this.authService.login(this.username, this.password);
      this.authService.login(this.username, this.password).then(res => {
        if (res.status === 0) {
          /*alert('登录成功');*/
          this.router.navigate(['dashboard']);
        } else {
          alert('账号或密码错误');
        }
      });
    }
  }
}
