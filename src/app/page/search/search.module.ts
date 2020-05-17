import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchRoutingModule} from './search.routing.module';
import {SearchComponent} from './search.component';
import {SearchCateComponent} from './search-cate/search-cate.component';
import {MaterialModule} from '../../material.module';
import {SearchBodyComponent} from './search-body/search-body.component';
import {SearchService} from '../../service/search.service';
import {FrameModule} from '../frame/frame.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SearchRoutingModule,
    MaterialModule,
    FrameModule
  ],
  declarations: [
    SearchComponent,
    SearchCateComponent,
    SearchBodyComponent
  ],
  providers: [
    SearchService,
  ]
})
export class SearchModule {
}
