import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyComponent} from './company.component';
import {BusinessReportComponent} from './business-report/business-report.component';
import {IntellectualComponent} from './intellectual/intellectual.component';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {HistoryInfoComponent} from './history-info/history-info.component';
import {BusinessRiskComponent} from './business-risk/business-risk.component';
import {LegalProceedComponent} from './legal-proceed/legal-proceed.component';
import {OperatingConditionComponent} from './operating-condition/operating-condition.component';

const config: Routes = [{
  path: '',
  component: CompanyComponent,
  children: [
    {path: 'basicinfo', component: BasicInfoComponent},
    {path: 'businessreport', component: BusinessReportComponent},
    {path: 'businessrisk', component: BusinessRiskComponent},
    {path: 'historyinfo', component: HistoryInfoComponent},
    {path: 'intellectual', component: IntellectualComponent},
    {path: 'legalproceed', component: LegalProceedComponent},
    {path: 'operatingcondition', component: OperatingConditionComponent},
    {path: '', redirectTo: 'basicinfo', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(config),
  ],
  exports: [
    RouterModule,
  ]
})
export class CompanyRoutingModule {
}

export const routedComponent = [
  BasicInfoComponent,
  BusinessReportComponent,
  BusinessRiskComponent,
  HistoryInfoComponent,
  IntellectualComponent,
  LegalProceedComponent,
  OperatingConditionComponent,
];
