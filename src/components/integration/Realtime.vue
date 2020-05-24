<template>
  <div class="Realtime">
    <h5 style="margin-left:20px">湿喷机零件工艺过程 -- GB4028锯床加工数据实时监控</h5>
    <el-row>
      <el-col :span="12">
        <ve-line id="chart" :data="chartData1" :height="chartHeight"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line id="chart" :data="chartData2" :height="chartHeight"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line id="chart" :data="chartData3" :height="chartHeight"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line id="chart" :data="chartData4" :height="chartHeight"></ve-line>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mqtt from '../../api/mqtt'
export default {
  name: 'Realtime',
  computed: {
    topic () {
      return [
        '/topic/#'
      ]
    },
    chartHeight () {
      // return this.$refs['chart']['offsetHeight']
      if (document.getElementById('chart')) {
        return window.getComputedStyle(document.getElementById('chart'), null).height
      } else {
        return this.chart.height
      }
    }
  },
  data () {
    return {
      url: this.$store.state.url + 'integration/processs/6',
      chart: {
        height: '260px'
      },
      process: {
        id: 6
      },
      chartData1: {
        columns: [],
        rows: [],
        columnMap: {},
        maxDot: 30
      },
      chartData2: {
        columns: [],
        rows: [],
        columnMap: {},
        maxDot: 30
      },
      chartData3: {
        columns: [],
        rows: [],
        columnMap: {},
        maxDot: 30
      },
      chartData4: {
        columns: [],
        rows: [],
        columnMap: {},
        maxDot: 30
      },
      propertyMessage: {
        valueMap: {
          42: '锯条速度',
          3: '进给量',
          6: '废液排放量',
          8: '噪声'
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.process = res.data
        vm.initChart()
        vm.connect()
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$axios.get(this.url).then(res => {
      this.process = res.data
      this.initChart()
      this.connect()
    })
    next()
  },
  beforeRouteLeave (to, from, next) {
    mqtt.unsubscribe(this.topic, null)
    next()
  },
  methods: {
    initChart () {
      this.chartData1.columns = ['createdAt']
      this.chartData1.columns.push('锯条速度')
      this.chartData1.columnMap[1] = '锯条速度'
      this.chartData2.columns = ['createdAt']
      this.chartData2.columns.push('进给量')
      this.chartData2.columnMap[1] = '进给量'
      this.chartData3.columns = ['createdAt']
      this.chartData3.columns.push('废液排放量')
      this.chartData3.columnMap[1] = '废液排放量'
      this.chartData4.columns = ['createdAt']
      this.chartData4.columns.push('噪声')
      this.chartData4.columnMap[1] = '噪声'
    },
    connect () {
      let callback = [
        this.propertyCallback
      ]
      mqtt.subscribe(this.topic, callback)
    },
    propertyCallback (message) {
      switch (message['attributeId']) {
        case 42:
          this.drawing(this.chartData1, message)
          break
        case 3:
          this.drawing(this.chartData2, message)
          break
        case 6:
          this.drawing(this.chartData3, message)
        case 8:
          this.drawing(this.chartData4, message)
          break
      }
    },
    drawing (chartData, message) {
      let dot = {
        createdAt: this.getTime()
      }
      let map = this.propertyMessage.valueMap
      dot[map[message['attributeId']]] = message['value']
      if (chartData.rows.length >= chartData.maxDot) {
        // 删除数组第一个元素，以保障chart不超出最大点数
        chartData.rows.shift()
      }
      chartData.rows.push(dot)
    },
    getTime () {
      let date1 = new Date()
      // let year = date1.getFullYear()
      let month = date1.getMonth() + 1
      let day = date1.getDate()
      let hours = date1.getHours()
      let minutes = date1.getMinutes()
      let seconds = date1.getSeconds()
      // return year + '年' + month + '月' + day + '日' + hours + ':' + minutes + ':' + seconds
      return hours + ':' + minutes + ':' + seconds
    }
  }
}
</script>

<style lang="scss">
  .Realtime{
    height: 100%;
    .el-header{
      height: 100px!important;
      padding: 10px 20px!important;
      .title{
        font-weight: bolder;
        font-size: 18px;
        margin: 5px 0;
      }
      .description, .more{
        font-size: 14px;
        color: slategray;
        margin: 10px 0;
        span, a{
          font-size: 14px;
          color: slategray
        }
        a{
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    .el-main{
      min-height: 300px;
      height: auto !important;
      width: 100%!important;
      padding: 20px 20px!important;
      .el-card{
        height: calc(100% - 2px);
        width: 100%;
        .el-card__body{
          height: calc(100% - 40px);
          width: calc(100% - 40px);
        }
        .ve-line{
          height: 100%!important;
        }
      }
    }
    .el-footer{
      height: 400px!important;
      .el-row{
        .el-col{
          height: 400px!important;
          min-width: 400px;
          .el-scrollbar{
            height: 100%;
            width: 100%;
            .el-card{
              margin: 20px 10px;
              width: calc(100% - 30px);
            }
          }
          .el-scrollbar__wrap{overflow-x:hidden;}
        }
      }
    }
    h1{
      color: slategray;
    }
  }
</style>