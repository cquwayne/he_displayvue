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
      title: '铸造工艺过程数字孪生验证系统'
    }
  }
}
</script>
<style scoped lang="scss">
  .Header{
    text-align: left;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    color: #ccc;
    padding-left: 20px;
    i {
      font-size: 15px;
    }
  }
</style>
