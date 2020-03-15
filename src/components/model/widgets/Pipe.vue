<template>
  <div class="Pipe">
    {{pipe}}
  </div>
</template>
<script>
export default {
  name: 'Pipe',
  props: {
    pipe: {
      type: Object
    }
  }
}
</script>
<style scoped lang="scss">
  .Pipe{
    padding: 20px 0;
    border-bottom: solid 1px #ccc;
  }
</style>
