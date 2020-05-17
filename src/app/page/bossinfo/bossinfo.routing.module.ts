import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BossinfoComponent} from './bossinfo.component';

const routes: Routes = [
  {path: '', component: BossinfoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BossinfoRoutingModule {
}
