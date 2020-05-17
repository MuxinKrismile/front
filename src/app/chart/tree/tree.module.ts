import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeComponent} from './tree.component';
import {ZoomableDirective} from './directives/zoomable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TreeComponent,
    ZoomableDirective
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule {
}
