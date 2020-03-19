<template>
  <div class="PipeTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="输入端">
        <template slot-scope="scope">
          {{ scope.row.input['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="方向">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">
            <el-tag><i class="el-icon-right"></i></el-tag>
          </span>
          <span v-if="scope.row.type === 2">
            <el-tag><i class="el-icon-bottom-right"></i></el-tag>
          </span>
          <span v-if="scope.row.type === 3">
            <el-tag><i class="el-icon-top-right"></i></el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="输出端">
        <template slot-scope="scope">
          {{ scope.row.output['title'] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="warning"
            @click="handlePut(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer 
      title="编辑"
      :with-header="false"
      :visible.sync="drawer"
      :append-to-body="true"
      :size="'50%'"
      :direction="'rtl'">
      <PipeForm :nodeList="nodeList" :pipe="selectPipe"></PipeForm>
    </el-drawer>
  </div>
</template>
<script>
import PipeForm from './PipeForm'
export default {
  name: 'PipeTable',
  components: {
    PipeForm
  },
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
      selectPipe: null,
      drawer: false,
      url: 'http://localhost:8000/api/pipes/'
    }
  },
  methods: {
    handlePut (index, row) {
      this.selectPipe = row
      this.drawer = true
    },
    handleDelete (index, row) {
      this.$axios.delete(this.url, {data: row}).then(res => {
        history.go(0)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .PipeTable{
    font-size: 13px;
    .el-col{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
</style>
