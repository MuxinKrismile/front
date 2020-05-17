import {Node} from './';
import CONFIG from '../../graph.config';
import * as d3 from 'd3';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  color = 0;
  isHide = false;
  isFocus = false;
  isHighLight = false;
  relation?: string;

  uuid;

  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  get offset() {
    if (this.isFocus || this.isHighLight)
      return CONFIG.BIG_OFFSET;
    else
      return CONFIG.OFFSET;
  }

  getX(): number {
    return (this.getSourceX() + this.getTargetX()) / 2;
  }

  isArray(obj): boolean {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
  }

  isMultiple() {
    return this.isArray(this.relation);
  }

  getY(): number {
    return (this.getSourceY() + this.getTargetY()) / 2;
  }

  getAngle() {
    return Math.atan((this.target.y - this.source.y) / (this.target.x - this.source.x)) * 180 / Math.PI;
  }

  getRadians() {
    return Math.atan((this.target.y - this.source.y) / (this.target.x - this.source.x));
  }

  getSourceX() {
    let t = this.source.r * Math.cos(this.getRadians());
    if (this.source.x > this.target.x)
      t = -t;
    return this.source.x + t;
  }

  getSourceY() {
    let t = this.source.r * Math.sin(this.getRadians());
    if (this.source.x > this.target.x)
      t = -t;
    return this.source.y + t;
  }

  getTargetX() {
    let t = this.target.r * Math.cos(this.getRadians());
    if (this.target.x > this.source.x) {
      t = -t;
      t -= this.offset;
    } else {
      t += this.offset;
    }
    //t > 0 ? t += CONFIG.OFFSET : t -= this.offset;
    return this.target.x + t;
  }

  getTargetY() {
    let t = this.target.r * Math.sin(this.getRadians());
    if (this.target.x > this.source.x) {
      t = -t;
    }
    if (this.target.y > this.source.y) {
      t -= this.offset;
    } else {
      t += this.offset;
    }
    //t > 0 ? t -= CONFIG.OFFSET : t += this.offset;
    return this.target.y + t;
  }

  constructor(source, target, relation: string) {
    this.source = source;
    this.target = target;
    this.relation = relation;

    this.uuid = this.getGuid();
  }

  setRelation(relation: string) {
    this.relation = relation;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  getColor() {
    if (this.relation == '投资')
      this.color = 1;
    return CONFIG.LINE_COLOR[this.color];
  }

  getArrowColor() {
    return 'url(#' + this.uuid + ')';
  }

  get width() {
    if (this.isFocus || this.isHighLight)
      return CONFIG.FOCUS_WIDTH;
    else
      return CONFIG.NORMAL_WIDTH;
  }

  get relationship() {
    if (!this.isHide)
      return this.relation;
    else
      return '';
  }

  get opacity() {
    if (!this.isHide)
      return CONFIG.NORMAL_OPACITY;
    else
      return CONFIG.TRANSPARENT_OPACITY;
  }
}
