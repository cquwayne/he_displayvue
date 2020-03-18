<template>
  <div class="Header">
    <i class="el-icon-s-platform"></i>&nbsp; {{title}}
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '工艺资源环境负荷数据采集系统'
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
