import CONFIG from '../config';

export class Company {
  _name: string;

  _value?: number;

  _x?: number;

  _y?: number;

  link_x?: number;
  link_y?: number;

  path;

  value_x?: number;
  value_y?: number;

  arrow_y1?: number;
  arrow_y2?: number;

  lines: string[];
  line_y: number[];

  key: string;

  get show_x() {
    return this._x - this.width / 2;
  }

  get show_y() {
    return this._y - this.height / 2;
  }

  set x(x: number) {
    this._x = x;
  }

  get x() {
    return this._x;
  }

  set y(y: number) {
    this._y = y;
  }

  get y() {
    return this._y;
  }

  getY(idx: number) {
    return this._y + this.line_y[idx];
  }

  get width() {
    return CONFIG.COMPANY_WIDTH;
  }

  get height() {
    return CONFIG.COMPANY_HEIGHT;
  }

  constructor(name: string, value: number, key: string) {
    this._name = name;
    this._value = value;
    this.key = key;
  }
}
