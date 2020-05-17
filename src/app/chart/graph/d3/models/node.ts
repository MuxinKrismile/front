import APP_CONFIG, {default as CONFIG} from '../../graph.config';
import * as d3 from 'd3';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;
  isHide = false;
  _name: string;
  category: number;

  _line: string[] = [];

  constructor(id, name, category) {
    this.id = id;
    this._name = name;
    this.category = category;

    if (this.category != 1 && this._name) {
      this._line.push(this._name.slice(0, 4));

      if (this._name.length > 4) {
        this._line.push(this._name.slice(4, 9));
      }

      if (this._name.length > 9) {
        this._line.push(this._name.slice(9, 12));
      }

      if (this._name.length == 12) {
        this._line[this._line.length - 1] = this._line[this._line.length - 1].concat(this._name.slice(12, 13));
      }

      if (this._name.length > 12) {
        this._line[this._line.length - 1] = this._line[this._line.length - 1].concat('..');
      }
    }
  }

  get stroke() {
    return CONFIG.STROKE_COLOR[this.category];
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  };

  get r() {
    switch (this.category) {
      case 0:
        return 30;
      case 1:
        return 20;
      case 2:
        return 30;
      default:
        return 0;
    }
  }

  get fontSize() {
    return '11px';
  }

  get color() {
    switch (this.category) {
      case 0:
        return APP_CONFIG.SPECTRUM[0];
      case 1:
        return APP_CONFIG.SPECTRUM[1];
      case 2:
        return APP_CONFIG.SPECTRUM[2];
      default:
        return APP_CONFIG.SPECTRUM[0];
    }
  }

  get name() {
    if (!this.isHide)
      return this._name;
    else
      return '';
  }

  get line() {
    if (!this.isHide)
      return this._line;
    else
      return Array(3).fill('');
  }

  get opacity() {
    if (!this.isHide)
      return CONFIG.NORMAL_OPACITY;
    else
      return CONFIG.TRANSPARENT_OPACITY;
  }
}
