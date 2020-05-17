import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Directive({
  selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
  @Input('zoomableOf') zoomableOf: ElementRef;

  constructor(private _element: ElementRef) {
  }

  ngOnInit() {
    this.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
  }

  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      const value = 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')';
      container.attr('transform', value);
    };

    zoom = d3.zoom().on('zoom', zoomed);

    svg.call(zoom);
  }
}
