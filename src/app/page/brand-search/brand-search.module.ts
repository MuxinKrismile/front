import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../../material.module';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {BrandSearchComponent} from './brand-search.component';
import {BrandSearchRoutingModule, routedComponent} from './brand-search.routing.module';
import {FrameModule} from '../frame/frame.module';
import {UtilModule} from '../../service/util.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BrandSearchRoutingModule,
    MaterialModule,
    AngularMultiSelectModule,
    FrameModule,
    UtilModule
  ],
  declarations: [
    BrandSearchComponent,
    ...routedComponent
  ]
})
export class BrandSearchModule {
}
