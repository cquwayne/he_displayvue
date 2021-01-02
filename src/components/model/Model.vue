<template>
  <div class="model">
    <router-view ></router-view>
  </div>
</template>

<script>
  // import api from 'api'
  export default {
      name: "Model",
    data () {
      return {
        sceneModelList: []
      }
    }
    // beforeRouteEnter (to, from, next) {
    //   let args = {
    //     url: '/sceneModel/list'
    //   }
    //   api.get(args).then(res => {
    //     vm.sceneModelList = res
    //   })
    // }
  }
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
