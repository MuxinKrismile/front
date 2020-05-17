import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrandSearchComponent} from './brand-search.component';
import {BrandBodyComponent} from './brand-body/brand-body.component';
import {PatentComponent} from './patent/patent.component';
import {TrademarkComponent} from './trademark/trademark.component';
import {CopyrightComponent} from './copyright/copyright.component';
import {SoftwareComponent} from './software/software.component';
import {PatentInfoComponent} from './patent-info/patent-info.component';

const routes: Routes = [{
  path: '',
  component: BrandSearchComponent,
  children: [
    {path: 'brand-body', component: BrandBodyComponent},
    {path: 'patent', component: PatentComponent},
    {path: 'trademark', component: TrademarkComponent},
    {path: 'copyright', component: CopyrightComponent},
    {path: 'software', component: SoftwareComponent},
    {path: 'patent-info', component: PatentInfoComponent},
    {path: '', redirectTo: 'brand-body', pathMatch: 'full'}
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
export class BrandSearchRoutingModule {
}
export const routedComponent = [
  BrandBodyComponent,
  PatentComponent,
  TrademarkComponent,
  CopyrightComponent,
  SoftwareComponent,
  PatentInfoComponent
];
