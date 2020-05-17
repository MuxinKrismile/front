import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../../material.module';
import {PersonalRoutingModule, routedComponent} from './personal-routing.module';
import {PersonalComponent} from './personal.component';
import {FormsModule} from '@angular/forms';
import {DeleteModal} from '../company/modals/delete.modal';
import {EditNoteModal} from '../company/modals/edit-note.modal';
import {GroupModal} from '../company/modals/group.modal';
import {EditGroupModal} from '../company/modals/edit-group.modal';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PersonalRoutingModule,
    MaterialModule
  ],
  declarations: [
    PersonalComponent,
    DeleteModal,
    EditNoteModal,
    GroupModal,
    EditGroupModal,
    ...routedComponent
  ],
  entryComponents: [
    DeleteModal,
    EditNoteModal,
    GroupModal,
    EditGroupModal,
  ]
})
export class PersonalModule {
}
