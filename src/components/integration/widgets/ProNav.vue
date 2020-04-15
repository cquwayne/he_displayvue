<template>
  <div class="ProNav">
    <router-link v-for="item in navList" :key="item.index"
     :to="{name: item.name}">
      {{item.title}}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'ProNav',
  data () {
    return {
      navList: [
        {
          name: 'Process',
          title: '工艺过程管理'
        },
        {
          name: 'Bind',
          title: '模型绑定管理'
        },
        {
          name: 'Diagram',
          title: '数据流图管理'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .ProNav{
    background-color: #eee;
    line-height: 50px;
    a{
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
    }
    .router-link-active{
      text-decoration: underline;
    }
  }
</style>