import {EventEmitter} from '@angular/core';
import {Link} from './link';
import {Node} from './node';
import * as d3 from 'd3';

let FORCES = {
  LINKS: 1 / 300,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links, options: { width, height }, charge: number) {
    this.nodes = nodes;
    this.links = links;

    FORCES.CHARGE = charge;

    this.initSimulation(options);
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** 创建数据模型 */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody()
            .strength(d => FORCES.CHARGE * d['r'])
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + 5).iterations(2)
        );

      // 连接d3的tick到Angular的事件发射器
      this.simulation.on('tick', () => {
        ticker.emit();
      });

      this.initNodes();
      this.initLinks();
    }

    /** 更新力导图的中心位置 */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** 重新计算力导图的位置信息 */
    this.simulation.restart();

    // 手动tick模拟碰撞计算力导出初始的分布位置
    for (let x = 1; x < 200; x++) {
      this.simulation.tick();
    }

    // 固定所有的节点
    for (let x = 0; x < this.nodes.length; x++) {
      this.nodes[x].fx = this.nodes[x].x;
      this.nodes[x].fy = this.nodes[x].y;
    }

    for (let x = 0; x < this.links.length; x++) {
      if (isNaN(this.links[x].getX())) {
        this.links.splice(x, 1);
      }
    }

    // 结束模拟
    this.simulation.stop();
  }

  // 强制刷新信息
  refresh() {
    this.ticker.emit();
  }
}
