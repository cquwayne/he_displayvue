<template>
  <el-container class="SceneData">
      <el-header height="150px">
        <SceneBasic :sceneModel="sceneModel"></SceneBasic>
        <el-divider></el-divider>
      </el-header>
      <el-main>
        <div v-for="pojo in elementDataList">
          <el-card :title="pojo['title']">
            <el-tag type="info" size="max">{{pojo['title']}}</el-tag>
            <el-button typw="info" @click="editAttribute(null)">新增{{pojo['title']}}</el-button>
            <el-table :data="pojo['dataList']">
              <el-table-column :label="pojo['title']">
                <template slot-scope="scope">
                  <div v-for="item in scope.row['attributeValue']" :key="item.index">
                    <div v-if="item.indexOf(pojo['title']+'名称') !== -1">
                      {{item.substring(item.lastIndexOf(':')+1)}}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="特征描述">
                <template slot-scope="scope">
                  <div v-for="item in scope.row['attributeValue']" :key="item.index">
                    <div v-if="item.indexOf(pojo['title']+'名称') === -1">
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
        </div>
        <div>
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
        </div>
      </el-main>
    <el-drawer
      class="manageEditDrawer"
      :title="editTitle+'要素'"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'27%'">
      <el-form v-model="postForm" label-position="top">
        <el-form-item v-for="item in postForm['attributeValue']" :key="item.index" :label="item.substring(0,item.lastIndexOf(':'))">
          <div v-if="allMultiKey.indexOf(item.substring(0,item.lastIndexOf(':')))===-1">
            <el-input
              v-for="tmp in noSelectValue" :key="tmp.index"
              v-if="tmp['name']===item.substring(0,item.lastIndexOf(':'))"
              v-model="tmp['presentValue']"
              placeholder="请输入内容"
              clearable
            >
            </el-input>
          </div>
          <div v-else>
            <el-select v-for="tmp in selectValue" :key="tmp.index"
                       v-if="tmp['name']===item.substring(0,item.lastIndexOf(':'))" v-model="tmp['presentValue']">
              <el-option
                v-for="t in tmp['values']"
                :key="t.index"
                :value="t">
              </el-option>
            </el-select>
          </div>
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
export default {
  name: 'SceneModel',
  components: {
    SceneBasic
  },
  data () {
    return {
      sceneModel: {
        id: '',
        title: '',
        parentId: '',
        parent: {},
        processTypeId: '',
        processType: {},
        description: '',
        elementDataList: []
      },
      elementDataList: {
        object: {
          dataList:[],
          title: '工艺对象'
        },
        device: {
          dataList:[],
          title: '设备'
        },
        assist: {
          dataList:[],
          title: '辅料'
        },
        param: {
          dataList:[],
          title: '工艺参数'
        },
        energy: {
          dataList:[],
          title: '能源'
        }
      },
      editTitle: '新增',
      postForm: {
        id: '',
        sceneId: '',
        elementId: '',
        element: null,
        attributeValue: ''
      },
      editDrawer: false,
      allMultiValue: [],
      allMultiKey: [],
      noSelectValue: [],
      selectValue: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let sceneModelId = to.params['sceneModelId']
      let args = {
        url: '/sceneModel/' + sceneModelId
      }
      api.get(args).then(res => {
        vm.sceneModel = res
        vm.sceneModel.elementDataList.forEach(item => {
          item['attributeValue'] = item.attributeValue.split(',')
          if (item['elementId'] === 1) {
            // vm.objectList.push(item)
            // vm.elementDataList['object']['dataList'].push(item)
            vm.elementDataList.object.dataList.push(item)
          } else if (item['elementId'] === 2) {
            // vm.deviceList.push(item)
            vm.elementDataList['device']['dataList'].push(item)
          } else if (item['elementId'] === 3) {
            // vm.assistList.push(item)
            vm.elementDataList['assist']['dataList'].push(item)
          } else if (item['elementId'] === 4) {
            // vm.paramList.push(item)
            vm.elementDataList['param']['dataList'].push(item)
          } else if (item['elementId'] === 5) {
            // vm.energyList.push(item)
            vm.elementDataList['energy']['dataList'].push(item)
          }
        })
      })
      let arg = {
        url: '/attribute/multiValue'
      }
      api.get(arg).then(res => {
        res.forEach(item => {
          let oj = {
            name: item['title'],
            values: item['value'].split(',')
          }
          vm.allMultiValue.push(oj)
          vm.allMultiKey.push(item['title'])
        })
      })
    })
  },
  methods: {
    editAttribute (row) {
      console.log(row)
      this.postForm = {}
      this.selectValue = []
      this.noSelectValue = []
      if (row) {
        this.editTitle = '编辑'
        this.postForm = row
      } else {
        this.editTitle = '新增'
        this.postForm['attributeValue'] = []
        this.postForm['attributeValue'].push('工艺对象名称: ') //这里的工艺对象名称字符串后面必须有个空格
        console.log(this.postForm)
      }
      this.postForm.attributeValue.forEach(item => {
        let tag = item.substring(0, item.lastIndexOf(':'))
        if (this.allMultiKey.indexOf(tag) !== -1) {
          let selectTmp = {
            name: tag,
            values: this.allMultiValue[this.allMultiKey.indexOf(tag)].values,
            presentValue: item.substring(item.lastIndexOf(':') + 1)
          }
          this.selectValue.push(selectTmp)
        } else {
          let noSelectTmp = {
            name: item.substring(0, item.lastIndexOf(':')),
            presentValue: item.substring(item.lastIndexOf(':') + 1)
          }
          this.noSelectValue.push(noSelectTmp)
        }
      })
      this.editDrawer = true
    },
    deleteAttribute (row) {
      this.postForm = {}
      this.postForm = row
      api.delete({url: 'elementData/deleteOne', params: this.id})
    },
    submitAttribute () {
      let ss = ''
      this.noSelectValue.forEach(item => {
        ss = ss + item['name']
        ss = ss + ':'
        ss = ss + item['presentValue']
        ss = ss + ','
      })
      this.selectValue.forEach(item => {
        ss = ss + item['name']
        ss = ss + ':'
        ss = ss + item['presentValue']
        ss = ss + ','
      })
      ss = ss.substring(0, ss.length - 1)
      this.postForm['attributeValue'] = ss
      api.put({url: 'elementData/updateOne', params: this.postForm}).then(res => {
        if (res > 0) {
          history.go(0)
        } else {
          alert('更新失败！')
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
