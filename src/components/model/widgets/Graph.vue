<template>
  <svg class="Graph">
    <g />
    <rect />
  </svg>
</template>
<script>
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
export default {
  name: 'Graph',
  data () {
    return {
      url: 'http://localhost:8000/api/nodes/',
      root: null,
      graph: null
    }
  },
  props: {
    id: {
      type: Number
    }
  },
  watch: {
    id (newVal, oldVal) {
      this.search()
    }
  },
  methods: {
    search () {
      if (this.id === null || this.id === undefined) {
        return
      }
      this.$axios.get(this.url + this.id).then(res => {
        this.root = res.data
        // 获取之前的nodes缓存并清除
        let nodes = this.graph.nodes()
        if (nodes.length) {
          nodes.forEach(
            item => {
              this.graph.removeNode(item)
            }
          )
        }
        if (this.root.childPipeList === undefined || this.root.childPipeList.length === 0) {
          this.setNode(this.root)
        } else {
          this.addNode(this.root)
        }
        this.paint()
      })
    },
    addNode (node) {
      if (node === null || node === undefined) {
        return
      }
      this.setNode(node)
      if (node.nextPipeList !== undefined && node.nextPipeList.length > 0) {
        node.nextPipeList.forEach(item => {
          this.setEdge(item)
        })
      }
      if (node.childPipeList !== undefined && node.childPipeList.length > 0) {
        node.childPipeList.forEach(item => {
          this.setEdge(item)
        })
      }
      if (node.parentPipeList !== undefined && node.parentPipeList.length > 0) {
        node.parentPipeList.forEach(item => {
          this.setEdge(item)
        })
      }
      if (node.childList !== undefined && node.childList.length > 0) {
        node.childList.forEach(item => {
          this.setNode(item)
          this.addNode(item)
        })
      }
      if (node.nextList !== undefined && node.nextList.length > 0) {
        node.nextList.forEach(item => {
          this.setNode(item)
          this.addNode(item)
        })
      }
    },
    setNode (item) {
      let style = ''
      switch (item.style) {
        case 0:
          style = 'fill: #ccc; font-weight: bold;rx:15;ry:15'
          break
        case 1:
          style = 'fill: #f77; font-weight: bold;'
          break
        default:
          style = item.style
      }
      item.style = style
      this.graph.setNode(item.id, item)
    },
    setEdge (item) {
      let style = 'stroke: #000;fill:none;'
      switch (item.style) {
        case 0:
          // return
          style = style + 'stroke: #0fb2cc; stroke-dasharray:10,10;'
          break
        case 1:
          style = style + 'stroke: #0fb2cc;'
          break
        case 2:
          style = style + 'stroke:red;stroke-width:2;'
      }
      let left, right
      if (item.inputId) {
        left = item.inputId
        right = item.outputId
      } else {
        left = item.parentId
        right = item.childId
      }
      this.graph.setEdge(left, right, {
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
      render(inner, this.graph)
    }
  },
  mounted () {
    // setGraph({rankdir: "LR"})为设置为横向显示 .setGraph({}) 为默认竖向显示
    this.graph = new dagreD3.graphlib.Graph().setGraph({rankdir: 'LR'}).setDefaultEdgeLabel(function () {
      return {}
    })
  }
}
</script>
<style scoped lang="scss">
  .Graph {
    width: fit-content;
    height: fit-content;
    border: solid 1px #ccc;
    text-align: center;
    .node-default{
      fill: #f77; font-weight: bold;
    }
    // svg {
    //   font-size: 14px;
    //   color: #fff;
    // }
    // .node rect {
    //   stroke: #606266;
    //   fill: #fff;
    // }

    // .edgePath path {
    //   stroke: #606266;
    //   fill: #333;
    //   stroke-width: 1.5px;
    // }
  }
</style>
