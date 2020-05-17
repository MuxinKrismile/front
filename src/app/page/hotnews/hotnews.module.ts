import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotnewsRoutingModule} from './hotnews.routing.module';
import {HotnewsComponent} from './hotnews.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {FrameModule} from '../frame/frame.module';
import {UtilModule} from '../../service/util.module';


@NgModule({
  imports: [
    CommonModule,
    HotnewsRoutingModule,
    NgxPageScrollModule,
    FrameModule,
    UtilModule
  ],
  declarations: [
    HotnewsComponent,
  ],

})
export class HotnewsModule {
}
