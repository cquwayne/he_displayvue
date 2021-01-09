<template>
  <div>
    <el-divider></el-divider>
    <div style="width: 100%">
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input style="margin-left: 45px" placeholder="检索数据" v-model="searchContent">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info" @click="" :disabled="searchVisible">
            <i class="fa fa-plus-circle fa-fw"></i> 添加新属性
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-setting"></i>{{tabPaneList[0]}}</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-odometer"></i>{{tabPaneList[1]}}</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i>{{tabPaneList[2]}}</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-data-analysis"></i>{{tabPaneList[3]}}</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-files"></i>{{tabPaneList[4]}}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "Attribute",
        data(){
          return {
            tabPaneList: ['工艺对象','设备','辅料','工艺参数','能源消耗']
          }
        }
    }
</script>

<style scoped>

</style>
