<template>
  <el-container class="SceneDataList">
    <div style="width: 100%">
      <el-divider></el-divider>
      <el-row :gutter="12" class="hover">
        <el-col  :span="15">
          <el-input placeholder="搜索模型" style="margin-left: 45px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info">
            <i class="el-icon-circle-plus-outline"></i>新增模型
          </el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-main>
        <el-table :data="sceneModelList" style="text-align: center">
          <el-table-column
            label="孪生模型名称"
          >
            <template slot-scope="scope">
              {{scope.row['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="上层模型"
          >
            <template slot-scope="scope">
              {{scope.row['parent']['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="铸造类型"
          >
            <template slot-scope="scope">
              {{scope.row['processType']['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="模型描述"
          >
            <template slot-scope="scope">
              {{scope.row['description']}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="getDetails(scope.$index, scope.row)">
                详情
              </el-button>
              <el-button size="mini" @click="editSceneModel(scope.row)">
                编辑
              </el-button>
            </template>
        </el-table-column>
      </el-table>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModelManage',
  data(){
    return {
      sceneModelList: [],
      postSceneModel: fasle,
      postForm: {
        sceneModel :{
          title: '',
          parentId: 1,
          processTypeId: 1,
          description: ''
        }
      }
    }
  },
  beforeRouteEnter(to, from ,next) {
    next(vm => {
      let url = 'http://localhost:8000/sceneModel/list'
      axios.get(url).then(res => {
        vm.sceneModelList = res.data
        console.log(vm.sceneModelList)
      })
    })
  },
  methods: {
    getDetails (index,row) {
      this.$router.push({name: 'SceneModel', params: {sceneModelId: row['id']}})
    },
    editSceneModel(row) {
      if(row) {
        this.postForm.sceneData = row
        this.postForm.sceneData['id'] = row['id']
      }
      this.postSceneModel = true
    }
  }
}
</script>

<style scoped lang="scss">
  .SceneDataList{
    height: 100%;
    max-height: 100%;
    .input-with-select{
      border-style: ridge;
      border-color: cornflowerblue;
      border-width: 5px
    }
    .hover {
      margin-top: 20px;
      padding: 0
    }
    .title{
      display: inline-block;
      font-weight: bolder;
      font-size: large;
      padding: 0 10px;
      margin: 0 0 0 10px;
    }
    .buttonType{
      display: inline-block;
      font-weight: bolder;
      font-size: larger;
      margin: 0 0 0 10px;
      /*margin: 10px 20px 20px 370px;*/
    }
  }
</style>
