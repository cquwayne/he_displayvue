<template>
  <el-container id="app">
    <el-aside>
      <Navigation></Navigation>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './components/widgets/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
  text-align:center;
  padding: 0;
  margin: 0;
  a{
    text-decoration: none;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  width: 100%;
  height: 100%;
}
#app >.el-aside{
  background: #000;
  height: 100%!important;
  max-width: 150px!important;
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
.block {
  flex: 1;
}
.divider{
  width: 1px;
  background: #eee;
}
</style>
