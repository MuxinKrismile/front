import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HotnewsComponent} from './hotnews.component';

const routes: Routes = [
  {path: '', component: HotnewsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HotnewsRoutingModule {
}
