<template>
  <div class="InfoNav">
    <router-link v-for="item in navList" :key="item.index"
     :to="{name: item.name}">
      {{item.title}}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'InfoNav',
  data () {
    return {
      navList: [
        {
          name: 'Information',
          title: '工艺信息管理'
        },
        {
          name: 'InfoRef',
          title: '信息引用管理'
        },
        {
          name: 'AttrRef',
          title: '属性引用管理'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .InfoNav{
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