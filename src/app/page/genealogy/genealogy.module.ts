import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenealogyRoutingModule, routedComponent} from './genealogy-routing.module';
import {GenealogyComponent} from './genealogy.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {GraphMudule} from '../../chart/graph/graph.mudule';
import {TreeModule} from '../../chart/tree/tree.module';
import {StructureModule} from '../../chart/structure/structure.module';
import {MatCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GenealogyRoutingModule,
    NgxPageScrollModule,
    GraphMudule,
    TreeModule,
    StructureModule,
    MatCardModule,
  ],
  declarations: [
    GenealogyComponent,
    ...routedComponent,
  ]
})
export class GenealogyModule {
}
