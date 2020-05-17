import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Link, Node} from '../../../chart/graph/d3/models';

@Component({
  selector: 'app-suspected-controller',
  templateUrl: './suspected-controller.component.html',
  styleUrls: ['./suspected-controller.component.scss']
})
export class SuspectedControllerComponent implements OnInit {
  flag = false;
  title;

  nodes: Node[] = [];
  links: Link[] = [];

  name: string;
  rate: string;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getEquityStructureGraphById(localStorage.getItem('cid')).then((x: any) => {
      const data = x.Result;
      let p1 = '?';
      let p2 = data.name;
      let relation = '?';
      if (data.ControllerData) {
        p1 = data.ControllerData.name;
        relation = data.ControllerData.PercentTotal;
      }
      const source = new Node(p1, p1, 1);
      const target = new Node(p2, p2, 2);
      this.nodes.push(source);
      this.nodes.push(target);
      this.links.push(new Link(source, target, relation));
      this.name = p1;
      this.rate = relation;
      this.flag = true;
    });
  }

}
