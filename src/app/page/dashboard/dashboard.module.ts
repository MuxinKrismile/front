import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../../material.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from '../frame/footer/footer.component';
import {FrameComponent} from '../frame/frame.component';
import {FrameModule} from '../frame/frame.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DashboardRoutingModule,
    MaterialModule,
    FrameModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
