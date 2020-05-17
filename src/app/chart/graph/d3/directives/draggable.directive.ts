import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from '../models';
import {D3Service} from '../d3.service';

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') draggableNode: Node;
  @Input('draggableLink') draggableLink: Link[];
  @Input('draggableNodes') draggableNodes: Node[];
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) {
  }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableLink, this.draggableNodes, this.draggableInGraph);
  }
}
