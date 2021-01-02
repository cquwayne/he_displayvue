<template>
  <el-container class="SceneDataList">
    <div style="width: 100%">
      <el-divider></el-divider>
      <el-row :gutter="12" class="hover">
        <el-col  :span="15">
          <el-input placeholder="搜索工艺场景" style="margin-left: 45px">
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
            </template>
          </el-table-column>
          <el-table-column
            label="上层模型"
          >
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            label="铸造类型"
          >
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            label="模型描述"
          >
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini">
                详情
              </el-button>
              <el-button size="mini">
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
// import api from 'api'
export default {
  name: 'ModelManage',
  data(){
    return {
      sceneModelList: []
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
