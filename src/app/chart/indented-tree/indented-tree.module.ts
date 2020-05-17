import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndentedTreeComponent} from './indented-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IndentedTreeComponent
  ],
  exports: [
    IndentedTreeComponent
  ]
})
export class IndentedTreeModule {
}
