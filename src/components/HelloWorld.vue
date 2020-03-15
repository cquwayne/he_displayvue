<template>
  <div class="Home">
    <button @click="paint">划线</button>
    <Graph ref="graph" :graph="graph" :isRoot="true"></Graph>
  </div>
</template>

<script>
import Graph from './Graph'
export default {
  components: {
    Graph
  },
	data () {
		return {
      url: 'http://localhost:8000/api/cubes/1',
      graph: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.graph = res.data
      })
    })
  },
  methods: {
    paint () {
      this.$refs.graph.paint()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Home{
    height: 100%;
    width: 100%;
  }
</style>

