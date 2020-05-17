import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../../material.module';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {PromiseComponent} from './promise.component';
import {PromiseRoutingModule} from './promise.routing.module';
import {FrameModule} from '../frame/frame.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PromiseRoutingModule,
    MaterialModule,
    AngularMultiSelectModule,
    FrameModule
  ],
  declarations: [
    PromiseComponent,
  ]
})
export class PromiseModule {
}
