import CONFIG from '../config';

export class Target {
  private _name: string;
  private _x?: number;
  private _y?: number;

  private _width: number;
  private _height: number = CONFIG.TARGET_HEIGHT;

  set width(width: number) {
    this._width = width;
  }

  get width() {
    return this._width;
  }

  set height(height: number) {
    this._height = height;
  }

  get height() {
    return this._height;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
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

  get center_x() {
    return this._x + this.width / 2;
  }

  get center_y() {
    return this._y + this.height / 2;
  }
}
