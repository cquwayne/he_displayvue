<template>
  <el-card class="hover SceneBasic">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/modelManage' }">铸造场景模型库</el-breadcrumb-item>
<!--        <el-breadcrumb-item :to="{name: 'ModelManage', params: {parentId: sceneModel['parentId']}}">{{sceneModel['parent'] ? sceneModel['parent']['title'] : ''}}</el-breadcrumb-item>-->
        <el-breadcrumb-item :to="{name: 'SceneModel', params:{sceneModel: sceneModel['id']}}">{{sceneModel['title']}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      模型名称：{{sceneModel['title']}}
      上层模型：{{sceneModel['parent']['title']}}
      工艺类型：{{sceneModel['processType']['title']}}
      操作者：{{sceneModel['operator']}}
      时间：{{sceneModel['executionTime']}}
      地点：{{sceneModel['region']}}
      数据来源：{{sceneModel['dataSource']}}
      模型描述: {{sceneModel['description']}}
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'SceneBasic',
  props: {
    sceneModel: {
      type: Object,
      default () {
        return {
          parent: {
            title: ''
          }
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
