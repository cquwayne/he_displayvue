<template>
  <div>
    <h1>铸造工艺场景实例数据库</h1>
    <el-divider></el-divider>
    <el-main>
      <el-table
        :data="sceneDataList"
        style="width: 100%"
      >
        <el-table-column
          label="工艺场景名称"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="工艺类型"
          width="110"
          align="center">
          <template slot-scope="scope">
            {{scope.row['category']['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="主料与辅料"
          align="center"
        >
          <template slot-scope="scope">
            <div v-for="item in scope.row['inputFrameDataList'][0]['materialDataList']" :key="item.index" class="text item">
              {{item['material']?item['material']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备"
          align="center"
        >
          <template slot-scope="scope" v-if="scope.row['inputFrameDataList']">
            <div v-for="item in scope.row['inputFrameDataList'][0]['deviceDataList']" :key="item.index" class="text item">
              {{item['device']?item['device']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row['createdAt'] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="252">
          <template slot-scope="scope">
            <el-button @click="handleDetailDrawer(scope.$index, scope.row)">
              场景数据
            </el-button>
            <el-button @click="handleSceneDrawer(scope.row)" :disabled="postSceneVisible">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ElementManage",
  data() {
    return {
      postSceneVisible: false,
      postCategoryList: [],
      selectScene: {
        category: {}
      },
      categoryId: null,
      searchForm: {
        content: '',
        category: '',
        selectCategoryId: null
      },
      // searchRules: {},
      categoryRes: {
        count: 1,
        currentPage: 1,
        pages: 1,
        pageSize: 1,
        data: [],
        category: {}
      },
      sceneDataList: [],
      postSceneDrawer: false,
      postForm: {
        sceneData: {
          title: '',
          description: '',
          categoryId: 1,
          categoryRootId: 0,
          userId: 1,
          inputFrameData: {
            materialDataList: [],
            deviceDataList: [],
            keyParameterDataList: []
          }
        },
        materialDataList: [],
        deviceDataList: [],
        keyParameterDataList: []
      },
      postSceneRules: {},
      addScene: false,
      addManageData: {
        tableName: '',
        visible: false,
        label: ''
      }
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      let params = {
        categoryId: 5,
        currentPage: 1,
        pageSize: 10
      }
      axios.get('http://localhost:9000/api/category', {params: params}).then(res => {
        vm.categoryRes = res['category']
        vm.sceneDataList = res['data']['data']
      })
    })
  },
  methods: {
    handleDetailDrawer (index, row) {
      this.$router.push({name: 'SceneData', params: {sceneDataId: row['id']}})
    },
  }
}
</script>

<style scoped>

</style>
