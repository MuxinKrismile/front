import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../../material.module';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {BossinfoRoutingModule} from './bossinfo.routing.module';
import {BossinfoComponent} from './bossinfo.component';
import {FrameModule} from '../frame/frame.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {BossModal} from '../company/modals/boss.modal';
import {TreeModule} from '../../chart/tree/tree.module';
import {PersonModal} from '../company/modals/person.modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxEchartsModule,
    NgxPageScrollModule,
    BossinfoRoutingModule,
    MaterialModule,
    AngularMultiSelectModule,
    FrameModule,
  ],
  declarations: [
    BossinfoComponent,
    BossModal,
  ],
  entryComponents: [
    BossModal,
  ]
})
export class BossinfoModule {
}
