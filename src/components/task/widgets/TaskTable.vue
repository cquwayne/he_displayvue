<template>
  <div class="TaskTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="关联模型">
        <template slot-scope="scope">
          {{ scope.row.node.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="关联规则">
        <template slot-scope="scope">
          {{ scope.row.bindList.length }} 条
        </template>
      </el-table-column>
      <el-table-column width="150px">
        <template slot="header">
          <el-button  type="primary" size="mini" @click="handleClick('post', {})">
            <i class="el-icon-circle-plus-outline"></i> &nbsp;新建任务
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain
            @click="handleClick('put', scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form :model="taskForm">
        <el-form-item>
          <el-input v-model="taskForm.title" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select filterable v-model="taskForm.nodeId" placeholder="关联模型">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.title" :value="item.id"></el-option>
          </el-select>
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
  name: 'TaskTable',
  props: {
    table: {
      type: Array
    },
    nodeList: {
      type: Array
    }
  },
  data () {
    return {
      editType: 'post',
      drawer: false,
      url: this.$store.state.url,
      taskForm: {
        title: null
      }
    }
  },
  methods: {
    handleClick (type, form) {
      this.editType = type
      this.taskForm = form
      this.drawer = true
    },
    handleEdit () {
      if (this.editType === 'post') {
        this.$axios.post(this.url + 'tasks', this.taskForm).then(res => {
          history.go(0)
        })
      } else if (this.editType === 'put') {
        this.$axios.put(this.url + 'tasks', this.taskForm).then(res => {
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

</style>
