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
          title: '结构化模型管理',
          icon: 'el-icon-s-grid',
          list: [
            {
              title: '结点管理',
              name: 'Node',
              icon: 'el-icon-box',
            },
            {
              title: '坐标管理',
              name: 'Point',
              icon: 'el-icon-map-location',
            },
            {
              title: '管道管理',
              name: 'Pipe',
              icon: 'el-icon-s-unfold',
            },
            {
              title: '超链接管理',
              name: 'Hyperlink',
              icon: 'el-icon-link',
            }
          ]
        },
        {
          title: '规范化模型管理',
          icon: 'el-icon-files',
          list: [
            {
              title: '规则管理',
              name: 'Rule',
              icon: 'el-icon-paperclip',
            },
            {
              title: '属性管理',
              name: 'Attribute',
              icon: 'el-icon-tickets',
            },
            {
              title: '信息管理',
              name: 'Information',
              icon: 'el-icon-document-copy',
            }
          ]
        },
        {
          title: '工艺信息集成管理',
          icon: 'el-icon-coin',
          list: [
            {
              title: '工艺过程',
              name: 'Process',
              icon: 'el-icon-s-operation',
            },
            {
              title: '实时管理',
              name: 'Realtime',
              icon: 'el-icon-data-analysis'
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
        margin: 10px 0;
        color: #ccc;
      }
      .router-link-active{
        color: #2A88F6;
      }
    }
  }
</style>
