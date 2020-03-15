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
      raycaster: null,
      mouse: null,
      INTERSECTED: null,
      radius: 500,
      theta: 0
    }
  },
  methods: {
    init: function () {
      let container = document.getElementById('container')
      var frustumSize = 1000
      var aspect = window.innerWidth / window.innerHeight
      this.camera = new Three.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000)
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0xf0f0f0)
      var light = new Three.DirectionalLight(0xffffff, 1)
      light.position.set( 1, 1, 1 ).normalize()
      this.scene.add( light )
      var geometry = new Three.BoxBufferGeometry( 60, 60, 60 );
      for ( var i = 0; i < 5; i ++ ) {
        var object = new Three.Mesh( geometry, new Three.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) )
        object.position.x = Math.random() * 800 - 400
        object.position.y = Math.random() * 800 - 400
        object.position.z = Math.random() * 800 - 400
        // object.rotation.x = Math.random() * 2 * Math.PI
        // object.rotation.y = Math.random() * 2 * Math.PI
        // object.rotation.z = Math.random() * 2 * Math.PI
        // object.scale.x = Math.random() + 0.5
        // object.scale.y = Math.random() + 0.5
        // object.scale.z = Math.random() + 0.5
        this.scene.add( object )
      }
      this.mouse = new Three.Vector2()
      this.raycaster = new Three.Raycaster()
      this.renderer = new Three.WebGLRenderer({antialias: true})
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      this.theta += 0.1
      this.camera.position.x =  this.radius * Math.sin( Three.MathUtils.degToRad( this.theta ) )
      this.camera.position.y =  this.radius * Math.sin( Three.MathUtils.degToRad( this.theta ) )
      this.camera.position.z =  this.radius * Math.cos( Three.MathUtils.degToRad( this.theta ) )
      this.camera.lookAt(  this.scene.position )
      this.camera.updateMatrixWorld()
      // find intersections
      this.raycaster.setFromCamera( this.mouse, this.camera )
      var intersects = this.raycaster.intersectObjects(  this.scene.children )
      if ( intersects.length > 0 ) {
        if ( this.INTERSECTED != intersects[ 0 ].object ) {
          if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex )
          this.INTERSECTED = intersects[ 0 ].object
          this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex()
          this.INTERSECTED.material.emissive.setHex( 0xff0000 )
        }
      } else {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex )
        this.INTERSECTED = null
      }
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.init()
    this.animate()
  }
}
</script>
<style scoped>
  #container {
    height: 500px;
  }
</style>
