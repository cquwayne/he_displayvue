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
      renderer: null
    }
  },
  methods: {
    init: function () {
      let container = document.getElementById('container')
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0xf0f0f0)
      this.geometry = new Three.Geometry();
      var p1 = new Three.Vector3( 0, 0, 0 );
      var p2 = new Three.Vector3( 50, 0, 50 );
      var p3 = new Three.Vector3( 50, 50, 50 );
      var p4 = new Three.Vector3( 0, 50, 0 );
      //绑定顶点到几何体
      this.geometry.vertices.push(p1, p2, p3, p4);
      //如果需要每个点展示不同颜色，需要给每个顶点添加颜色，也可以通过材质设置统一颜色
      this.geometry.colors = [
          new Three.Color( 0xFF0000 ), 
          new Three.Color( 0x00FF00 ), 
          new Three.Color( 0x0000FF ), 
          new Three.Color( 0xFFFF00 )
      ];
      //如果以点的形式渲染，需要设置点对应材质
      var pointMaterial = new Three.PointsMaterial({
          color: 0xffffff,    //设置颜色，默认 0xFFFFFF
          vertexColors: false, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
          size: 1            //定义粒子的大小。默认为1.0
      });
      //生成点模型
      var points = new Three.Points(this.geometry, pointMaterial);
      this.scene.add(points)
      //如果以线的形式渲染，需要设置线材质
      var lineMaterial = new Three.LineBasicMaterial({
          color: 0xFFFFFF,      //设置颜色，默认 0xFFFFFF
          vertexColors: true,  //设置为true线条会以两点颜色渐变 ---如果该选项设置为true，则color属性失效
          linewidth: 5,        //线宽，window下不生效
      });
      var line = new Three.Line(this.geometry, lineMaterial);
      this.scene.add(line);
      // 创建一个面，参数为几何体顶点的索引
      var face1 = new Three.Face3( 0, 1, 2 );
      //设置这个面的法向量
      face1.normal = new Three.Vector3( 0, 0, -1 );
      //设置各个顶点对应颜色
      face1.vertexColors = [
        new Three.Color(0xFF0000),
        new Three.Color(0x00FF00),
        new Three.Color(0x0000FF),
      ];
      this.geometry.faces.push(face1);
      //设置网格材质，这里设置为Lambert材质为一种不发光材质
      var meshMaterial = new Three.MeshLambertMaterial({
          vertexColors : Three.VertexColors,
          side: Three.DoubleSide
      });
      var mesh = new Three.Mesh(this.geometry, meshMaterial);
      this.scene.add(mesh);
      this.renderer = new Three.WebGLRenderer({antialias: true})
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
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
