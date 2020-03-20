<template>
  <div class="RuleTable Table">
    <h3><i class="el-icon-coin"></i> &nbsp;规则库</h3>
    <el-table
      :data="table.filter(data => !search || data.label.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column sortable width="100"
        label="规则编号">
        <template slot-scope="scope">
          {{ 'R-' + scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入规则搜索"/>
        </template>
        <template slot-scope="scope">
          {{ scope.row.label }}
        </template>
      </el-table-column>
      <el-table-column
        label="规则内容">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button  type="primary" size="mini" @click="handleClick('post', {})">
            <i class="el-icon-circle-plus-outline"></i> 添加
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleClick('put', scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form :model="ruleForm">
        <el-form-item>
          <el-input v-model="ruleForm.label" placeholder="规则名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleForm.value" placeholder="规则内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'RuleTable',
  props: {
    table: {
      type: Array
    }
  },
  data () {
    return {
      search: '',
      editType: 'post',
      drawer: false,
      url: this.$store.state.url,
      ruleForm: {
        label: null,
        value: null
      }
    }
  },
  methods: {
    handleClick (type, form) {
      this.editType = type
      this.ruleForm = form
      this.drawer = true
    },
    handleEdit () {
      if (this.editType === 'post') {
        this.$axios.post(this.url + 'rules', this.ruleForm).then(res => {
          history.go(0)
        })
      } else if (this.editType === 'put') {
        this.$axios.put(this.url + 'rules', this.ruleForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
