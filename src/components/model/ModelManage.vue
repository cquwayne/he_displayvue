<template>
  <el-container class="SceneDataList">
    <div style="margin:0 6px">
      <el-divider></el-divider>
      <el-row :gutter="12" class="hover">
        <el-col  :span="15">
          <el-input placeholder="搜索工艺场景">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info" @click="">
            <i class="el-icon-circle-plus-outline"></i>新增模型
          </el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </el-container>
</template>

<script>
    export default {
        name: "ModelManage"
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
