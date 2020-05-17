import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HighSearchComponent} from './high-search.component';

const routes: Routes = [
  {path: '', component: HighSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HighSearchRoutingModule {
}
