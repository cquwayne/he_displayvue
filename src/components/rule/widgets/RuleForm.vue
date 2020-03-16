<template>
  <div class="RuleForm">
    <el-form :model="ruleForm">
      <el-form-item>
        <el-input v-model="ruleForm.title" placeholder="规则名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm.style">
          <el-radio :label="ruleStyle.initial">缺省值</el-radio>
          <el-radio :label="ruleStyle.range">取值范围</el-radio>
          <el-radio :label="ruleStyle.type">数据类型</el-radio>
          <el-radio :label="ruleStyle.unit">数据单位</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.style === ruleStyle.initial">
        <el-input v-model="ruleForm.initial.value" placeholder="缺省值"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.style === ruleStyle.range">
        <el-col :span="6">
          <el-input v-model="ruleForm.range.min" placeholder="最小值"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input v-model="ruleForm.range.max" placeholder="最大值"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit" v-if="editFlag === postFlag">
          添加规则
        </el-button>
        <el-button size="mini" type="primary" @click="handleSubmit" v-if="editFlag === putFlag">
          更新规则
        </el-button>
        <el-button size="mini" type="danger" v-if="editFlag === putFlag">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'RuleForm',
  computed: {
    ruleStyle () {
      return {
        initial: 1,
        range: 2,
        type: 3,
        unit: 4,
      }
    }
  },
  data () {
    return {
      url: this.$store.state.url,
      ruleForm: {
        style: 1,
        initial: {},
        range: {},
        type: {},
        unit: {}
      },
      postFlag: 0,
      putFlag : 1,
      editFlag: 0
    }
  },
  methods: {
    updateForm (rule) {
      if (rule === null) {
        this.ruleForm = {style: this.ruleStyle.initial}
        this.editFlag = this.postFlag
      } else {
        this.editFlag = this.putFlag
        this.ruleForm = rule
      }
    },
    handleSubmit () {
      if (this.editFlag === this.postFlag) {
        this.$axios.post(this.url + 'rules', this.ruleForm).then(res => {
          history.go(0)
        })
      } else if (this.editFlag === this.putFlag) {
        this.$axios.put(this.url + 'rules', this.ruleForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .RuleForm{
    padding: 20px;
  }
</style>
