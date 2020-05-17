import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchBossComponent} from './search-boss.component';

const routes: Routes = [
  {path: '', component: SearchBossComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchBossRoutingModule {
}
