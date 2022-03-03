<!--实时数据监控-->
<template>
  <el-container>

      <div style="height: 800px ">
        <el-row style="float:left; height: 800px; width: 1000px; margin-top: -250px">
          <model-fbx v-if="!sceneVisible" src="static/models/fx0.fbx" backgroundColor=#818181></model-fbx>
          <!--<model-fbx v-if="!sceneVisible" src="static/models/fx0.fbx"></model-fbx>-->
          <model-fbx v-if="sceneVisible" src="static/models/fx1.fbx"></model-fbx>
        </el-row>
      </div>
      <div class="el-row" style="margin-right: -10px; width: 1000px; height:300px;">
        <!--柱状图-->
        <div id="myChart" style="float:right;width:750px;height:320px;"></div>
      </div>
  </el-container>

</template>

<script>
export default {
name: "RealTimeMonitor",
  data() {
    return {
      sceneVisible: false,
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '机床生态影响汇总结果柱状图\n' },
        tooltip: {},
        xAxis: {
          axisLabel:{interval: 0},
          data: ["ADP","WRC","FEC","GWP","AP","EP","POCP","HTP","ETP","RI"]
        },
        yAxis: {},
        //图例
        // legend: {
        //   data:['物质量']
        // },
        series: [{
          name: '物质量',
          type: 'bar',
          data: [4109.9, 2991.43, 25988.85, 12556.89, 70924.08, 973.75, 973.75, 27510.91, 81794.79, 18319.54],
          itemStyle: {
            normal: {
              //这里是重点
              color: function(params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList = ['#A4CDEE', '#2AAAE3', '#192E5E', '#C3E5EB', '#DC143C','#2F4F4F', '#006400','#FFFF00','#D2691E','#000000'];
                return colorList[params.dataIndex]
              }
            }
          }
        }]
      });
    },
  }
}
</script>

<style scoped>

</style>
