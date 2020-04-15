<template>
  <div class="Header">
    {{title}}
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '基础制造工艺信息集成系统'
    }
  }
}
</script>
<style scoped lang="scss">
  .Header{
    text-align: left;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #ccc;
    i {
      font-size: 15px;
    }
  }
</style>
