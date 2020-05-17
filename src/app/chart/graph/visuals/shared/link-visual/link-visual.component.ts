import {Component, Input} from '@angular/core';
import {Link} from '../../../d3';
import CONFIG from '../../../graph.config';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:g>
      <svg:defs>
        <marker id="{{link.uuid}}"
                markerUnits="strokeWidth"
                markerWidth="12"
                markerHeight="12"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                orient="auto">
          <path d="M2,2 L10,6 L2,10 L6,6 L2,2" [ngStyle]="{'fill': link.getColor(), 'fill-opacity': link.opacity}"/>
        </marker>
      </svg:defs>
      <svg:line
        class="link"
        [attr.x1]="link.getSourceX()"
        [attr.y1]="link.getSourceY()"
        [attr.x2]="link.getTargetX()"
        [attr.y2]="link.getTargetY()"
        [ngStyle]="{'stroke': link.getColor(),'stroke-width': link.width, 'marker-end': link.getArrowColor(), 'stroke-opacity': link.opacity}"
      >
      </svg:line>
      <text [attr.x]="link.getX()"
            [attr.y]="link.getY()"
            [attr.transform]="'rotate(' + link.getAngle() + ' ' + link.getX() + ',' + link.getY() + ')'"
            style="text-anchor: middle">{{link.relationship}}
      </text>
    </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;

  CONFIG = CONFIG.LINE_COLOR;
}
