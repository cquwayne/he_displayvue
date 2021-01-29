<template>
  <div>
    <el-divider></el-divider>
    <div style="width: 100%">
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input style="margin-left: 45px" placeholder="检索数据" v-model="searchForm.content">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info" @click="handleEditDrawer(null)">
            <i class="el-icon-circle-plus-outline"></i>添加新属性
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-tabs type="border-card">
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
              <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      class="manageEditDrawer"
      title="编辑属性"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'27%'">
      <el-form v-model="editForm" label-position="top">
        <el-form-item label="属性名称">
          <el-input v-model="editForm['title']" clearable></el-input>
        </el-form-item>
        <el-form-item label="属性值域">
          <el-input v-model="editForm['value']" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'Attribute',
  data () {
    return {
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
      attributeList: [],
      editDrawer: false,
      editForm: {},
      elementId: 2,
      searchForm: {
        content: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let query = {
        elementId: 2
      }
      let args = {
        url: 'attribute/list',
        params: query
      }
      api.get(args).then(res => {
        vm.attributeList = res
      })
    })
  },
  methods: {
    getAttributeList (elementId) {
      this.elementId = elementId
      let query = {
        elementId: elementId
      }
      let args = {
        url: 'attribute/list',
        params: query
      }
      api.get(args).then(res => {
        this.attributeList = res
      })
    },
    handleEditDrawer (row) {
      this.editForm = {}
      if (row) {
        this.editForm = row
      } else {
        this.editForm.elementId = this.elementId
      }
      this.editDrawer = true
    },
    handleSubmit () {
      if (this.editForm['id'] === undefined) {
        api.post({url: 'attribute', params: this.editForm}).then(res => {
          history.go(0)
        })
      } else {
        api.put({url: 'attribute', params: this.editForm}).then(res => {
          history.go(0)
        })
      }
    },
    handleDeleteDialog (row) {
      this.editForm = row
      api.delete({url: 'attribute', params: this.editForm}).then(res => {
        if (res===0) {
          alert('暂时不允许删除数据')
          // this.$message.success('删除成功！')
        } else {
          // this.$message.error('删除失败！')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
