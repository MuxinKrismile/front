import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PromiseSearchComponent} from './promise-search.component';
import {BrandBodyComponent} from '../brand-search/brand-body/brand-body.component';
import {TrademarkComponent} from '../brand-search/trademark/trademark.component';
import {PatentInfoComponent} from '../brand-search/patent-info/patent-info.component';
import {BrandSearchComponent} from '../brand-search/brand-search.component';
import {PatentComponent} from '../brand-search/patent/patent.component';
import {CopyrightComponent} from '../brand-search/copyright/copyright.component';
import {SoftwareComponent} from '../brand-search/software/software.component';
import {ExecutedComponent} from './executed/executed.component';
import {ExecutedInfoComponent} from './executed-info/executed-info.component';
import {LostproComponent} from './lostpro/lostpro.component';
import {LostproInfoComponent} from './lostpro-info/lostpro-info.component';
import {RefereeComponent} from './referee/referee.component';
import {RefereeInfoComponent} from './referee-info/referee-info.component';

const routes: Routes = [{
  path: '',
  component: PromiseSearchComponent,
  children: [
    {path: 'executed', component: ExecutedComponent},
    {path: 'executed-info', component: ExecutedInfoComponent},
    {path: 'lostpro', component: LostproComponent},
    {path: 'lostpro-info', component: LostproInfoComponent},
    {path: 'referee', component: RefereeComponent},
    {path: 'referee-info', component: RefereeInfoComponent},
    {path: '', redirectTo: 'lostpro', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PromiseSearchRoutingModule {
}
export const routedComponent = [
  ExecutedComponent,
  ExecutedInfoComponent,
  LostproComponent,
  LostproInfoComponent,
  RefereeComponent,
  RefereeInfoComponent
];
