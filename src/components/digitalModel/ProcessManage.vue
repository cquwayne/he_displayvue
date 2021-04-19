<template>
  <el-main>
    <el-row>
      <el-col :span="16">
        <h1>铸造工艺过程管理</h1>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" style="margin-top: 15px;margin-left: 100px">创建铸造工艺过程</el-button>
      </el-col>
    </el-row>
    <el-table :data="digitalModelList" style="text-align: center;margin-left: 10px">
      <el-table-column
        label="工艺过程名称"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['title']}}
        </template>
      </el-table-column>
      <el-table-column
        label="层级代表性"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['hierarchy']}}
        </template>
      </el-table-column>
      <el-table-column
        label="边界划分"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['boundary']}}
        </template>
      </el-table-column>
      <el-table-column
        label="作用范围"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['function']}}
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row['remark']}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="digitalModelDetail(scope.row)" plain type="primary" size="small">
            数字模型
          </el-button>
          <el-button @click="sceneDataDetail(scope.row)" plain type="success" size="small">
            实例数据
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import api from 'api'
export default {
  name: "DigitalModelManage",
  data() {
    return {
      digitalModelList: [],
      sceneId: 34
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let args = {
        url: 'sceneData/list'
      }
      api.get(args).then(res => {
        vm.digitalModelList = res
        console.log(res)
      })
    })
  },
  methods: {
    digitalModelDetail(row) {
      this.$router.push({name:'CreateDigitalModel',params:{sceneDataId:row.id}})
    },
    sceneDataDetail(row) {
      if (row.id==='c355e585-6e81-4404-b178-3260040e77ad') {
        this.sceneId = 34
      } else if (row.id==='9e855cc2-9737-42d8-be63-bcb39b43bb59') {
        this.sceneId = 50
      } else if (row.id==='c0aee694-eda3-41d2-8f83-f8b1a2cb8341') {
        this.sceneId = 68
      } else if (row.id==='e3235f47-5f65-481a-98c7-5590110406b2') {
        this.sceneId = 79
      }
      this.$router.push({name: 'SceneData', params: {sceneDataId: this.sceneId}})
    }
  }
}
</script>

<style scoped>

</style>
