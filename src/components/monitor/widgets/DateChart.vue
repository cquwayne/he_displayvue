<template>
  <ve-line id="myChart"
           :toolbox="toolbox"
           :data-zoom="dataZoom"
           :not-set-unchange="notSetUnchange"
           :settings="settings"
           :extend="myExtend"></ve-line>
</template>

<script>
import api from 'api'
export default {
  name: 'DateChart',
  // 只需传入【时间】和【数据】就行
  props: ['dateTime', 'chartInfo'],
  data: function () {
    return {
      // 接收传过来的数据
      iChartInfo: [],
      // 是否显示游标
      isShowCursor: true,
      // 最大值最小值配置数据
      maxMinCursor: {
        data: [
          {
            name: '最大值',
            type: 'max'
          },
          {
            name: '最小值',
            type: 'min'
          }
        ]
      },
      // 平均线配置数据
      avgCursor: {
        data: [
          {
            name: '平均线',
            type: 'average'
          }
        ]
      },
      // 工具箱
      toolbox: {
        feature: {
          // 保存为图片
          saveAsImage: {},
          // 缩放
          dataZoom: {
            yAxisIndex: 'none'
          },
          // 还原
          restore: {},
          // 自定义工具
          myCursor: {
            show: true,
            // 鼠标悬浮提示
            title: '游标',
            // 工具的图标
            icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
            // 点击事件---隐藏和显示最大值最小值游标
            onclick: () => {
              this.myExtend.series.forEach((item) => {
                if (this.isShowCursor) {
                  item.markLine = []
                  item.markPoint = []
                } else {
                  item.markPoint = this.maxMinCursor
                  item.markLine = this.avgCursor
                }
              })
              this.isShowCursor = !this.isShowCursor
            }
          }
        }
      },
      dataZoom: [
        {
          type: 'slider'
        },
        {
          // 滚轮缩放
          type: 'inside',
          start: 0,
          minSpan: 1
        }
      ],
      // 解决统计图添加新数据时缩放发生重置的问题
      notSetUnchange: ['dataZoom'],
      // settings设置
      settings: {
        // X轴类型
        xAxisType: 'time'
      },
      // 因为要隐藏和显示最大值和最小值，所以要把这个属性，放到extend属性里，这样修改才会起作用
      // echarts中的属性也可以在这里添加设置
      myExtend: {
        title: {
          // 标题
          text: '',
          left: '10%'
        },
        // 左右两边留白，太近导致x轴两边的日期显示不全
        grid: {
          left: 50,
          right: 50
        },
        yAxis: {
          // 设置y轴的最大最小值，这里设置的是 最大值 是 当前数据最大值 的 1/3 的 5的倍数
          max: function (value) {
            let max = value.max + (value.max - value.min) * 1 / 3
            return Math.ceil(max / 5) * 5
          },
          min: function (value) {
            let min = value.min - (value.max - value.min) * 1 / 3
            return Math.ceil(min / 5) * 5
          },
          // 坐标指示器自动吸附
          axisPointer: {
            snap: true
          }
        },
        xAxis: {
          // 1 最小间隔是1的倍数
          minInterval: 1000,
          // x轴分割份数
          splitNumber: 12,
          axisLabel: {
            // 格式化x轴显示的文字
            formatter: (value, index) => {
              let dateStr = api.formatDate(value).split(' ')
              return dateStr[0] + '\n' + dateStr[1]
            }
          }
        },
        // 线条数据
        series: [],
        legend: {
          data: []
        },
        // 格式化信息框
        tooltip: {
          trigger: 'axis',
          formatter: function (datas) {
            let result = `<font color="#87cefa">时间:${datas[0].value[0]}</font><br/>`
            datas.forEach(function (item) {
              result += `<font color='${item.color}'>${item.seriesName}:${item.value[1]}</font><br/>`
            })
            return result
          }
        }
      }
    }
  },
  mounted () {
    // 方便监听
    this.iChartInfo = this.chartInfo
    /**
       * 1.接收锚
       * 因为根据时间查询的话，有可能选择的时间在当前时间的未来
       * 所以即使未来的数据还没有出现，但还是要把统计图给撑起来，
       * 如果没有传入时间，就搞个没数据的界面
       */
    if (this.dateTime != null) {
      this.myExtend.series.push({
        type: 'line',
        // 锚线只是为了支撑，所以不显示
        show: false,
        showSymbol: false,
        hoverAnimation: false,
        // 锚就两个值 一个是开始时间 一个是结束时间
        data: [
          {
            value: [this.dateTime[0]]
          },
          {
            value: [this.dateTime[1]]
          }
        ]
      })
    }
  },
  watch: {
    /**
       * 监听传递过来的值，然后实时更新
       * 传递过来的值 时间，值，颜色
       */
    iChartInfo: {
      handler (newValue, oldValue) {
        if (newValue !== null) {
          // 更新新值前线清除上次的老数据，除了锚剩下的就是老数据
          this.myExtend.series.splice(1, this.myExtend.series.length - 1)
          newValue.forEach((item) => {
            this.myExtend.legend.data.push(item.name)
            this.myExtend.series.push({
              type: 'line',
              show: true,
              showSymbol: false,
              hoverAnimation: false,
              name: item.name,
              data: item.data,
              color: item.color,
              // 平均线
              markLine: this.isShowCursor ? this.avgCursor : '',
              // 最大值，最小值
              markPoint: this.isShowCursor ? this.maxMinCursor : ''
            })
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
