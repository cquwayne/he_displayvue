<template>
  <div class="PipeForm">
    <el-form :model="pipeForm" class="demo-form-inline">
      <el-form-item>
        <el-col :span="8">
          <el-select v-model="pipeForm.inputId" placeholder="输入结点">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="pipeForm.outputId" placeholder="输出结点">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="pipeForm.type">
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
    pipe: {
      type: Object,
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
        type: null
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$axios.post(this.url, this.pipeForm).then(res => {
        history.go(0)
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
