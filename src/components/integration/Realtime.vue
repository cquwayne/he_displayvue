<template>
  <el-container class="Realtime">
    <el-main>
      <ve-line id="chart" :data="chartData" :height="chartHeight"></ve-line>
    </el-main>
  </el-container>
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
        height: '290px'
      },
      process: {
        id: 6
      },
      chartData: {
        columns: [],
        rows: [],
        columnMap: {},
        maxDot: 30
      },
      propertyMessage: {
        valueMap: {}
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
      this.chartData.columns = ['createdAt']
      this.chartData.columns.push('主轴速度')
      this.chartData.columns.push('切削度')
      this.chartData.columnMap[1] = '主轴速度'
      this.chartData.columnMap[2] = '切削度'
    },
    connect () {
      let callback = [
        this.propertyCallback
      ]
      mqtt.subscribe(this.topic, callback)
    },
    propertyCallback (message) {
      this.propertyMessage.valueMap = {}
      let dot = {
        createdAt: this.getTime()
      }
      // message['dataList'].forEach(value => {
      //   this.propertyMessage.valueMap[value['variableId']] = value['value']
      //   dot[this.chartData.columnMap[value['variableId']]] = value['value']
      // })
      dot['主轴转速'] = message['value']
      dot['切削度'] = message['value']
      if (this.chartData.rows.length >= this.chartData.maxDot) {
        // 删除数组第一个元素，以保障chart不超出最大点数
        this.chartData.rows.shift()
      }
      this.chartData.rows.push(dot)
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
      return month + '月' + day + '日' + hours + ':' + minutes + ':' + seconds
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