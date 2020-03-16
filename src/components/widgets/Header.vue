<template>
  <div class="Header">
    {{header.title}}
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    header: {
      type: Object,
      default () {
        return {
          title: ''
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .Header{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    background: #000;
  }
</style>
