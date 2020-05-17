import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {StructureService} from '../structure.service';

@Directive({
  selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
  @Input('zoomableOf') zoomableOf: ElementRef;

  constructor(private structureService: StructureService, private _element: ElementRef) {
  }

  ngOnInit() {
    this.structureService.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
  }
}
