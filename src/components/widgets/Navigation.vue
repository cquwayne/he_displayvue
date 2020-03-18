<template>
  <div class="Navigation">
    <div v-for="item in navList" :key="item.index">
      <router-link :to="{name: item.name}">
        <i :class="item.icon"></i> &nbsp; {{item.title}}
      </router-link>
      <el-divider v-if="item.divider"></el-divider>
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
          name: 'ModelIndex',
          icon: 'el-icon-s-grid'
        },
        {
          title: '规则库',
          name: 'RuleIndex',
          icon: 'el-icon-link'
        },
        {
          title: '规则链',
          name: 'ChainIndex',
          icon: 'el-icon-connection'
        },
        {
          title: '任务管理',
          name: 'TaskIndex',
          icon: 'el-icon-data-line'
        },
        {
          title: '数据管理',
          name: 'Data',
          icon: 'el-icon-coin'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .Navigation{
    width: 100%;
    text-align: left;
    color: #fff;
    a{
      font-size: 14px;
      display: block;
      padding: 0 20px;
      margin: 20px 0;
      color: #ccc;
    }
    .router-link-active{
      color: gold;
    }
  }
</style>
