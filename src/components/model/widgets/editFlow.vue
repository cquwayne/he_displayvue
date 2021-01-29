<template>
    <el-form :model="flowData" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
        <el-form-item label="GUID">
            <el-input disabled v-model="flowData.id"></el-input>
        </el-form-item>
        <el-form-item label="工艺过程名称">
            <el-input v-model="flowData.title"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="flowData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
<!--        <el-form-item label="包含环节">-->
<!--            <div v-for="item in flowData.nodeList" :key="item.index">-->
<!--              <el-tag>-->
<!--                {{item}}-->
<!--              </el-tag>-->
<!--            </div>-->
<!--        </el-form-item>-->
    </el-form>
</template>

<script>
export default {
  name: 'editFlow',
  data () {
    return {
      flowData: {}
    }
  },
  methods: {
    init (data) {
      this.flowData = data
    }
  }
}
</script>
