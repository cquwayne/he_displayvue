<template>
    <el-form :model="sceneData" ref="dataForm" label-width="97px">
        <el-form-item label="GUID">
            <el-input disabled v-model="sceneData.id"></el-input>
        </el-form-item>
        <el-form-item label="工艺过程名称">
            <el-input v-model="sceneData.title"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="sceneData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="包含场景">
            <div v-for="item in sceneData.nodeList" :key="item.index">
               {{item.title}}
            </div>
        </el-form-item>
      <el-button @click="changeToFrontLevel">上一层级</el-button>
    </el-form>
</template>

<script>
export default {
  name: 'editDigitalModel',
  data () {
    return {
      sceneData: {}
    }
  },
  methods: {
    init (sceneData) {
      this.sceneData = sceneData
    },
    changeToFrontLevel() {
      this.$emit('chang-to-front-level')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
