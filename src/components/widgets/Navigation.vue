<template>
  <div class="Navigation">
    <div class="group" v-for="item in navList" :key="item.index">
      <div class="title">
        <i :class="item.icon"></i> &nbsp;{{item.title}}
      </div>
      <div class="list">
        <router-link v-for="sub in item.list" :to="{name: sub.name}" :key="sub.index">
          <i :class="sub.icon"></i> &nbsp;{{sub.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  data () {
    return {
      navList: [
        {
          title: '模型管理',
          icon: 'el-icon-s-grid',
          list: [
            {
              title: '模型库',
              name: 'ModelIndex',
              icon: 'el-icon-discover',
            },
            {
              title: '数据流图',
              name: 'ModelIndex',
              icon: 'el-icon-full-screen',
            }
          ]
        },
        {
          title: '规则管理',
          icon: 'el-icon-document-copy',
          list: [
            {
              title: '规则库',
              name: 'RuleIndex',
              icon: 'el-icon-link',
            },
            {
              title: '规则链',
              name: 'ChainIndex',
              icon: 'el-icon-connection',
            }
          ]
        },
        {
          title: '任务管理',
          icon: 'el-icon-c-scale-to-original',
          list: [
            {
              title: '任务库',
              name: 'InstanceIndex',
              icon: 'el-icon-data-line',
            },
            {
              title: '实时采集',
              name: 'Running',
              icon: 'el-icon-timer'
            }
          ]
        },
        {
          title: '数据管理',
          icon: 'el-icon-coin',
          list: [
            {
              title: '数据接口',
              name: 'DataIndex',
              icon: 'el-icon-monitor',
            },
            {
              title: '时序数据',
              name: 'Influx',
              icon: 'el-icon-time',
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .Navigation{
    width: 100%;
    text-align: left;
    color: #fff;
    .group{
      margin: 20px 20px 10px 20px;
      padding-bottom: 8px;
      &:not(:last-child) {
        border-bottom: solid 1px #555;
      }
    }
    .title{
      color: #aaa;
      font-size: 14px;
    }
    .list{
      a{
        font-size: 14px;
        display: block;
        padding: 0 15px;
        margin: 15px 0;
        color: #ccc;
      }
      .router-link-active{
        color: gold;
      }
    }
  }
</style>
