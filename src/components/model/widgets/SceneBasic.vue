<template>
  <el-card class="hover SceneBasic">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/modelManage' }">铸造场景模型库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'ModelManage', params: {parentId: sceneModel['parentId']}}">{{sceneModel['parent'] ? sceneModel['parent']['title'] : ''}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'SceneModel', params:{sceneModel: sceneModel['id']}}">{{sceneModel['title']}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>模型描述: {{sceneModel['description']}}</div>
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
