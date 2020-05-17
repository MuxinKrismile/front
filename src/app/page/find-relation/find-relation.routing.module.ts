import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FindRelationComponent} from './find-relation.component';

const routes: Routes = [
  {path: '', component: FindRelationComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FindRelationRoutingModule {
}

