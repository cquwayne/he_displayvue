<template>
  <div class="RuleNav">
    <router-link v-for="item in navList" :key="item.index"
     :to="{name: item.name}">
      {{item.title}}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'RuleNav',
  data () {
    return {
      navList: [
        {
          name: 'Rule',
          title: '规则管理'
        },
        {
          name: 'Metadata',
          title: '规则元管理'
        },
        {
          name: 'Chain',
          title: '规则链管理'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .RuleNav{
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