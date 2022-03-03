<template>
  <div class="Header">
    <div style="float: left; margin-right: 10px; margin-top: 1px">
    <el-avatar :size="47" src="https://www.cqu.edu.cn/Sites/CQUmain/Themes/Default/Images/logo.png"></el-avatar>
    <!--<el-avatar :size="47" src="static/image/CQUlogo1.png"></el-avatar>-->
    </div>
    {{title}}
    <!--<div style="float: right; margin-top: -25px">-->
    <!--  <h1>CQU</h1>-->
    <!--</div>-->
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '铸造工艺数字孪生环境影响评价支持系统'
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
