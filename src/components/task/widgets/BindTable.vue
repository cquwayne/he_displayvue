<template>
  <div class="BindTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="绑定模型">
        <template slot-scope="scope">
          {{ scope.row.node.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="绑定规则链">
        <template slot-scope="scope">
          {{ scope.row.chain.title }}
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot="header">
          <el-button  type="primary" size="mini" @click.native="handleClick('post', {})">
            <i class="el-icon-circle-plus-outline"></i> 添加
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain
            @click="handleClick('put', scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form :model="bindForm">
        <el-form-item>
          <el-select filterable v-model="bindForm.nodeId" placeholder="关联模型">
            <el-option v-for="item in nodeList" :key="item.index"
              :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select filterable v-model="bindForm.chainId" placeholder="关联规则链">
            <el-option v-for="item in chainList" :key="item.index"
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
  name: 'BindTable',
  props: {
    task: {
      type: Object
    },
    table: {
      type: Array
    },
    chainList: {
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
      bindForm: {
        taskId: null,
        chainId: null,
        nodeId: null
      }
    }
  },
  methods: {
    handleClick (type, form) {
      this.editType = type
      this.bindForm = form
      this.drawer = true
    },
    handleEdit () {
      this.bindForm.taskId = this.task.id
      if (this.editType === 'post') {
        this.$axios.post(this.url + 'binds', this.bindForm).then(res => {
          history.go(0)
        })
      } else if (this.editType === 'put') {
        this.$axios.put(this.url + 'binds', this.bindForm).then(res => {
          history.go(0)
        })
      }
    }
  }
}
</script>
