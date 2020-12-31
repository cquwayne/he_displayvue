<template>
  <div class="model">
    <router-view ></router-view>
  </div>
</template>

<script>
  export default {
      name: "Model",
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
