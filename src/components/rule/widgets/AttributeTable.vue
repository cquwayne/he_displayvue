<template>
  <div class="AttributeTable Table">
    <h3><i class="el-icon-coin"></i> &nbsp;规则实例库</h3>
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column :filters="filters" :filter-method="filterHandler"
        label="所属规则">
        <template slot-scope="scope">
          {{ scope.row.rule.label }}
        </template>
      </el-table-column>
      <el-table-column
        label="实例编号">
        <template slot-scope="scope">
          {{ 'R-' + scope.row.rule.id + '-I-' + scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入实例搜索"/>
        </template>
        <template slot-scope="scope">
          {{ scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column
        label="实例值">
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
      <el-form :model="baseForm">
        <el-form-item>
          <el-select v-model="baseForm.ruleId" placeholder="所属规则">
            <el-option v-for="item in ruleList" :key="item.index"
              :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="baseForm.title" placeholder="实例名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="baseForm.value" placeholder="实例值"></el-input>
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
  name: 'AttributeTable',
  props: {
    table: {
      type: Array
    },
    ruleList: {
      type: Array
    }
  },
  watch: {
    ruleList (newVal, oldVal) {
      this.filters = []
      if (newVal instanceof Array) {
        newVal.forEach(item => {
          this.filters.push({text: item.label, value: item.id})
        })
      }
    }
  },
  data () {
    return {
      filters: [],
      search: '',
      editType: 'post',
      drawer: false,
      url: this.$store.state.url,
      baseForm: {
        label: null,
        value: null
      }
    }
  },
  methods: {
    filterHandler(value, row, column) {
      return row.rule.id === value
    },
    handleClick (type, form) {
      this.editType = type
      this.baseForm = form
      this.drawer = true
    },
    handleEdit () {
      if (this.editType === 'post') {
        this.$axios.post(this.url + 'attributes', this.baseForm).then(res => {
          history.go(0)
        })
      } else if (this.editType === 'put') {
        this.$axios.put(this.url + 'attributes', this.baseForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .AttributeTable{
  }
</style>
