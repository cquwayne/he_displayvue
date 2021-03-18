<template>
  <el-main>
    <h1>铸造工艺场景实例库</h1>
    <el-table :data="processEntityList"
              style="text-align: center">
      <el-table-column
        label="实例编号"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['id']}}
        </template>
      </el-table-column>
      <el-table-column
        label="实例名称"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['title']}}
        </template>
      </el-table-column>
      <el-table-column
        label="实例描述"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['remark']}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="155">
        <template slot-scope="scope">
          <el-button size="mini" @click="getMore()">
            详情
          </el-button>
          <el-button size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="more">
      场景实例
    </el-dialog>
  </el-main>
</template>

<script>
import api from 'api'
export default {
  name: 'ProcessManage',
  data() {
    return {
      processEntityList: [],
      more: false
    }
  },
  beforeRouteEnter (to, from, next){
    next(vm=> {
      let args = {
        url: 'processEntity/list'
      }
      api.get(args).then(res => {
        vm.processEntityList = res
        console.log(res)
      })
      let arg = {
        url: 'modelEntity/list'
      }
      api.get(arg).then(res => {
        vm.modelEntity = res
      })
    })
  },
  methods: {
    getMore() {
      this.more = true
    }
  }
}
</script>

<style scoped>

</style>
