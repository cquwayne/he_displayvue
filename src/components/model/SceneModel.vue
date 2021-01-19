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
            <el-button typw="info" @click="editAttribute(null,pojo['elementId'])">新增{{pojo['title']}}</el-button>
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
                  <el-button type="info" @click="editAttribute(scope.row,scope.row.elementId)">修改</el-button>
                  <el-button type="info" @click="deleteAttribute(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-main>
    <el-drawer
      class="manageEditDrawer"
      :title="editTitle+'要素'"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :before-close="cleanUnsaved"
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
        <div v-for="att in addAttributes" :key="att.index">
          <el-form-item :label="att.title">
            <div v-if="att.value === null">
              <el-col :span="20">
                <el-input v-model="att.description" placeholder="请填写"></el-input>
              </el-col>
            </div>
            <div v-else>
              <el-col :span="20">
                <el-select v-model="att.description" placeholder="请填写">
                  <el-option
                    v-for="tt in att['value'].split('，')"
                    :key="tt.index"
                    :value="tt">
                  </el-option>
                </el-select>
              </el-col>
            </div>
            <el-col :span="4">
              <el-button size="small" type="info" icon="el-icon-delete" @click="deleteItem(att)"></el-button>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item>
          <el-tag type="info">添加属性</el-tag>
          <el-select v-model="currentKey" placeholder="请选择需要添加的属性">
            <el-option
              v-for="es in currentAttributes"
              :key="es.index"
              :label="es.title"
              :value="es"
            >
            </el-option>
          </el-select>
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
        operator: '',
        executionTime: '',
        region: '',
        dataSource: '',
        description: '',
        elementDataList: []
      },
      elementDataList: {
        // des: {
        //   elementId: 1,
        //   title: '场景描述',
        //   dataList: []
        // },
        object: {
          elementId: 2,
          title: '工艺对象',
          dataList: []
        },
        assist: {
          elementId: 3,
          title: '辅料',
          dataList: []
        },
        device: {
          elementId: 4,
          title: '设备',
          dataList: []
        },
        energy: {
          elementId: 5,
          title: '能源消耗',
          dataList: []
        },
        param: {
          elementId: 6,
          title: '工艺参数',
          dataList: []
        },
        output: {
          elementId: 7,
          title: '输出部件',
          dataList: []
        },
        envLoad: {
          elementId: 8,
          title: '环境负荷',
          dataList: []
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
      allMultiValue: [], // 所有值可选的属性,包含属性类的所有字段
      allMultiKey: [], // 所有值可选的属性名称
      noSelectValue: [], // 当前场景模型中当前要素下值不可选的所有属性及其当前值
      selectValue: [], // 当前场景模型中当前要素下值可选的所有属性及其当前值，可选值
      currentAttributes: [], // 当前要素的所有值可选的属性体
      currentKey: '', // 当前选中添加的要素属性
      addAttributes: [] // 当前所有添加的要素属性及其值
    }
  },
  watch: {
    currentKey (newAtt, oldAtt) {
      this.addAttributes.push(newAtt)
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
          item.attributeValue = item.attributeValue.split(',')
          // if (item.elementId === 1) {
          //   vm.elementDataList.des.dataList.push(item)
          // } else
          if (item.elementId === 2) {
            vm.elementDataList.object.dataList.push(item)
          } else if (item.elementId === 3) {
            vm.elementDataList.assist.dataList.push(item)
          } else if (item.elementId === 4) {
            vm.elementDataList.device.dataList.push(item)
          } else if (item.elementId === 5) {
            vm.elementDataList.energy.dataList.push(item)
          } else if (item.elementId === 6) {
            vm.elementDataList.param.dataList.push(item)
          } else if (item.elementId === 7) {
            vm.elementDataList.output.dataList.push(item)
          } else if (item.elementId === 8) {
            vm.elementDataList.envLoad.dataList.push(item)
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
            values: item['value'].split('，')
          }
          vm.allMultiValue.push(oj)
          vm.allMultiKey.push(item['title'])
        })
      })
    })
  },
  methods: {
    editAttribute (row, elementId) {
      this.postForm = {}
      this.selectValue = []
      this.noSelectValue = []
      let args = {
        url: 'attribute/list',
        params: {
          elementId: elementId
        }
      }
      api.get(args).then(res => {
        this.currentAttributes = res
      })
      if (row) {
        this.editTitle = '编辑'
        this.postForm = row
      } else {
        this.editTitle = '新增'
        this.postForm.sceneId = this.sceneModel.id
        this.postForm.elementId = elementId
        this.postForm.attributeValue = []
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
      let args = {
        url: 'elementData/deleteOne',
        params: {
          elementDataId: row.id
        }
      }
      api.delete(args).then(res => {
        if (res > 0) {
          this.$message.success('删除成功')
          history.go(0)
        } else {
          this.$message.error('删除失败')
          history.go(0)
        }
      })
    },
    submitAttribute () {
      let ss = ''
      this.noSelectValue.forEach(item => {
        ss = ss + item['name'] + ':' + item['presentValue'] + ','
      })
      this.selectValue.forEach(item => {
        ss = ss + item['name'] + ':' + item['presentValue'] + ','
      })
      this.addAttributes.forEach(item => {
        ss = ss + item['title'] + ':' + item['description'] + ','
      })
      ss = ss.substring(0, ss.length - 1)
      this.postForm['attributeValue'] = ss
      if (this.postForm.id) {
        api.put({url: 'elementData/updateOne', params: this.postForm}).then(res => {
          if (res > 0) {
            history.go(0)
          } else {
            alert('更新失败！')
          }
        })
      } else {
        api.post({url: 'elementData/insertOne', params: this.postForm}).then(res => {
          if (res > 0) {
            history.go(0)
          } else {
            alert('新增失败！')
          }
        })
      }
    },
    deleteItem (row) {
      let temp = []
      for (let i = 0; i < this.addAttributes.length; i++) {
        if (this.addAttributes[i] !== row) {
          temp.push(this.addAttributes[i])
        }
      }
      this.addAttributes = []
      this.addAttributes = temp
    },
    cleanUnsaved () {
      this.addAttributes = []
      this.editDrawer = false
      this.currentKey = ''
    }
  }
}
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
