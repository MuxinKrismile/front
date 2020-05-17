import {Person} from './models/person';
import {Company} from './models/company';
import {Target} from './models/target';
import CONFIG from './config';
import * as d3 from 'd3';


export class StructureService {
  persons: Person[];
  companies: Company[];
  target: Target;
  center_x: number;
  center_y: number;
  BCG = d3.linkVertical();


  init(persons: Person[], companies: Company[], target: Target, options: { width: number, height: number }) {
    this.persons = persons;
    this.companies = companies;
    this.target = target;

    // 计算中心坐标
    this.center_x = options.width / 2;
    this.center_y = options.height / 2;

    // 计算target 坐标
    this.target.width = this.getWidth(target.name);
    this.target.x = this.center_x - this.target.width / 2;
    this.target.y = this.center_y - this.target.height / 2;

    this.initConfig();

    this.calPerson();
    this.calCompany();
  }

  spliteLongString(s: string, l: number): string[] {
    let buffer: string[] = [];
    let line = Math.ceil(s.length / l);
    for (let x = 0; x < line; x++) {
      buffer.push(s.slice(x * l, (x + 1) * l));
    }
    return buffer.filter(x => x.length != 0);
  }

  initConfig() {
    const MAX_PERSON_LENGTH = this.persons.map(x => x._name.length).reduce((x, y) => Math.max(x, y));
    CONFIG.PERSON_WIDTH = 13 * MAX_PERSON_LENGTH + 15;
    CONFIG.PERSON_X_OFFSET = CONFIG.PERSON_WIDTH * 2;
    let MAX_COMPANY_LENGTH = 0;
    if (this.companies.length > 1)
      MAX_COMPANY_LENGTH = this.companies.map(x => x._name.length).reduce((x, y) => Math.max(x, y));
    CONFIG.COMPANY_WIDTH = 7 * MAX_COMPANY_LENGTH;
    CONFIG.COMPANY_X_OFFSET = CONFIG.COMPANY_WIDTH * 1.1;
    if (CONFIG.PERSON_LINK_X_OFFSET * this.persons.length >= this.target.width)
      CONFIG.PERSON_LINK_X_OFFSET = this.target.width / this.persons.length;
    if (CONFIG.COMPANY_LINK_X_OFFSET * this.companies.length >= this.target.width)
      CONFIG.COMPANY_LINK_X_OFFSET = this.target.width / this.companies.length;

    const MAX_COMPANY_LINE = Math.ceil(MAX_COMPANY_LENGTH / CONFIG.COMPANY_WORD_LEGNTH_PER_LINE);

    CONFIG.COMPANY_HEIGHT = MAX_COMPANY_LINE * CONFIG.COMPANY_LINE_HEIGHT;
  }

  calCompany() {
    if (this.companies.length == 0)
      return;

    if (this.companies.length % 2 == 0) {
      const left = Math.floor((this.companies.length - 1) / 2);
      const right = left + 1;

      this.companies[left].x = this.center_x - CONFIG.COMPANY_X_OFFSET / 2;
      this.companies[left].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
      this.companies[left].link_x = this.center_x - CONFIG.COMPANY_LINK_X_OFFSET / 2;
      this.companies[left].link_y = this.center_y + this.target.height / 2;
      this.companyInit(this.companies[left]);

      this.companies[right].x = this.center_x + CONFIG.COMPANY_X_OFFSET / 2;
      this.companies[right].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
      this.companies[right].link_x = this.center_x + CONFIG.COMPANY_LINK_X_OFFSET / 2;
      this.companies[right].link_y = this.center_y + this.target.height / 2;
      this.companyInit(this.companies[right]);

      let last: Company = this.companies[left];
      for (let x = left - 1; x >= 0; x--) {
        this.companies[x].x = last.x - CONFIG.COMPANY_X_OFFSET;
        this.companies[x].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
        this.companies[x].link_x = last.link_x - CONFIG.COMPANY_LINK_X_OFFSET;
        this.companies[x].link_y = this.center_y + this.target.height / 2;
        this.companyInit(this.companies[x]);
        last = this.companies[x];
      }

      last = this.companies[right];
      for (let x = right + 1; x < this.companies.length; x++) {
        this.companies[x].x = last.x + CONFIG.COMPANY_X_OFFSET;
        this.companies[x].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
        this.companies[x].link_x = last.link_x + CONFIG.COMPANY_LINK_X_OFFSET;
        this.companies[x].link_y = this.center_y + this.target.height / 2;
        this.companyInit(this.companies[x]);
        last = this.companies[x];
      }
    } else {
      const center = Math.floor(this.companies.length / 2);

      this.companies[center].x = this.center_x;
      this.companies[center].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
      this.companies[center].link_x = this.center_x;
      this.companies[center].link_y = this.center_y + this.target.height / 2;
      this.companyInit(this.companies[center]);

      let last: Company = this.companies[center];
      for (let x = center - 1; x >= 0; x--) {
        this.companies[x].x = last.x - CONFIG.COMPANY_X_OFFSET;
        this.companies[x].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
        this.companies[x].link_x = last.link_x - CONFIG.COMPANY_LINK_X_OFFSET;
        this.companies[x].link_y = this.center_y + this.target.height / 2;
        this.companyInit(this.companies[x]);
        last = this.companies[x];
      }

      last = this.companies[center];
      for (let x = center + 1; x < this.companies.length; x++) {
        this.companies[x].x = last.x + CONFIG.COMPANY_X_OFFSET;
        this.companies[x].y = this.center_y + CONFIG.COMPANY_Y_OFFSET;
        this.companies[x].link_x = last.link_x + CONFIG.COMPANY_LINK_X_OFFSET;
        this.companies[x].link_y = this.center_y + this.target.height / 2;
        this.companyInit(this.companies[x]);
        last = this.companies[x];
      }
    }
  }

  // 计算Person坐标
  calPerson() {
    if (this.persons.length == 0)
      return;

    // 如果Person为双数 居中没有元素
    if (this.persons.length % 2 == 0) {
      const left = Math.floor((this.persons.length - 1) / 2);
      const right = left + 1;

      this.persons[left].x = this.center_x - CONFIG.PERSON_X_OFFSET / 2;
      this.persons[left].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
      this.persons[left].link_x = this.center_x - CONFIG.PERSON_LINK_X_OFFSET / 2;
      this.persons[left].link_y = this.center_y - this.target.height / 2;
      this.personInit(this.persons[left]);

      this.persons[right].x = this.center_x + CONFIG.PERSON_X_OFFSET / 2;
      this.persons[right].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
      this.persons[right].link_x = this.center_x + CONFIG.PERSON_LINK_X_OFFSET / 2;
      this.persons[right].link_y = this.center_y - this.target.height / 2;
      this.personInit(this.persons[right]);

      let last: Person = this.persons[left];
      for (let x = left - 1; x >= 0; x--) {
        this.persons[x].x = last.x - CONFIG.PERSON_X_OFFSET;
        this.persons[x].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
        this.persons[x].link_x = last.link_x - CONFIG.PERSON_LINK_X_OFFSET;
        this.persons[x].link_y = this.center_y - this.target.height / 2;
        this.personInit(this.persons[x]);
        last = this.persons[x];
      }

      last = this.persons[right];
      for (let x = right + 1; x < this.persons.length; x++) {
        this.persons[x].x = last.x + CONFIG.PERSON_X_OFFSET;
        this.persons[x].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
        this.persons[x].link_x = last.link_x + CONFIG.PERSON_LINK_X_OFFSET;
        this.persons[x].link_y = this.center_y - this.target.height / 2;
        this.personInit(this.persons[x]);
        last = this.persons[x];
      }

    } else {
      const center = Math.floor(this.persons.length / 2);

      this.persons[center].x = this.center_x;
      this.persons[center].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
      this.persons[center].link_x = this.center_x;
      this.persons[center].link_y = this.center_y - this.target.height / 2;
      this.personInit(this.persons[center]);

      let last: Person = this.persons[center];
      for (let x = center - 1; x >= 0; x--) {
        this.persons[x].x = last.x - CONFIG.PERSON_X_OFFSET;
        this.persons[x].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
        this.persons[x].link_x = last.link_x - CONFIG.PERSON_LINK_X_OFFSET;
        this.persons[x].link_y = this.center_y - this.target.height / 2;
        this.personInit(this.persons[x]);
        last = this.persons[x];
      }

      last = this.persons[center];
      for (let x = center + 1; x < this.persons.length; x++) {
        this.persons[x].x = last.x + CONFIG.PERSON_X_OFFSET;
        this.persons[x].y = this.center_y - CONFIG.PERSON_Y_OFFSET;
        this.persons[x].link_x = last.link_x + CONFIG.PERSON_LINK_X_OFFSET;
        this.persons[x].link_y = this.center_y - this.target.height / 2;
        this.personInit(this.persons[x]);
        last = this.persons[x];
      }
    }
  }

  personInit(person: Person) {
    // person箭头y坐标
    person.arrow_y1 = person.y + person.height / 2;
    person.arrow_y2 = person.y + person.height / 2 + CONFIG.ARROW_LENGTH;

    // path路径
    person.path = this.BCG({
      source:
        [person.x, person.arrow_y2],
      target:
        [person.link_x, person.link_y]
    });

    // person value坐标
    person.value_x = person.show_x + person.width;
    person.value_y = person.show_y + person.height + CONFIG.PERSON_VALUE_OFFSET;
  }

  companyInit(company: Company) {
    // company箭头y坐标
    company.arrow_y1 = company.y - company.height / 2;
    company.arrow_y2 = company.y - company.height / 2 - CONFIG.ARROW_LENGTH;

    // path路径
    company.path = this.BCG({
      source:
        [company.x, company.arrow_y2],
      target:
        [company.link_x, company.link_y]
    });

    // company value坐标
    company.value_x = company.x + 20;
    company.value_y = company.show_y - CONFIG.COMPANY_VALUE_OFFSET;

    company.lines = this.spliteLongString(company._name, CONFIG.COMPANY_WORD_LEGNTH_PER_LINE);

    // 计算company的文字位置

    company.line_y = Array(company.lines.length);

    if (company.lines.length % 2 != 0) {
      const center = Math.floor(company.lines.length / 2);
      company.line_y[center] = 0;
      for (let x = center - 1; x >= 0; x--)
        company.line_y[x] = company.line_y[x + 1] - 15;

      for (let x = center + 1; x < company.lines.length; x++)
        company.line_y[x] = company.line_y[x - 1] + 15;

    } else {
      const left = Math.floor((company.lines.length - 1) / 2);
      const right = left + 1;

      company.line_y[left] = -10;
      company.line_y[right] = 10;

      for (let x = left - 1; x >= 0; x--)
        company.line_y[x] = company.line_y[x + 1] - 10;

      for (let x = right + 1; x < company.lines.length; x++)
        company.line_y[x] = company.line_y[x - 1] + 10;
    }
  }

  getWidth(s: string) {
    return s.length * 15 + 10;
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

    zoom = d3.zoom()
      .scaleExtent([0.4, 2])
      .on('zoom', zoomed);

    svg.call(zoom);
  }
}

