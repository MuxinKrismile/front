import {StructureComponent} from './structure.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StructureService} from './structure.service';
import {ZoomableDirective} from './directives/zoomable.directive';


@NgModule({
  declarations: [
    StructureComponent,
    ZoomableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    StructureComponent
  ],
  providers: [
    StructureService
  ],
})
export class StructureModule {

}
