<template>
  <svg class="Graph">
    <g />
    <rect />
  </svg>
</template>
<script>
import NodeTable from './NodeTable'
import PipeTable from './PipeTable'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
export default {
  name: 'Graph',
  components: {
    NodeTable,
    PipeTable
  },
  data () {
    return {
      url: 'http://localhost:8000/api/nodes/',
      dag: null,
      nodeList: null,
      pipeList: null
    }
  },
  mounted () {
    // setGraph({rankdir: "LR"})为设置为横向显示 .setGraph({}) 为默认竖向显示
    this.dag = new dagreD3.graphlib.Graph().setGraph({rankdir: 'LR'}).setDefaultEdgeLabel(function () {
      return {}
    })
  },
  methods: {
    handleGraph (nodeList, pipeList) {
      // 获取之前的nodes缓存并清除
      let nodes = this.dag.nodes()
      if (nodes.length) {
        nodes.forEach(
          item => {
            this.dag.removeNode(item)
          }
        )
      }
      if (nodeList !== null && pipeList !== null) {
        this.nodeList = nodeList
        this.pipeList = pipeList
      }
      if (this.nodeList === null || this.nodeList.length === 0) {
        return
      }
      this.nodeList.forEach(item => {
        this.setNode(item)
      })
      if (this.pipeList !== undefined && this.pipeList.length !== 0) {
        this.pipeList.forEach(item => {
          this.setEdge(item)
        })
      }
      this.paint()
    },
    setNode (item) {
      let style
      switch (item.style) {
        case 0:
          style = 'fill: #ccc; font-weight: bold;rx:15;ry:15'
          break
        case 1:
          style = 'fill: #f77; font-weight: bold;'
          break
        default:
          style = item.style ? item.style : 'fill: #ccc;'
      }
      item.style = style
      this.dag.setNode(item.id, item)
    },
    setEdge (item) {
      let style
      switch (item.direction) {
        case 1:
          style = 'stroke: #0fb2cc; stroke-dasharray:10,10;'
          break
        case 2:
          style = 'stroke: #0fb2cc;'
          break
        case 3:
          style = 'stroke:red;stroke-width:2;'
      }
      console.log(style)
      this.dag.setEdge(item.inputId, item.outputId, {
        style: style,
        arrowheadStyle: 'fill: #0fb2cc;stroke: #0fb2cc;',
        arrowhead: 'vee'
      })
    },
    paint () {
      // 绘制图形
      let svg = d3.select('svg')
      let inner = svg.select('g')
      // 缩放
      var zoom = d3.zoom().on('zoom', function () {
        inner.attr('transform', d3.event.transform)
      })
      svg.call(zoom)
      var render = new dagreD3.render()
      render(inner, this.dag)
    }
  }
}
</script>
<style scoped lang="scss">
  .Graph {
    width: 100%;
    height: 300px;
    text-align: center;
    .node-default{
      fill: #f77; font-weight: bold;
    }
    .el-card{
      height: calc(50% - 18px)!important;
    }
    svg {
      width: 100%;
      height: calc(100% - 10px);
      font-size: 14px;
      color: #fff;
    }
  }
</style>
