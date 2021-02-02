<template>
  <div>
    <el-row>
      <DateChart :chartInfo="chartInfo" v-if="refresh"></DateChart>
    </el-row>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line'
import DateChart from './widgets/DateChart'
import api from 'api'
export default {
  name: 'Realtime',
  components: {
    DateChart
  },
  mounted () {
    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    // 【模拟】开始推送,这里是设置1s执行一次
    setInterval(() => {
      this.pushData()
    }, 500)
  },
  data () {
    return {
      refresh: true,
      // 给统计图的数据
      chartInfo: [
        {
          // 线条名称
          name: '熔炼温度',
          // 线条颜色
          color: '#BF0060',
          // 线条的数据 格式[ value:{时间,值},value:{时间,值},value:{时间,值}... ]
          data: []
        },
        {
          name: '熔炉电压',
          color: '#4B0091',
          data: []
        }
      ]
    }
  },
  methods: {
    refreshWindows () {
      this.refresh = !this.refresh
      this.$nextTick(() => {
        this.refresh = !this.refresh
      })
    },
    /**
     * 模拟推送数据
     * 真实情况可以用socket推送，或者定时器定时从后台获取数据！！！
     */
    pushData () {
      let watchNum = this.getRandom(1500, 1650)
      let orderNum = this.getRandom(200, 240)
      let nowDate = api.formatDate(new Date())

      this.chartInfo[0].data.push({
        value: [nowDate, watchNum]
      })
      this.chartInfo[1].data.push({
        value: [nowDate, orderNum]
      })
    },
    getRandom (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style scoped>

</style>
