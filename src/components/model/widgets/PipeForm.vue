<template>
  <div class="PipeForm">
    <el-form :model="pipeForm" class="demo-form-inline">
      <el-form-item>
        <el-col :span="10">
          <el-select v-model="pipeForm.inputId" placeholder="输入结点">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-select v-model="pipeForm.outputId" placeholder="输出结点">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="pipeForm.direction">
          <el-radio :label="1">连接同层级 <i class="el-icon-right"></i></el-radio>
          <el-radio :label="2">连接子层级 <i class="el-icon-bottom-right"></i></el-radio>
          <el-radio :label="3">连接父层级 <i class="el-icon-top-right"></i></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">添加管道</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'PipeForm',
  props: {
    nodeId: {
      type: String,
      default: null
    },
    pipe: {
      type: Object,
      default: null
    },
    pipeList: {
      type: Array,
      default: null
    },
    nodeList: {
      type: Array
    }
  },
  watch: {
    pipe (newVal, oldVal) {
      if (newVal != null) {
        this.pipeForm = newVal
      }
    }
  },
  data () {
    return {
      url: 'http://localhost:8000/api/pipes/',
      pipeForm: {
        inputId: null,
        outputId: null,
        direction: null,
        nodeId: null
      }
    }
  },
  methods: {
    handleSubmit () {
      this.handlePipeBatch()
      this.pipeForm.nodeId = this.nodeId
      this.$axios.post(this.url, this.pipeForm).then(res => {
        history.go(0)
      })
    },
    handlePipeBatch () {
      let records = []
      if (this.pipeList != null && this.pipeList.length > 0) {
        this.pipeList.forEach(item => {
          if (parseInt(item.nodeId) !== parseInt(this.nodeId)) {
            item.nodeId = this.nodeId
            records.push(item)
          }
        })
      }
      this.$axios.post(this.url + 'list', records).then(res => {
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .PipeForm{
    text-align: left;
    padding: 0 20px;
  }
</style>
