<template>
  <el-main>
    <h1>铸造工艺知识库</h1>
    <el-table :data="knowledgeList"
            style="text-align: center">
    <el-table-column
      label="工艺条件"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row['conditions']}}
      </template>
    </el-table-column>
    <el-table-column
      label="经验结论"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row['impact']}}
      </template>
    </el-table-column>
    <el-table-column
      label="特征函数"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row['datalist']}}
      </template>
    </el-table-column>
    <el-table-column
      label="环境负荷"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row['envload']}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="155">
      <template slot-scope="scope">
        <el-button size="mini">
          编辑
        </el-button>
        <el-button size="mini">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
</template>

<script>
import api from 'api'
export default {
  name: 'Knowledge',
  data() {
    return {
      knowledgeList: []
    }
  },
  beforeRouteEnter (to, from, next){
    next(vm=> {
      let args = {
        url: 'knowledge/list'
      }
      api.get(args).then(res => {
        vm.knowledgeList = res
      console.log(res)
      })
    })
  }
}
</script>

<style scoped>

</style>
