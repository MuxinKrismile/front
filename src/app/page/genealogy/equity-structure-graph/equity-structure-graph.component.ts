import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Person} from '../../../chart/structure/models/person';
import {Company} from '../../../chart/structure/models/company';
import {Target} from '../../../chart/structure/models/target';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-equity-structure-graph',
  templateUrl: './equity-structure-graph.component.html',
  styleUrls: ['./equity-structure-graph.component.scss'],
  animations: [
    trigger('modalStatus', [
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      state('close', style({
        display: 'none',
        opacity: 0
      })),
      transition('open => close', animate('250ms ease-out')),
      transition('close => open', animate('250ms ease-in'))
    ])
  ]
})
export class EquityStructureGraphComponent implements OnInit {
  flag = false;

  modalFlag: boolean = false;
  dataset;

  modalStatus = 'close';

  modalData;

  current;

  target: Target;
  companies: Company[] = [];
  persons: Person[] = [];

  openModal(event) {
    if (event) {
      if (this.modalStatus == 'open')
        this.modalStatus = 'close';
      this.commonService.getCompanyShortInfoByKey(event).then((x: any) => {
        if (x) {
          this.modalData = x.Result;
          this.modalFlag = true;
          this.modalStatus = 'open';
          this.current = event;
        }
      });
    }
  }

  closeModal() {
    this.modalStatus = 'close';
  }


  constructor(private commonService: CommonService) {
    this.commonService.getSecondEquityStructureGraphById(localStorage.getItem('cid')).then((x: any) => {
      this.target = new Target();
      this.target.name = x.Result.Name;

      if (x.Result.touzi)
        for (let z = 0; z < x.Result.touzi.length; z++) {
          this.companies.push(new Company(x.Result.touzi[z].Name, x.Result.touzi[z].FundedRatio, x.Result.touzi[z].KeyNo));
        }

      if (x.Result.DetailList)
        for (let z = 0; z < x.Result.DetailList.length; z++) {
          this.persons.push(new Person(x.Result.DetailList[z].Name, x.Result.DetailList[z].Percent.trim()));
        }

      this.flag = true;
    });
  }

  ngOnInit() {
  }


}
