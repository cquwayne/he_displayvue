<template>
  <el-container id="app">
    <el-header id="header">
      <Header></Header>
    </el-header>
    <el-container id="container">
      <el-aside id="navigation">
        <Navigation></Navigation>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Navigation from './components/widgets/Navigation'
import Header from './components/widgets/Header'
export default {
  name: 'App',
  components: {
    Navigation,
    Header
  }
}
</script>

<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
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
#header{
  background: #1C2327;
  height: 50px!important;
}
#navigation{
  background: #373D41;
  height: 100%!important;
  max-width: 150px!important;
}
#container{
  height: calc(100% - 50px)
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
