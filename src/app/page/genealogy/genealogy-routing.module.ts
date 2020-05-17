import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvestmentGraphComponent} from './investment-graph/investment-graph.component';
import {AssociationGraphComponent} from './association-graph/association-graph.component';
import {EquityStructureGraphComponent} from './equity-structure-graph/equity-structure-graph.component';
import {SuspectedControllerComponent} from './suspected-controller/suspected-controller.component';
import {EnterpriseGraphComponent} from './enterprise-graph/enterprise-graph.component';
import {GenealogyComponent} from './genealogy.component';
import {InfoModalComponent} from './info-modal/info-modal.component';

const config: Routes = [{
  path: '', component: GenealogyComponent,
  children: [
    {path: 'enterprisegraph', component: EnterpriseGraphComponent},
    {path: 'investmentgraph', component: InvestmentGraphComponent},
    {path: 'associationgraph', component: AssociationGraphComponent},
    {path: 'equitystructuregraph', component: EquityStructureGraphComponent},
    {path: 'suspectedcontroller', component: SuspectedControllerComponent},
    {path: '', redirectTo: 'enterprisegraph', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(config)],
  exports: [RouterModule]
})
export class GenealogyRoutingModule {

}

export const routedComponent = [
  EnterpriseGraphComponent,
  InvestmentGraphComponent,
  AssociationGraphComponent,
  EquityStructureGraphComponent,
  SuspectedControllerComponent,
  InfoModalComponent
];
