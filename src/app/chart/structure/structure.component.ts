import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Person} from './models/person';
import {Company} from './models/company';
import {Target} from './models/target';
import {StructureService} from './structure.service';


@Component({
  selector: 'structure',
  template: `
    <svg #svg [attr.width]="options.width" [attr.height]="options.height" xmlns:svg="http://www.w3.org/1999/html">
      <svg:defs>
        <marker id="arrow"
                markerUnits="strokeWidth"
                markerWidth="12"
                markerHeight="12"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                orient="auto">
          <path d="M2,2 L10,6 L2,10 L4,6 L2,2" [ngStyle]="{'fill': 'black'}"/>
        </marker>
      </svg:defs>
      <g zoomableOf="svg">
        <g *ngFor="let person of persons">
          <svg:path [attr.d]="person.path" style="fill: none; stroke-width: 1px;stroke:rgb(0,0,0)"></svg:path>
          <svg:line
            class="link"
            [attr.x1]="person.x"
            [attr.y1]="person.arrow_y1"
            [attr.x2]="person.x"
            [attr.y2]="person.arrow_y2"
            [ngStyle]="{'stroke': 'black','stroke-width': 1, 'marker-end': 'url(#arrow)'}">
          </svg:line>
          <svg:text [attr.x]="person.x" [attr.y]="person.y" style="fill: rgb(56,137,236);" class="node-name">{{person._name}}</svg:text>
          <svg:rect
            [attr.x]="person.show_x"
            [attr.y]="person.show_y"
            [attr.width]="person.width"
            [attr.height]="person.height"
            style="stroke-width:1px;stroke:rgb(56,137,236);fill: transparent;cursor: pointer;">
          </svg:rect>
          <svg:text [attr.x]="person.value_x" [attr.y]="person.value_y" class="value-name">{{person._value}}</svg:text>
        </g>
        <g>
          <svg:text [attr.x]="target.center_x" [attr.y]="target.center_y" class="node-name">{{target.name}}</svg:text>
          <svg:rect
            [attr.x]="target.x"
            [attr.y]="target.y"
            [attr.width]="target.width"
            [attr.height]="target.height"
            style="stroke-width:1.5px;stroke:rgb(0,0,0);fill: transparent; cursor: default">
          </svg:rect>
        </g>
        <g *ngFor="let company of companies">
          <svg:text>
            <svg:tspan *ngFor="let x of company.lines;let idx = index" [attr.x]="company.x" [attr.y]="company.getY(idx)" class="node-name">
              {{x}}
            </svg:tspan>
          </svg:text>
          <svg:text [attr.x]="company.value_x" [attr.y]="company.value_y" class="value-name">{{company._value}}</svg:text>
          <svg:path [attr.d]="company.path" style="fill: none; stroke-width: 1px;stroke:rgb(0,0,0)"></svg:path>
          <svg:line
            class="link"
            [attr.x1]="company.x"
            [attr.y1]="company.arrow_y2"
            [attr.x2]="company.x"
            [attr.y2]="company.arrow_y1"
            [ngStyle]="{'stroke': 'black','stroke-width': 1, 'marker-start': 'url(#arrow)'}">
          </svg:line>
          <svg:rect
            (click)="click(company.key)"
            [attr.x]="company.show_x"
            [attr.y]="company.show_y"
            [attr.width]="company.width"
            [attr.height]="company.height"
            style="stroke-width:1px;stroke:rgb(0,0,0);fill: transparent;cursor: pointer;">
          </svg:rect>
        </g>
      </g>
    </svg>
  `,
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
  @Input('person') persons: Person[];
  @Input('company') companies: Company[];
  @Input('target') target: Target;
  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('svg')
  svg: ElementRef;

  constructor(private structureService: StructureService) {
  }

  ngOnInit(): void {
    this.structureService.init(this.persons, this.companies, this.target, this.options);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.structureService.init(this.persons, this.companies, this.target, this.options);
  }

  click(event) {
    this.clicked.emit(event);
  }

  get options() {
    return {
      width: window.innerWidth,
      height: window.innerHeight - 62
    };
  }
}
