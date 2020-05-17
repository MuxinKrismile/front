import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HierarchyPointLink, HierarchyPointNode} from 'd3';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnChanges {
  @Input('dataset') data;

  @Input('width') width;

  @Input('height') height;

  @ViewChild('tree')
  _rootElement: ElementRef;

  @Input('showValue')
  showValue = false;

  @Input('onlyEnd')
  onlyEnd = true;

  @Input('layer') layer: number;

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  tree;
  rootData;
  container;
  linkContainer;
  nodeIndex = 0;

  high = [0, 180, 240, 360, 540, 780, 1080];

  collapse = d => {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(this.collapse);
      d.children = null;
    }
  };

  constructor() {

  }

  BCG = d3.linkRadial<HierarchyPointLink<{}>, HierarchyPointNode<{}>>().angle(d => d.x).radius(d => d.y);

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName == 'width') {
        if (changes[propName].isFirstChange()) {
          this.draw();
        }
      }

      if (propName == 'layer') {
        const change = changes[propName];
        if (!change.isFirstChange()) {
          this.rootData.children.forEach(this.collapse);
          this.rootData.children.forEach(x => this.changeLayer(x, change.currentValue));
          this.drawTree(this.rootData);
        }
      }
    }
  }

  draw() {
    this.tree = d3.tree()
      .size([Math.PI * 2, 600])
      .separation(function (a, b) {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });

    const svg = d3.select(this._rootElement.nativeElement)
      .attr('width', this.width)
      .attr('height', this.options.height);
    this.container = svg.append('g');
    this.linkContainer = this.container.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.2, 2])
      .on('zoom', () => {
        // v4: 原来的translate和scale值现在都在 event.transform 中
        // d3.event.transform 等价于
        // "translate(" + d3.event.transform.x + "," + d3.event.transform.y ")scale(" + d3.event.transform.k + ")"
        this.container.attr('transform', d3.event.transform);
      });
    svg.call(zoom);
    // 初始化g标签的位置（居中）

    svg.call(zoom.transform, d3.zoomIdentity.translate(this.options.width / 2, this.options.height / 2).scale(0.7));

    this.getData();
  }

  getData() {
    this.rootData = d3.hierarchy(this.data, d => d.children);

    this.rootData.color = 0;

    const addColor = (d, c) => {
      if (d) {
        if (d.children)
          d.children.forEach(dd => addColor(dd, c));
        d.color = c;
      }
    };

    // 增加类型颜色
    for (let x = 0; x < this.rootData.children.length; x++) {
      addColor(this.rootData.children[x], x + 1);
    }

    // 全部缩回
    this.rootData.children.forEach(this.collapse);

    // 展开第二次
    this.rootData.children.forEach(this.chanegStatus);

    this.drawTree(this.rootData);
  }

  drawTree(source) {
    const radialPoint = (x, y) => {
      return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    };

    source.x0 = Math.PI;
    source.y0 = 0;

    const treeData = this.tree(this.rootData); // Assigns the x and y position for the nodes.

    const nodes = treeData.descendants(); // Array
    const links = treeData.links(); // Array

    // 初始化高度
    nodes.forEach(d => {
      d.y = d.depth * this.high[d.depth];
    });

    const node = this.container.selectAll('.node')
      .data(nodes, d => { // 必须设置id，否则会出现节点错位现象
        return d.id || (d.id = ++this.nodeIndex);
      });

    // Enter
    const nodeEnter = node.enter().append('g')
      .attr('class', d => {
        return 'node node' + d.color;
      })
      .attr('transform', d => {
        return 'translate(' + radialPoint(source.x0, source.y0) + ')';
      });

    nodeEnter.append('circle')
      .attr('r', 1e-6)
      .style('stroke-opacity', function (d) {
        if (d.children) {
          return 0.5;
        } else {
          return 0;
        }
      })
      .on('click', d => {
        if (d.depth > 0) this.toggle(d);
      });

    nodeEnter.append('path')
      .attr('d', function (d) {
        if (d.depth > 0 && d._children) {
          return 'M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z';
        } else if (d.depth > 0 && d.children) {
          return 'M-6 -1 H6 V1 H-6 Z';
        }
      })
      .style('fill-opacity', 0)
      .on('click', d => {
        if (d.depth > 0) this.toggle(d);
      });

    nodeEnter.append('text')
      .attr('dy', function (d) {
        if (d.depth === 0) return '-1.5em';
        return '0.31em';
      })
      .attr('x', function (d) {
        if (d.depth === 0) return 0;
        return d.x < Math.PI ? 16 : -16;
      })
      .attr('text-anchor', function (d) {
        if (d.depth === 0) return 'middle';
        return d.x < Math.PI ? 'start' : 'end';
      })
      .attr('transform', function (d) {
        if (d.depth === 0) return 'rotate(0)';
        return 'rotate(' + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ')';
      })
      .text(function (d) {
        return d.data.name;
      })
      .style('fill-opacity', 1e-6)
      .on('click', d => {
        if (d.data.KeyNo) this.clicked.emit(d.data.KeyNo);
      });

    if (this.showValue) {
      nodeEnter.append('text')
        .attr('dy', function (d) {
          if (d.depth === 0) return '-1.5em';
          return '0.31em';
        })
        .attr('x', function (d) {
          if (d.depth === 0) return 0;
          return d.x < Math.PI ? -16 : 16;
        })
        .attr('text-anchor', function (d) {
          if (d.depth === 0) return 'middle';
          return d.x < Math.PI ? 'end' : 'start';
        })
        .attr('transform', function (d) {
          if (d.depth === 0) return 'rotate(0)';
          return 'rotate(' + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ')';
        })
        .text(d => {
          if (d.data.value || d.data.FundedRate) {
            if ((this.onlyEnd && !d.children) || !this.onlyEnd) {
              if (d.data.value)
                return d.data.value;
              else
                return d.data.FundedRate;
            } else
              return '';
          }
          else
            return '';
        })
        .style('fill-opacity', 1)
        .attr('class', 'text-flag');
    }

    // Update
    const nodeUpdate = nodeEnter.merge(node).transition()
      .duration(600)
      .attr('transform', function (d) {
        return 'translate(' + radialPoint(d.x, d.y) + ')';
      });

    nodeUpdate.select('circle')
      .attr('r', function (d) {
        if (d.depth === 0) {
          return 12;
        } else if (d.depth < 3) {
          return 10;
        }
        return 8;
      })
      .style('stroke-opacity', function (d) {
        if (d.children) {
          return 0.5;
        } else {
          return 0;
        }
      });

    nodeUpdate.select('path')
      .attr('d', function (d) {
        if (d.depth > 0 && d._children) {
          return 'M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z';
        } else if (d.depth > 0 && d.children) {
          return 'M-6 -1 H6 V1 H-6 Z';
        }
      })
      .style('fill-opacity', 1);

    nodeUpdate.select('text')
      .attr('x', function (d) {
        if (d.depth === 0) return 0;
        return d.x < Math.PI ? 16 : -16;
      })
      .attr('text-anchor', function (d) {
        if (d.depth === 0) return 'middle';
        return d.x < Math.PI ? 'start' : 'end';
      })
      .attr('transform', function (d) {
        if (d.depth === 0) return 'rotate(0)';
        return 'rotate(' + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ')';
      })
      .style('fill-opacity', 1);

    if (this.showValue) {
      nodeUpdate.select('.text-flag')
        .attr('x', function (d) {
          if (d.depth === 0) return 0;
          return d.x < Math.PI ? -16 : 16;
        })
        .attr('text-anchor', function (d) {
          if (d.depth === 0) return 'middle';
          return d.x < Math.PI ? 'end' : 'start';
        })
        .attr('transform', function (d) {
          if (d.depth === 0) return 'rotate(0)';
          return 'rotate(' + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ')';
        })
        .style('fill-opacity', 1);
    }

    // Exit
    const nodeExit = node.exit().transition()
      .duration(600)
      .attr('transform', function (d) {
        return 'translate(' + radialPoint(source.x, source.y) + ')';
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('path')
      .style('fill-opacity', 0);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    const link = this.linkContainer.selectAll('.link')
      .data(links, function (d) { // 此行配置需放在node配置之后
        return d.id || (d.id = 'link' + d.source.id + d.target.id);
      });

    const linkRadial = d3.linkRadial();

    const linkEnter = link.enter().append('path')
      .attr('class', 'link')
      .attr('d', linkRadial
        .angle(function (d) {
          return source.x0;
        })
        .radius(function (d) {
          return source.y0;
        })
      );

    linkEnter.merge(link).transition()
      .duration(600)
      .attr('d', this.BCG);


    link.exit().transition()
      .duration(600)
      .attr('d', linkRadial
        .angle(function (d) {
          return source.x;
        })
        .radius(function (d) {
          return source.y;
        })
      )
      .remove();


    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  changeLayer = (d, num) => {
    if (num != 0) {
      if (d._children) {
        d.children = d._children;
        d.children.forEach(x => this.changeLayer(x, num - 1));
        d._children = null;
      }
    }
  };

  chanegStatus(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  }

  toggle(d) {
    this.chanegStatus(d);
    this.drawTree(d);
  }

  get options() {
    return {
      width: this.width,
      height: this.height
    };
  }

}
