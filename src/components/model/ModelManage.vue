<template>
  <el-container class="SceneDataList">
    <div style="width: 100%">
      <el-divider></el-divider>
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input placeholder="搜索模型" style="margin-left: 45px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info" @click="editSceneModel(null)">
            <i class="el-icon-circle-plus-outline"></i>新增模型
          </el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-main>
        <el-table :data="sceneModelList" style="text-align: center">
          <el-table-column
            label="孪生模型名称"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="上层模型"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['parent']['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="工艺类型"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['processType']['title']}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作者"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['operator']}}
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['executionTime']}}
            </template>
          </el-table-column>
          <el-table-column
            label="地点"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['region']}}
            </template>
          </el-table-column>
          <el-table-column
            label="数据来源"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['dataSource']}}
            </template>
          </el-table-column>
          <el-table-column
            label="模型描述"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row['description']}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="155">
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
    <el-drawer
      :title="editTitle+'场景模型'"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :before-close="cleanUnsaved"
      :size="'27%'"

    >
      <el-form v-model="postForm" label-position="left">
        <el-form-item label="孪生模型名称">
          <el-input v-model="postForm.title" style="width: 70%" autosize></el-input>
        </el-form-item>
        <el-form-item label="上层模型">
          <el-select v-model="postForm.parentId">
            <el-option
              v-for="item in sceneModelList"
              :key="item.index"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工艺类型">
          <el-select v-model="postForm.processTypeId">
            <el-option
              v-for="item in processTypeList"
              :key="item.index"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作者">
          <el-input v-model="postForm.operator" style="width: 77%" autosize></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="postForm.executionTime" style="width: 77%" autosize></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="postForm.region" style="width: 77%" autosize></el-input>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-input v-model="postForm.dataSource" style="width: 77%" autosize></el-input>
        </el-form-item>
        <el-form-item label="模型描述">
          <el-input v-model="postForm.description" style="width: 77%" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitSceneModel">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
</template>

<script>
import api from 'api'
export default {
  name: 'ModelManage',
  data () {
    return {
      sceneModelList: [],
      processTypeList: [],
      postForm: {
        id: '',
        title: '',
        parentId: 1,
        processTypeId: 1,
        operator: '',
        executionTime: '',
        region: '',
        dataSource: '',
        description: ''
      },
      editDrawer: false,
      editTitle: '新增'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let args = {
        url: 'sceneModel/list'
      }
      api.get(args).then(res => {
        vm.sceneModelList = res
      })
      api.get({url: 'processType/list'}).then(res => {
        vm.processTypeList = res
      })
    })
  },
  methods: {
    getDetails (index, row) {
      this.$router.push({name: 'SceneModel', params: {sceneModelId: row['id']}})
    },
    editSceneModel (row) {
      if (row) {
        this.editTitle = '编辑'
        this.postForm = row
        this.postForm['id'] = row['id']
      } else {
        this.editTitle = '新增'
      }
      this.editDrawer = true
    },
    submitSceneModel(){
      if (this.postForm.id) {
        api.put({url: 'sceneModel/updateOne', params: this.postForm}).then(res => {
          if (res > 0) {
            history.go(0)
          } else {
            alert('更新失败！')
          }
        })
      } else {
        api.post({url: 'sceneModel/insertOne', params: this.postForm}).then(res => {
          if (res > 0) {
            history.go(0)
          } else {
            alert('新增失败！')
          }
        })
      }
    },
    cleanUnsaved(){
      this.postForm = {}
      this.editDrawer = false
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
    }
  }
</style>
