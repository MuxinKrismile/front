import {Component, OnInit} from '@angular/core';
import {Link, Node} from '../../../chart/graph/d3/models';
import {CommonService} from '../../../service/common.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-association-graph',
  templateUrl: './association-graph.component.html',
  styleUrls: ['./association-graph.component.scss'],
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
export class AssociationGraphComponent implements OnInit {
  flag: boolean = false;
  nodes: Node[] = [];
  links: Link[] = [];

  modalFlag: boolean = false;

  modalStatus = 'close';

  modalData;

  openModal(event) {
    if (event) {
      if (this.modalStatus == 'open')
        this.modalStatus = 'close';
      this.commonService.getCompanyShortInfoByKey(event).then((x: any) => {
        if (x) {
          this.modalData = x.Result;
          this.modalFlag = true;
          this.modalStatus = 'open';
        }
      });
    }
  }

  closeModal() {
    this.modalStatus = 'close';
  }

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonService.getAssociationGraphById(localStorage.getItem('cid')).then((x: any) => {
      x.nodes.forEach((x: any) => this.nodes.push(new Node(x.keyNo, x.name, x.category)));
      x.links.forEach((x: any) => this.links.push(new Link(this.nodes[x.source], this.nodes[x.target], x.relation)));
      this.flag = true;
    });
  }


}
