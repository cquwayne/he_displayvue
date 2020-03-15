<template>
  <div class="Graph" id="container">
      <div class="root">
        <div class="node" :id="graph.id" name="cell" v-if="isRoot">
          {{graph.title}}
        </div>
      </div>
      <div class="leaf">
        <div v-for="item in targetList" class="node" :key="item.id"  :id="item.id" name="cell">
          <div>{{item.title}}</div>
          <graph ref="graph" :graph="item" />
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Graph',
  props: {
    graph: {
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
	data () {
		return {
      jsPlumb: null
			// sourceList: [{title: 'XX', id: 1}],
			// targetList: [
      //   {title: 'YY', id: 2},
      //   {title: 'YY', id: 3},
      //   {title: 'YY', id: 4}
      // ],
      // connList: [
      //   {inputId: 1, outputId: 2},
      //   {inputId: 1, outputId: 3},
      //   {inputId: 1, outputId: 4}
      // ]
    }
  },
  computed: {
    sourceList () {
      return [this.graph]
    },
    targetList () {
      return this.graph['innerCubeList']
    },
    connList () {
      return this.graph['innerBridgeList']
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'container', // 选择器id
      Anchor: 'BottomCenter',
      EndpointStyle: {radius: 4, fill: '#acd'}, // 端点样式
      PaintStyle: {stroke: '#aaa', strokeWidth: 4}, // 绘画样式，默认8px线宽  #456
      HoverPaintStyle: {stroke: '#1E90FF'}, // 默认悬停样式  默认为null
      EndpointHoverStyle: {fill: '#F00', radius: 6}, // 端点悬停样式
      	ConnectionOverlays: [
				['Arrow', {
					location: 1,
					paintStyle: {
						stroke: '#00688B',
						fill: '#00688B'
          }
        }]
			],
			Connector:['Flowchart', {gap: 1}],     //要使用的默认连接器的类型：折线，流程等
			DrapOptions:{cursor:"crosshair", zIndex:2000}
		})
  },
	methods:{
    paint () {
      if (this.sourceList === undefined || this.targetList === undefined) {
        return
      }
      let ins = this.jsPlumb
      let allConnection = ins.getAllConnections()
      ins.batch(() => {
        this.initAll()
        this.connectionAll()
      })
      this.switchContainer(true, true, false)
      let ref = this.$refs.graph
      if (ref === null || ref === undefined) {
        return
      }
      if (ref instanceof Array) {
        for (let i = 0; i < ref.length; i++) {
          if(ref[i].paint !== undefined) {
            ref[i].paint()
          }
        }
      } else {
        if(ref.paint !== undefined) {
          ref.paint()
        }
      }
    },
		initAll () {
      let sourceList = this.sourceList
			for (let i = 0; i < sourceList.length; i++) {
				this.init(sourceList[i].id)
			}
			let targetList = this.targetList
			for (let i = 0; i < targetList.length; i++) {
				this.init(targetList[i].id)
			}
		},
		// 初始化规则使其可以连线、拖拽
		init (id) {
			let ins = this.jsPlumb
      let elem = document.getElementById(id)
			ins.makeSource(elem, {
				anchor: ['Perimeter', {anchorCount: 200, shape: 'Rectangle'}],
				allowLoopback: false,
				maxConnections: 10
			})
			ins.makeTarget(elem, {
				anchor: ['Perimeter', {anchorCount: 200, shape: 'Rectangle'}],
				allowLoopback: false,
				maxConnections: 10
			})
			ins.draggable(elem, {
				containment: true
			})
		},
		connectionAll () {
			let ins = this.jsPlumb
			ins.ready(() => {
				for (let i = 0; i < this.connList.length; i++) {
					let conn = this.connList[i]
          let connection = ins.connect({
              source: conn.inputId.toString(),
              target: conn.outputId.toString()
            })
					connection.setPaintStyle({stroke: '#aaa', strokeWidth: 4})
				}
			})
		},
		switchContainer (target, source, draggable) {
			let elem = document.getElementsByName('cell')
			let ins = this.jsPlumb
			ins.setSourceEnabled(elem, source)
			ins.setTargetEnabled(elem, target)
			ins.setDraggable(elem, draggable)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.Graph{
    position: relative;
		border: solid 1px #ccc;
    border-radius: 5px;
		width: fit-content;
		height: fit-content;
	}
	div{
		width: fit-content;
		height: fit-content;
  }
  .root{
    padding: 10px 0;
    text-align: center;
  }
  .leaf{
    padding: 10px 0;
    display: flex;
  }
	.node{
		width: fit-content;
		height: fit-content;
    margin: 10px;
    padding: 10px;
    border: solid 1px #e2e2e2;
    border-radius: 5px;
	}
</style>

