<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
  text-align:center;
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  width: 100%;
  height: 100%;
}
.el-container{
  padding: 0!important;
  .el-aside, .el-main{
    padding: 0!important;
    margin: 0!important;
  }
  .el-aside{
    max-height: 100% !important;
    height: 100%!important;
  }
}
.el-drawer{
  padding: 20px !important;
}
</style>
