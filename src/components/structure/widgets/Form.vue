<template>
  <div class="Form">
    <el-form :model="editForm">
      <el-form-item v-if="element === 'node'">
        <el-input v-model="editForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'point'">
        <el-input v-model="editForm.parentId" placeholder="所属结点"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'point'">
        <el-input v-model="editForm.x" placeholder="x坐标值"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'point'">
        <el-input v-model="editForm.y" placeholder="y坐标值"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'pipe'">
        <el-input v-model="editForm.inputId" placeholder="输入坐标"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'pipe'">
        <el-input v-model="editForm.outputId" placeholder="输出坐标"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'hyperlink'">
        <el-input v-model="editForm.pointId" placeholder="关联坐标"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'hyperlink'">
        <el-input v-model="editForm.nodeId" placeholder="关联结点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  props: {
    form: {
      type: Object,
      default: null
    },
    element: {
      type: String,
      default: "node"
    }
  },
  watch: {
    form (newVal, oldVal) {
      if (newVal != null) {
        this.editForm = newVal
      }
    }
  },
  computed: {
    url () {
      return this.$store.state.url + 'structure/' + this.element + 's'
    }
  },
  data () {
    return {
      editForm: {
        title: null
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.editForm.id) {
        this.$axios.put(this.url, this.editForm).then(res => {
          history.go(0)
        })
      } else {
        this.$axios.post(this.url, this.editForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .Form{

  }
</style>
