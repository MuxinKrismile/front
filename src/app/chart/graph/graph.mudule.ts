import {D3_DIRECTIVES, D3Service} from './d3';
import {FormsModule} from '@angular/forms';
import {SHARED_VISUALS} from './visuals/shared';
import {GraphComponent} from './visuals/graph/graph.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GraphComponent,
  ],
  providers: [D3Service],
})
export class GraphMudule {

}
