import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Link, Node} from '../../chart/graph/d3/models';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-find-relation',
  templateUrl: './find-relation.component.html',
  styleUrls: ['./find-relation.component.scss']
})
export class FindRelationComponent implements OnInit, AfterViewInit {
  @ViewChild('card') card: ElementRef;

  select = 0;

  flag = false;

  nodes: Node[];
  links: Link[];

  charge: number = -1;
  width;
  height;

  constructor(private commonService: CommonService) {
  }

  openGraph(arg) {
    this.commonService.getMultipleAssociationGraph(arg).then((x: any) => {
      this.nodes = [];
      this.links = [];
      x.nodes.forEach((x: any) => this.nodes.push(new Node(x.keyNo, x.name, x.category)));
      x.links.forEach((x: any) => this.links.push(new Link(this.nodes[x.source], this.nodes[x.target], x.relation)));
      this.flag = false;
      this.flag = true;
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.width = this.card.nativeElement.offsetWidth;
    this.height = this.card.nativeElement.offsetHeight;
  }

  changeStatus(status) {
    this.flag = false;
    this.select = status;
  }
}
