<template>
  <div class="ModelDetail">
    <el-container>
      <el-aside>
        <Pipe></Pipe>
      </el-aside>
      <el-main>
        <Graph :id="id"></Graph>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Graph from './widgets/Graph'
import Pipe from './widgets/Pipe'
export default {
  name: 'ModelDetail',
  components: {
    Graph,
    Pipe
  },
  data () {
    return {
      id: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = to.params['id']
    })
  }
}
</script>
<style scoped lang="scss">
  .ModelDetail{

  }
</style>
