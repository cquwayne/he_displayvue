<template>
    <el-form :model="node" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
        <el-form-item label="GUID">
            <el-input disabled v-model="node.id"></el-input>
        </el-form-item>
        <el-form-item label="工艺场景名称">
            <el-input v-model="node.title"></el-input>
        </el-form-item>
        <el-button @click="changToNextLevel">下一层级</el-button>
        <el-button @click="querySceneData" type="success">查看场景实例数据</el-button>
<!--        <el-form-item label="代表地点">-->
<!--            <el-input v-model="node.sceneData.region"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数据来源">-->
<!--          <el-input v-model="node.sceneData.dataSource"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="备注">-->
<!--            <el-input v-model="node.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>-->
<!--        </el-form-item>-->
<!--      <el-button @click="dialogVisible=!dialogVisible" type="success">场景实例数据</el-button>-->
<!--      <el-dialog title="场景实例数据" :visible.sync="dialogVisible" width="60%">-->
<!--        <el-tabs tab-position="top" >-->
<!--          <el-tab-pane v-for="item in entityElementDataList" :key="item.index" :label="item.label">-->
<!--            &lt;!&ndash;          <span slot="label" @click="getAttributeList(item.elementId)"><i class="el-icon-setting"></i>{{item.label}}</span>&ndash;&gt;-->
<!--            <el-table-->
<!--              :data="item.dataList">-->
<!--              <el-table-column-->
<!--                prop="name"-->
<!--                :label="item.label">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                prop="attributeValue"-->
<!--                label="特征描述">-->
<!--                <template slot-scope="scope">-->
<!--                  <div v-html="formatterColumn(scope.row.attributeValue)" style="white-space: pre-line"></div>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                label="操作">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button type="info" @click="editAttribute(scope.row,scope.row.elementId)">修改</el-button>-->
<!--                  <el-button type="info" @click="deleteAttribute(scope.row)">删除</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </el-tab-pane>-->
<!--        </el-tabs>-->
<!--      </el-dialog>-->
    </el-form>
</template>

<script>
import api from 'api'
export default {
  name: 'editNode',
  data () {
    return {
      node: {},
      dialogVisible: false,
      entityElementDataList: [
        // {
        //   label: '场景描述',
        //   elementId: 1
        // },
        {
          label: '工艺对象',
          elementId: 2,
          dataList: []
        },
        {
          label: '辅料',
          elementId: 3,
          dataList: []
        },
        {
          label: '设备',
          elementId: 4,
          dataList: []
        },
        {
          label: '能源消耗',
          elementId: 5,
          dataList: []
        },
        {
          label: '工艺参数',
          elementId: 6,
          dataList: []
        },
        {
          label: '输出部件',
          elementId: 7,
          dataList: []
        },
        {
          label: '环境负荷',
          elementId: 8,
          dataList: []
        }
      ],
      attributeList: [],
      sceneData: {},
      sceneId: 34
    }
  },
  methods: {
    async init (sceneData, id) {
      sceneData.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = node
        }
      })
      let args = {
        url: 'sceneData',
        params: {
          id: this.node.id
        }
      }
      await api.get(args).then(res => {
        this.sceneData = res
        // this.sceneData.entityElementDataList.forEach(item => {
        //   item.attributeValue = item.attributeValue.split(',')
        //   // if (item.elementId === 1) {
        //   //   this.entityElementDataList.des.dataList.push(item)
        //   // } else
        //   if (item.elementId === 2) {
        //     item.name = item.attributeValue[0].substring(item.attributeValue[0].lastIndexOf(':') + 1)
        //     this.entityElementDataList[0].dataList.push(item)
        //   } else if (item.elementId === 3) {
        //     item.name = item.attributeValue[1].substring(item.attributeValue[1].lastIndexOf(':') + 1)
        //     this.entityElementDataList[1].dataList.push(item)
        //   } else if (item.elementId === 4) {
        //     item.name = item.attributeValue[2].substring(item.attributeValue[2].lastIndexOf(':') + 1)
        //     this.entityElementDataList[2].dataList.push(item)
        //   } else if (item.elementId === 5) {
        //     item.name = item.attributeValue[3].substring(item.attributeValue[3].lastIndexOf(':') + 1)
        //     this.entityElementDataList[3].dataList.push(item)
        //   } else if (item.elementId === 6) {
        //     item.name = item.attributeValue[4].substring(item.attributeValue[4].lastIndexOf(':') + 1)
        //     this.entityElementDataList[4].dataList.push(item)
        //   } else if (item.elementId === 7) {
        //     item.name = item.attributeValue[5].substring(item.attributeValue[5].lastIndexOf(':') + 1)
        //     this.entityElementDataList[5].dataList.push(item)
        //   } else if (item.elementId === 8) {
        //     item.name = item.attributeValue[6].substring(item.attributeValue[6].lastIndexOf(':') + 1)
        //     this.entityElementDataList[6].dataList.push(item)
        //   }
        // })
      })
    },
    editAttribute (row, elementId) {},
    deleteAttribute (row) {},
    formatterColumn(cellValue) {
      let value = cellValue.join("\r")
      return value
    },
    changToNextLevel() {
      this.$emit('chang-to-next-level',this.node.id,this.node.sceneDataId)
    },
    querySceneData() {
      if (this.sceneData.id==='c355e585-6e81-4404-b178-3260040e77ad') {
        this.sceneId = 34
      } else if (this.sceneData.id==='9e855cc2-9737-42d8-be63-bcb39b43bb59') {
        this.sceneId = 50
      } else if (this.sceneData.id==='c0aee694-eda3-41d2-8f83-f8b1a2cb8341') {
        this.sceneId = 68
      } else if (this.sceneData.id==='e3235f47-5f65-481a-98c7-5590110406b2') {
        this.sceneId = 79
      }
      this.$router.push({name: 'SceneData', params: {sceneDataId: this.sceneId}})
      window.location.reload()
    }
  }
}
</script>
