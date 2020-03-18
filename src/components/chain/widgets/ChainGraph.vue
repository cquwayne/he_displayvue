<template>
  <svg class="ChainGraph">
    <g />
    <rect />
  </svg>
</template>
<script>
import RuleTable from '../../rule/widgets/RuleTable'
import LinkTable from './LinkTable'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
export default {
  name: 'ChainGraph',
  components: {
    RuleTable,
    LinkTable
  },
  data () {
    return {
      url: 'http://localhost:8000/api/chains/',
      dag: null,
      ruleList: null,
      linkList: null
    }
  },
  mounted () {
    // setGraph({rankdir: "LR"})为设置为横向显示 .setGraph({}) 为默认竖向显示
    this.dag = new dagreD3.graphlib.Graph().setGraph({rankdir: 'LR'}).setDefaultEdgeLabel(function () {
      return {}
    })
  },
  methods: {
    handleGraph (ruleList, linkList) {
      // 获取之前的nodes缓存并清除
      let nodes = this.dag.nodes()
      if (nodes.length) {
        nodes.forEach(
          item => {
            this.dag.removeNode(item)
          }
        )
      }
      if (ruleList !== null && linkList !== null) {
        this.ruleList = ruleList
        this.linkList = linkList
      }
      if (this.ruleList === null || this.ruleList.length === 0) {
        return
      }
      this.ruleList.forEach(item => {
        this.setNode(item)
      })
      if (this.linkList !== undefined && this.linkList.length !== 0) {
        this.linkList.forEach(item => {
          this.setEdge(item)
        })
      }
      this.paint()
    },
    setNode (item) {
      let style = 'fill: #ccc;'
      item.style = style
      this.dag.setNode(item.id, item)
    },
    setEdge (item) {
      let style = 'stroke: #0fb2cc;fill:none;'
      this.dag.setEdge(item.leftId, item.rightId, {
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
  .ChainGraph {
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
