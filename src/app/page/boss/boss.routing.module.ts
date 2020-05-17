import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BossComponent} from './boss.component';

const routes: Routes = [
  {path: '', component: BossComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BossRoutingModule {
}
