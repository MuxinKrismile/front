import CONFIG from '../config';

export class Person {
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

  get width() {
    return CONFIG.PERSON_WIDTH;
  }


  get height() {
    return CONFIG.PERSON_HEIGHT;
  }

  constructor(name: string, value: number) {
    this._name = name;
    this._value = value;
  }
}
