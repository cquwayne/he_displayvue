<template>
    <el-form :model="node" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
        <el-form-item label="GUID">
            <el-input disabled v-model="node.id"></el-input>
        </el-form-item>
        <el-form-item label="工艺场景名称">
            <el-input v-model="node.title"></el-input>
        </el-form-item>
        <el-form-item label="场景描述">
            <el-input v-model="node.sceneData.remark"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-button @click="changToNextLevel">下一层级</el-button>
        <el-button @click="querySceneData" type="success">查看场景实例数据</el-button>
    </el-form>
</template>

<script>
import api from 'api'
export default {
  name: 'editNode',
  data () {
    return {
      node: {},
      sceneData: {},
      sceneId: 34
    }
  },
  methods: {
    async init (sceneData, id) {
      sceneData.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = node
        }
      })
      let args = {
        url: 'sceneData',
        params: {
          id: this.node.id
        }
      }
      await api.get(args).then(res => {
        this.sceneData = res
        console.log(res)
      })
    },
    editAttribute (row, elementId) {},
    deleteAttribute (row) {},
    formatterColumn(cellValue) {
      let value = cellValue.join("\r")
      return value
    },
    changToNextLevel() {
      this.$emit('chang-to-next-level',this.node.id,this.node.sceneDataId)
    },
    querySceneData() {
      if (this.sceneData.id==='c355e585-6e81-4404-b178-3260040e77ad') {
        this.sceneId = 34
      } else if (this.sceneData.id==='9e855cc2-9737-42d8-be63-bcb39b43bb59') {
        this.sceneId = 50
      } else if (this.sceneData.id==='c0aee694-eda3-41d2-8f83-f8b1a2cb8341') {
        this.sceneId = 68
      } else if (this.sceneData.id==='e3235f47-5f65-481a-98c7-5590110406b2') {
        this.sceneId = 79
      } else {
        this.$message.info("暂无相关数据哦~")
        return
      }
      this.$router.push({name: 'SceneData', params: {sceneDataId: this.sceneId}})
      window.location.reload()
    }
  }
}
</script>
