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
  }
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
