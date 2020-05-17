import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HierarchyPointLink, HierarchyPointNode} from 'd3';

@Component({
  selector: 'indented-tree',
  templateUrl: './indented-tree.component.html',
  styleUrls: ['./indented-tree.component.scss']
})
export class IndentedTreeComponent implements OnChanges {
  @ViewChild('svg')
  svg_ref: ElementRef;

  @Input('dataset')
  data;

  BCG = d3.linkHorizontal<HierarchyPointLink<{}>, HierarchyPointNode<{}>>().x(d => d.y).y(d => d.x);

  svg;

  root;

  @Input('width')
  width;
  barHeight = 60;
  barWidth = 380;

  duration = 400;
  i = 0;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.width != 0)
      this.draw();
  }

  draw() {
    this.data.root = true;
    if (this.data.children[0]) {
      this.data.children[0].color = true;
      this.data.children.forEach(x => {
        if (x.children[0])
          x.children[0].color = true;
      });
    }
    this.svg = d3.select(this.svg_ref.nativeElement)
      .attr('width', this.width)
      .append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.4, 2])
      .on('zoom', () => {
        this.svg.attr('transform', d3.event.transform);
      });
    d3.select(this.svg_ref.nativeElement).call(zoom);
    // 初始化g标签的位置（居中）
    d3.select(this.svg_ref.nativeElement).call(zoom.transform, d3.zoomIdentity.translate(this.width / 2 - this.barWidth / 2, 150).scale(1.1));

    this.root = d3.hierarchy(this.data);
    this.root.x0 = 0;
    this.root.y0 = 0;

    this.update(this.root);
  }

  update(source) {
    const nodes = this.root.descendants();

    const height = this.options.height;

    d3.select(this.svg_ref.nativeElement)
      .transition()
      .duration(this.duration)
      .attr('height', height);

    d3.select(self.frameElement).transition()
      .duration(this.duration)
      .style('height', height + 'px');

    let index = -1;
    this.root.eachBefore(n => {
      n.x = ++index * this.barHeight + index * 10;
      n.y = n.depth * 20;
    });

    const node = this.svg.selectAll('.snode')
      .data(nodes, d => d.id || (d.id = ++this.i));

    const nodeEnter = node.enter().append('g')
      .attr('class', 'snode')
      .attr('transform', d => 'translate(' + source.y0 + ',' + source.x0 + ')')
      .style('opacity', 0);

    // Enter any new nodes at the parent's previous position.
    nodeEnter.append('rect')
      .attr('y', -this.barHeight / 2)
      .attr('height', this.barHeight)
      .attr('width', this.barWidth)
      .style('fill-opacity', 0)
      .style('stroke-width', 0.5)
      .style('stroke', 'rgb(153, 153, 153)')
      .on('click', d => {
        this.click(d);
      });

    nodeEnter.append('rect')
      .attr('y', -this.barHeight / 2)
      .attr('height', this.barHeight)
      .attr('width', 8)
      .style('fill', d => {
        if (d.data.root)
          return 'rgb(18, 139, 237)';
        else {
          if (d.data.color)
            return 'rgb(247, 76, 82)';
          else {
            if (d.data.Org == 0)
              return 'rgb(127, 130, 242)';
            else
              return 'rgb(89, 207, 177)';
          }
        }
      })
      .style('fill-opacity', 1)
      .style('stroke', 'none');

    nodeEnter.append('text')
      .attr('dy', d => {
        if (d.data.root)
          return 5.5;
        else
          return -7;
      })
      .attr('dx', 40)
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    nodeEnter.append('text')
      .attr('dy', 15)
      .attr('dx', 40)
      .style('font-size', 13)
      .style('fill', '#666666')
      .text(d => {
        if (d.data.root)
          return '';
        else
          return '股权比例:';
      });

    nodeEnter.append('text')
      .attr('dy', 15)
      .attr('dx', 100)
      .style('font-size', 13)
      .style('fill', '#ff7e00')
      .text(d => {
        if (d.data.root)
          return '';
        else {
          if (d.data.Percent && d.data.Percent != '0%')
            return d.data.Percent;
          else
            return '-';
        }
      });

    nodeEnter.append('line')
      .attr('x1', 11)
      .attr('y1', 0)
      .attr('x2', 21)
      .attr('y2', 0)
      .style('stroke-width', '1.5px')
      .style('stroke', d => {
        if (!d.data.children || d.data.children.length == 0)
          return 'none';
        else
          return '#bbbbbb';
      });

    nodeEnter.append('line')
      .attr('x1', 16)
      .attr('y1', -5)
      .attr('x2', 16)
      .attr('y2', 5)
      .attr('class', 'selector')
      .style('stroke-width', '1.5px')
      .style('stroke', d => {
        if (!d.data.children || d.data.children.length == 0 || d._children == undefined)
          return 'none';
        else
          return '#bbbbbb';
      });


    nodeEnter.append('circle')
      .attr('cx', 16)
      .attr('cy', 0)
      .attr('r', d => {
        if (!d.data.children || d.data.children.length == 0)
          return 0;
        else
          return 6;
      })
      .style('fill', 'none')
      .style('stroke', '#999999')
      .style('stroke-width', '0.5');

    nodeEnter.append('text')
      .attr('dy', 15)
      .attr('dx', 170)
      .style('font-size', 13)
      .style('fill', '#666666')
      .text(d => {
        if (d.data.root)
          return '';
        else
          return '认缴金额:';
      });

    nodeEnter.append('text')
      .attr('dy', 15)
      .attr('dx', 230)
      .style('font-size', 13)
      .style('fill', '#ff7e00')
      .text(d => {
        if (d.data.root)
          return '';
        else {
          if (d.data.ShouldCapi)
            return d.data.ShouldCapi + '万元';
          else
            return '-';
        }
      });

    nodeEnter.transition()
      .duration(this.duration)
      .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
      .style('opacity', 1);

    node.transition()
      .duration(this.duration)
      .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
      .style('opacity', 1)
      .select('rect')
      .style('fill', this.color);

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.select('.selector')
      .style('stroke', d => {
        if (!d.data.children || d.data.children.length == 0 || d._children == undefined)
          return 'none';
        else
          return '#bbbbbb';
      });

    node.exit().transition()
      .duration(this.duration)
      .attr('transform', d => 'translate(' + source.y + ',' + source.x + ')')
      .style('opacity', 0)
      .remove();

    // Update the links…
    const link = this.svg.selectAll('.slink')
      .data(this.root.links(), d => d.target.id);

    // Enter any new links at the parent's previous position.
    link.enter().insert('path', 'g')
      .attr('class', 'slink')
      .attr('d', d => {
        const o: any = [source.x0, source.y0];
        this.BCG({source: o, target: o});
      })
      .transition()
      .duration(this.duration)
      .attr('d', this.BCG);

    // Transition links to their new position.
    link.transition()
      .duration(this.duration)
      .attr('d', this.BCG);


    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(this.duration)
      .attr('d', d => {
        const o: any = {x: source.x, y: source.y};
        this.BCG({source: o, target: o});
      })
      .remove();

    // Stash the old positions for transition.
    this.root.each(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update(d);
  }

  color(d) {
    return d._children ? '#3182bd' : d.children ? '#c6dbef' : '#fd8d3c';
  }

  get options() {
    return {
      width: window.innerWidth,
      height: window.innerHeight * 0.8
    };
  }

}
