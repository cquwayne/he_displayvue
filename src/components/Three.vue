<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
export default {
  name: 'ThreeTest',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      geometry: null,
      material: null,
      radius: 500,
      theta: 0,
      url: 'http://localhost:8000/api/cubes/1',
      graph: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.graph = res.data
        vm.paint()
      })
    })
  },
  methods: {
    paint () {
      this.init()
      this.animate()
    },
    init: function () {
      let container = document.getElementById('container')
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      this.material = new Three.MeshNormalMaterial()
      this.geometry = new Three.BoxGeometry(0.02, 0.02, 0.02)
      let x = -0.2
      let y = 0.2
      let z = 0
      let size = 0
      let mesh = new Three.Mesh(this.geometry, this.material)
      mesh.position.x = x
      mesh.position.y = y
      mesh.position.z = z
      console.log(this.graph['title'])
      this.scene.add(mesh)
      if (this.graph['innerCubeList'] !== null) {
        size = this.graph['innerCubeList'].length
      }
      this.dag(this.graph, x, y, z, size)
      this.renderer = new Three.WebGLRenderer({antialias: true})
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    dag (cube, x, y, z, size) {
      if (cube === null) {
        return
      }
      y = y - 0.1
      let innerList = cube['innerCubeList']
      if (innerList !== null && innerList !== undefined) {
        let baseIx = x - 0.05 * innerList.length / 2
        if (innerList.length % 2 === 1) {
          baseIx = baseIx + 0.03
        }
        let baseIy = y - 0.02 * innerList.length / 2
        let baseIz = z + 0.05 * innerList.length / 2
        for (let i = 0; i < innerList.length; i++) {
          let mesh = new Three.Mesh(this.geometry, this.material)
          let iX = baseIx + 0.05 * i
          let iY = baseIy + 0.02 * i
          let iZ = baseIz - 0.05 * i
          mesh.position.x = iX
          mesh.position.y = iY
          mesh.position.z = iZ
          console.log(innerList[i]['title'])
          this.scene.add(mesh)
          if (innerList[i]['innerCubeList'] !== undefined) {
            size = innerList[i]['innerCubeList'].length
          }
          this.dag(innerList[i], iX, iY, iZ, size)
        }
      }
      let nextList = cube['nextCubeList']
      if (nextList !== null && nextList !== undefined) {
        let baseX = x + 0.1 * (size + 1)
        let baseY = y + 0.1
        for (let i = 0; i < nextList.length; i++) {
          let mesh = new Three.Mesh(this.geometry, this.material)
          let nX = baseX
          let nY = baseY
          let nZ = z
          mesh.position.x = nX
          mesh.position.y = nY
          mesh.position.z = nZ
          this.scene.add(mesh)
          console.log(nextList[i]['title'])
          this.dag(nextList[i], nX, nY, nZ, size)
        }
      }
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      // this.mesh.rotation.x += 0.01
      // this.mesh.rotation.y += 0.02
      // this.theta += 0.1
      // this.camera.position.x =  this.radius * Math.sin( Three.MathUtils.degToRad( this.theta ) )
      // this.camera.position.y =  this.radius * Math.sin( Three.MathUtils.degToRad( this.theta ) )
      // this.camera.position.z =  this.radius * Math.cos( Three.MathUtils.degToRad( this.theta ) )
      // this.camera.lookAt(  this.scene.position )
      // this.camera.updateMatrixWorld()
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
<style scoped>
  #container {
    height: 600px;
  }
</style>
