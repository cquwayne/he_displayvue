<template>
  <el-container class="SceneData">
      <el-header height="150px">
        <SceneBasic :sceneModel="sceneModel"></SceneBasic>
        <el-divider></el-divider>
      </el-header>
      <el-main>
        <el-card title="工艺对象">
          <el-tag type="info" size="max">工艺对象</el-tag>
          <el-button typw="info">新增工艺对象</el-button>
          <el-table :data="objectList">
            <el-table-column label="工艺对象">
              <template slot-scope="scope">
                <div v-for="item in scope.row['attributeValue']" :key="item.index">
                  <div v-if="item.indexOf('工艺对象名称') !== -1">
                    {{item.substring(item.lastIndexOf(':')+1)}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="特征描述">
              <template slot-scope="scope">
                <div v-for="item in scope.row['attributeValue']" :key="item.index">
                  <div v-if="item.indexOf('工艺对象名称') === -1">
                    {{item}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="info" @click="editAttribute(scope.row)">修改</el-button>
                <el-button type="info" @click="deleteAttribute(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
<!--        <el-card title="辅料">-->
<!--          <el-tag type="info" size="max">辅料</el-tag>-->
<!--          <el-table :data="assistList">-->
<!--            <el-table-column label="辅料">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('辅料名称') !== -1">-->
<!--                    {{item.substring(item.lastIndexOf(':')+1)}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="特征描述">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('辅料名称') === -1">-->
<!--                    {{item}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="操作">-->
<!--              <el-button type="info">修改</el-button>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-card>-->
<!--        <el-card title="设备">-->
<!--          <el-tag type="info" size="max">设备</el-tag>-->
<!--          <el-table :data="deviceList">-->
<!--            <el-table-column label="设备">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('设备名称') !== -1">-->
<!--                    {{item.substring(item.lastIndexOf(':')+1)}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="特征描述">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('设备名称') === -1">-->
<!--                    {{item}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="操作">-->
<!--              <el-button type="info">修改</el-button>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-card>-->
<!--        <el-card title="工艺参数">-->
<!--          <el-tag type="info" size="max">工艺参数</el-tag>-->
<!--          <el-table :data="paramList">-->
<!--            <el-table-column label="工艺参数">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('工艺参数名称') !== -1">-->
<!--                    {{item.substring(item.lastIndexOf(':')+1)}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="特征描述">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('工艺参数名称') === -1">-->
<!--                    {{item}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="操作">-->
<!--              <el-button type="info">修改</el-button>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-card>-->
<!--        <el-card title="能源消耗">-->
<!--          <el-tag type="info" size="max">能源消耗</el-tag>-->
<!--          <el-table :data="energyList">-->
<!--            <el-table-column label="能源">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('能源名称') !== -1">-->
<!--                    {{item.substring(item.lastIndexOf(':')+1)}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="特征描述">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-for="item in scope.row['attributeValue']" :key="item.index">-->
<!--                  <div v-if="item.indexOf('能源名称') === -1">-->
<!--                    {{item}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="操作">-->
<!--              <el-button type="info">修改</el-button>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-card>-->
      </el-main>
    <el-drawer
      class="manageEditDrawer"
      title="编辑要素"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'27%'">
      <el-form v-model="postForm" label-position="top">
        <el-form-item v-for="item in postForm['attributeValue']" :key="item.index" :label="item.substring(0,item.lastIndexOf(':'))">
          <el-input v-if="allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))===-1" clearable></el-input>
<!--          {{allMultiValue[allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))]}}-->
<!--          {{allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))}}-->
          {{
            allMultiValue[allMultiKey.indexOf(item.substring(0, item.lastIndexOf(':')))]
          }}
<!--          <el-select v-else>-->
<!--            <el-option v-for="s in allMultiValue[allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))].substring(item.lastIndexOf(':')).split(','))">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitAttribute">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
</template>

<script>
import api from 'api'
import SceneBasic from './widgets/SceneBasic'
import index from "../../router";
export default {
  name: 'SceneModel',
  components: {
    SceneBasic
  },
  data() {
    return {
      sceneModel: {
        title: '',
        parentId: '',
        parent: {},
        processTypeId: '',
        processType: {},
        description: '',
        elementDataList: []
      },
      objectList: [],
      deviceList: [],
      assistList: [],
      paramList: [],
      energyList: [],
      postForm: {},
      editDrawer: false,
      allMultiValue: [],
      allMultiKey: [],
      rowValue: [],
      selectValue: [{
        name: '',
        value: [],
        presentValue: ''
      }]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let sceneModelId = to.params['sceneModelId']
      let args = {
        url: '/sceneModel/' + sceneModelId
      }
      api.get(args).then(res => {
        vm.sceneModel = res
        vm.sceneModel.elementDataList.forEach(item => {
          item['attributeValue'] = item.attributeValue.split(',')
          if(item['elementId'] === 1) {
            vm.objectList.push(item)
          } else if (item['elementId'] === 2) {
            vm.deviceList.push(item)
          } else if (item['elementId'] === 3) {
            vm.assistList.push(item)
          } else if (item['elementId'] === 4) {
            vm.paramList.push(item)
          } else if (item['elementId'] === 5) {
            vm.energyList.push(item)
          }
        })
      })
      let arg = {
        url: '/attribute/multiValue'
      }
      api.get(arg).then(res => {
        res.forEach(item => {
          vm.allMultiValue.push(item['title']+':'+item['value'])
          vm.allMultiKey.push(item['title'])
        })
      })
    })
  },
  methods: {
    editAttribute(row){
      this.postForm = {}
      if (row) {
        this.postForm = row
        row.attributeValue.forEach(item => {
          if (this.allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))!==-1) {
            let selectTmp = {
              name: item.substring(0,item.lastIndexOf(':')),
              value: this.allMultiValue[this.allMultiKey.indexOf(item.substring(0, item.lastIndexOf(':')))].split(','),
              presentValue: item.substring(item.lastIndexOf(':')+1)
            }
            this.selectValue.push(selectTmp)
          }
        })
        console.log(this.selectValue)
      }

      this.editDrawer = true
    },
    deleteAttribute(row){

    },
    submitAttribute(row){

    }

  }
}
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
