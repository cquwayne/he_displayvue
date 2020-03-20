<template>
  <div class="ChainTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="规则链名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="规则数量">
        <template slot-scope="scope">
          {{ scope.row.linkList.length }}
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot="header">
          <el-button  type="primary" size="mini" @click.native="handleClick('post', {})">
            <i class="el-icon-circle-plus-outline"></i> 添加
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleClick('put', scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form :model="chainForm">
        <el-form-item>
          <el-input v-model="chainForm.title" placeholder="规则链名称"></el-input>
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
  name: 'ChainTable',
  props: {
    table: {
      type: Array
    }
  },
  data () {
    return {
      editType: 'post',
      drawer: false,
      url: this.$store.state.url,
      chainForm: {
        title: null
      }
    }
  },
  methods: {
    handleClick (type, form) {
      this.editType = type
      this.chainForm = form
      this.drawer = true
    },
    handleEdit () {
      if (this.editType === 'post') {
        this.$axios.post(this.url + 'chains', this.chainForm).then(res => {
          history.go(0)
        })
      } else if (this.editType === 'put') {
        this.$axios.put(this.url + 'chains', this.chainForm).then(res => {
          history.go(0)
        })
      }
    },
    handleSelect (index, row) {
      this.$emit('handleSelect', row)
    }
  }
}
</script>
<style scoped lang="scss">
  .ChainTable{
  }
</style>
