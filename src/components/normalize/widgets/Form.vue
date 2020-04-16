<template>
  <div class="Form">
    <el-form :model="editForm">
      <el-form-item v-if="element === 'metadata'">
        <el-input v-model="editForm.title" placeholder="规则元名称"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'metadata'">
        <el-input v-model="editForm.value" placeholder="规则元值"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'rule'">
        <el-input v-model="editForm.title" placeholder="规则名称"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'rule'">
        <el-input v-model="editForm.value" placeholder="规则值"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'rule'">
        <el-input v-model="editForm.metadataId" placeholder="关联规则元"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'chain'">
        <el-input v-model="editForm.leftId" placeholder="规则链左规则"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'chain'">
        <el-input v-model="editForm.rightId" placeholder="规则链右规则"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'chain'">
        <el-input v-model="editForm.attributeId" placeholder="规则链所属属性"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'attribute'">
        <el-input v-model="editForm.informationId" placeholder="所属信息"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'attribute'">
        <el-input v-model="editForm.title" placeholder="属性名称"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'attribute'">
        <el-input v-model="editForm.value" placeholder="属性值"></el-input>
      </el-form-item>
      <el-form-item v-if="element === 'information'">
        <el-input v-model="editForm.title" placeholder="工艺信息名称"></el-input>
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
      return this.$store.state.url + 'normalize/' + this.element + 's'
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
