import {Component} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  images: Array<string> = [
    'http://pic.tendcode.com/article/180418/bsblog.png',
    'http://pic.tendcode.com/article/080414/virtualenv.png',
    'http://pic.tendcode.com/article/180415/jiandan.png'
  ];
}
