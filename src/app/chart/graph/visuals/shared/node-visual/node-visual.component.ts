import {Component, EventEmitter, Input, Output} from '@angular/core';
import {D3Service, Node} from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g (click)="openModal(node)" (mouseenter)="highLight()" (mouseleave)="unHighLight()" style="cursor: pointer"
           [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
        class="node"
        [attr.fill]="node.color"
        cx="0"
        cy="0"
        [attr.opacity]="node.opacity"
        [ngStyle]="{'stroke': node.stroke}"
        [attr.r]="node.r">
      </svg:circle>
      <svg:text
        *ngIf="node.category==1"
        class="node-name"
        [attr.font-size]="node.fontSize">
        {{node.name}}
      </svg:text>
      <svg:text
        y="-27"
        *ngIf="node.category!=1"
        [attr.font-size]="node.fontSize">
        <svg:tspan *ngFor="let x of node.line" x="0" dy="0.9rem" class="node-name">
          {{x}}
        </svg:tspan>
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;

  constructor(private d3Service: D3Service) {
  }

  highLight() {
    this.d3Service.highLight(this.node);
  }

  unHighLight() {
    this.d3Service.unHighLight();
  }

  openModal(key) {
    if (key.category != 1)
      this.d3Service.openModal(key.id);
    else
      this.d3Service.closeModal();
  }
}
