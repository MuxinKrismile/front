import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  HostListener,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
} from '@angular/core';
import {D3Service, ForceDirectedGraph} from '../../d3';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
           [draggableNode]="node"
           [draggableInGraph]="graph"
           [draggableNodes]="nodes"
           [draggableLink]="links"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('nodes') nodes;
  @Input('links') links;

  @Input('width') width;
  @Input('height') height;

  @Output() open: EventEmitter<string> = new EventEmitter<string>();
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  @Input('charge') charge: number = -1;

  graph: ForceDirectedGraph;
  _options: { width, height } = {width: 800, height: 600};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef) {
  }

  init() {
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options, this.charge);

    this.d3Service.setGraph(this.graph);

    this.d3Service.setLinks(this.links);

    this.d3Service._openModal.subscribe(key => {
      this.open.emit(key);
    });

    this.d3Service._closeModal.subscribe(() => {
      this.close.emit();
    });

    this.graph.ticker.subscribe(d => {
      this.ref.markForCheck();
    });
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    this._options = {
      width: window.innerWidth,
      height: window.innerHeight - 87
    };

    if (this.width)
      this._options.width = this.width;

    if (this.height)
      this._options.height = this.height;

    return this._options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if(propName == 'nodes' || propName == 'links')
        this.init();
    }
  }
}
