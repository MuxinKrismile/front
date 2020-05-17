import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
import {MessageComponent} from './message/message.component';
import {AttentionComponent} from './attention/attention.component';
import {NoteComponent} from './note/note.component';
import {MonitorComponent} from './monitor/monitor.component';
import {PasswordComponent} from './password/password.component';

const config: Routes = [{
  path: '',
  component: PersonalComponent,
  children: [
    {path: 'message', component: MessageComponent},
    {path: 'attention', component: AttentionComponent},
    {path: 'note', component: NoteComponent},
    {path: 'monitor', component: MonitorComponent},
    {path: 'password', component: PasswordComponent},
    {path: '', redirectTo: 'message', pathMatch: 'full'}
  ]
}];
@NgModule({
  imports: [
    RouterModule.forChild(config),
  ],
  exports: [
    RouterModule
  ]
})
export class PersonalRoutingModule {
}
export const routedComponent = [
  MessageComponent,
  AttentionComponent,
  NoteComponent,
  MonitorComponent,
  PasswordComponent
];
