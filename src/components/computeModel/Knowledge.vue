<template>
  <el-main>
    <h1 style="margin-left: 10px">铸造工艺知识库</h1>
    <el-button type="success" style="margin-left: 10px">新增工艺知识</el-button>
    <el-table :data="knowledgeList"
              style="text-align: center;margin-left: 10px">
      <el-table-column
        label=""
        align="center"
        width="50px"
      >IF
      </el-table-column>
      <el-table-column
        label="工艺条件"
        align="center"
      >
        <template slot-scope="scope">
          <div v-html="formatterColumn(scope.row['conditions'])" style="white-space: pre-line"></div>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        align="center"
        width="100px"
      >THEN
      </el-table-column>
      <el-table-column
        label="经验结论"
        align="center"
      >
        <template slot-scope="scope">
          <div v-html="formatterColumn(scope.row['stitle'])" style="white-space: pre-line"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row['stype']===1" @click="computeUnit">
            特征计算单元
          </el-button>
          <el-button>
            编辑
          </el-button>
          <el-button>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="unit" title="特征计算单元" style="top: 27%;left: 17%">
      <el-card>数据项
        <el-tag>废钢消耗</el-tag>
        <el-tag>生铁消耗</el-tag>
        <el-tag>焦炭消耗</el-tag>
      </el-card>
      <el-card>特征函数
        <el-tag>f1(x,y)=x+y</el-tag>
        <el-tag>f2(x,y)=x/y</el-tag>
      </el-card>
      <el-card>计算单元1
        <el-tag>炉料总量: <{<{废钢消耗,生铁消耗},f1>,焦炭消耗},f1></el-tag>
      </el-card>
      <el-card>计算单元2
        <el-tag>焦钢比: <{焦炭消耗,废钢消耗},f2></el-tag>
      </el-card>
      <el-card>计算单元3
        <el-tag>焦铁比: <{焦炭消耗,生铁消耗},f2></el-tag>
      </el-card>
    </el-dialog>
  </el-main>
</template>

<script>
import api from 'api'
export default {
  name: 'Knowledge',
  data() {
    return {
      knowledgeList: [],
      unit: false
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
  },
  methods: {
    computeUnit () {
      this.unit = true
    },
    formatterColumn(cellValue) {
      let value = cellValue.replace('\&', '<br/>')
      return value
    }
  }
}
</script>

<style scoped lang="scss">

</style>
