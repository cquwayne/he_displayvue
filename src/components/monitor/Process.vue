<template>
  <div>
      <!--      <model-obj :backgroundAlpha="0" @on-load="onLoad" src="static/models/obj/turbo.obj"></model-obj>-->
      <!--      <model-obj :backgroundAlpha="0" @on-load="onLoad" src="static/models/obj/male02.obj" mtl="static/models/obj/male02.mtl"></model-obj>-->
      <!--      <model-stl :backgroundAlpha="0" @on-load="onLoad" src="static/models/obj/m.STL"></model-stl>-->
    <el-row>
      <model-fbx src="static/models/fx4.fbx"></model-fbx>
<!--      <model-fbx src="static/models/obj/x1.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x2.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x3.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x4.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x5.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x6.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x7.fbx"></model-fbx>-->
<!--      <model-fbx src="static/models/obj/x8.fbx"></model-fbx>-->
    </el-row>
    <el-row>
      <el-select v-model="currentItem" placeholder="请选择">
        <el-option
          v-for="item in chartInfo"
          :key="item.index"
          :label="item[0].name"
          :value="item">
        </el-option>
      </el-select>
      <DateChart :chartInfo="currentItem" v-if="currentItem!==''&&refresh"></DateChart>
    </el-row>
  </div>
</template>

<script>
import DateChart from './widgets/DateChart'
import api from 'api'
export default {
  name: 'Process',
  components: {
    DateChart
  },
  mounted () {
    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    // 【模拟】开始推送,这里是设置1s执行一次
    setInterval(() => {
      this.pushData()
    }, 1000)
  },
  data () {
    return {
      loading: true,
      refresh: true,
      currentItem: '',
      chartInfo: [
        [{
          // 线条名称
          name: '熔炼温度',
          // 线条颜色
          color: '#BF0060',
          // 线条的数据 格式[ value:{时间,值},value:{时间,值},value:{时间,值}... ]
          data: []
        }],
        [{
          name: '熔炉电压',
          color: '#4B0091',
          data: []
        }]
      ]
    }
  },
  watch: {
    currentItem (newValue, oldValue) {
      this.refreshWindows()
    }
  },
  methods: {
    refreshWindows () {
      this.refresh = !this.refresh
      this.$nextTick(() => {
        this.refresh = !this.refresh
      })
    },
    onLoad () {
      this.loading = false
    },
    /**
     * 模拟推送数据
     * 真实情况可以用socket推送，或者定时器定时从后台获取数据！！！
     */
    pushData () {
      let watchNum = this.getRandom(1500, 1650)
      let orderNum = this.getRandom(200, 240)
      let nowDate = api.formatDate(new Date())
      if (this.chartInfo[0][0].data.length > 50) {
        this.chartInfo[0][0].data.splice(0, 1)
      }
      if (this.chartInfo[1][0].data.length > 50) {
        this.chartInfo[1][0].data.splice(0, 1)
      }
      this.chartInfo[0][0].data.push({
        value: [nowDate, watchNum]
      })
      this.chartInfo[1][0].data.push({
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
