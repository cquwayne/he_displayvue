<template>
  <div class="NodeForm">
    <el-form :model="nodeForm">
      <el-form-item>
        <el-input v-model="nodeForm.label" placeholder="模型标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'NodeForm',
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default: null
    }
  },
  watch: {
    editable (newVal, oldVal) {
      if (newVal) {
        this.nodeForm = this.node
      } else {
        this.nodeForm = {}
      }
    },
    node (newVal, oldVal) {
      if (newVal != null) {
        this.nodeForm = newVal
      }
    }
  },
  data () {
    return {
      url: 'http://localhost:8000/api/nodes/',
      nodeForm: {
        title: null
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.editable) {
        this.$axios.put(this.url, this.nodeForm).then(res => {
          history.go(0)
        })
      } else {
        this.$axios.post(this.url, this.nodeForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .NodeForm{

  }
</style>
