<template>
    <el-form :model="node" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
        <el-form-item label="GUID">
            <el-input disabled v-model="node.id"></el-input>
        </el-form-item>
        <el-form-item label="环节名称">
            <el-input v-model="node.title"></el-input>
        </el-form-item>
        <el-form-item label="代表地点">
            <el-input v-model="node.region"></el-input>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-input v-model="node.dataSource"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="node.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      <el-tabs tab-position="left" >
        <el-tab-pane v-for="item in tabPaneList" :key="item.index">
          <span slot="label" @click="getAttributeList(item.elementId)"><i class="el-icon-setting"></i>{{item.label}}</span>
          <el-table
            :data="attributeList.filter(data => !searchForm.content || data.title.toLowerCase().includes(searchForm.content.toLowerCase()))">
            <el-table-column
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="title"
              label="属性名称">
            </el-table-column>
            <el-table-column
              prop="value"
              label="属性值域">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <!--              <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>-->
                <!--              <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 100%;margin-bottom: 20px;"-->
<!--        row-key="id"-->
<!--        border-->
<!--        default-expand-all-->

<!--        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">-->
<!--        <el-table-column-->
<!--          prop="date"-->
<!--          label="类型"-->
<!--          sortable-->
<!--          width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="name"-->
<!--          label="描述"-->
<!--          sortable-->
<!--          width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </el-form>
</template>

<script>
import api from 'api'
export default {
  name: 'editNode',
  data () {
    return {
      node: {},
      tabPaneList: [
        // {
        //   label: '场景描述',
        //   elementId: 1
        // },
        {
          label: '工艺对象',
          elementId: 2
        },
        {
          label: '辅料',
          elementId: 3
        },
        {
          label: '设备',
          elementId: 4
        },
        {
          label: '能源消耗',
          elementId: 5
        },
        {
          label: '工艺参数',
          elementId: 6
        },
        {
          label: '输出部件',
          elementId: 7
        },
        {
          label: '环境负荷',
          elementId: 8
        }
      ],
      attributeList: []
    }
  },
  methods: {
    init (data, id) {
      data.flowInfo.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = node
        }
      })
    },
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
