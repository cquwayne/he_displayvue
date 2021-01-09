<template>
  <div>
    <el-divider></el-divider>
    <div style="width: 100%">
      <el-row :gutter="12" class="hover">
        <el-col :span="15">
          <el-input style="margin-left: 45px" placeholder="检索数据">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="info">
            <i class="fa fa-plus-circle fa-fw"></i> 添加新属性
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in tabPaneList" :key="item.index">
        <span slot="label" @click="getAttributeList(item.eleId)"><i class="el-icon-setting"></i>{{item.label}}</span>
        <el-table
          :data="attributeList">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="description"
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
      <div>
        <!--      <el-tab-pane>-->
        <!--        <span slot="label" @click="getAttributeList(tabPaneList[0].eleId)"><i class="el-icon-setting"></i>{{tabPaneList[0].label}}</span>-->
        <!--        <el-table-->
        <!--          :data="attributeList">-->
        <!--          <el-table-column-->
        <!--            prop=""-->
        <!--            label="序号">-->
        <!--          </el-table-column>-->
        <!--          <el-table-column-->
        <!--            prop="description"-->
        <!--            label="属性名称">-->
        <!--          </el-table-column>-->
        <!--          <el-table-column-->
        <!--            prop="value"-->
        <!--            label="属性可选项">-->
        <!--          </el-table-column>-->
        <!--          <el-table-column-->
        <!--            label="操作">-->
        <!--            <template slot-scope="scope">-->
        <!--              <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>-->
        <!--              <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--        </el-table>-->
        <!--      </el-tab-pane>-->
        <!--      <el-tab-pane>-->
        <!--        <span slot="label" @click="getAttributeList(tabPaneList[1].eleId)"><i class="el-icon-tickets"></i>{{tabPaneList[1].label}}</span>-->
        <!--      </el-tab-pane>-->
        <!--      <el-tab-pane>-->
        <!--        <span slot="label" @click="getAttributeList(tabPaneList[2].eleId)"><i class="el-icon-paperclip"></i>{{tabPaneList[2].label}}</span>-->
        <!--      </el-tab-pane>-->
        <!--      <el-tab-pane>-->
        <!--        <span slot="label" @click="getAttributeList(tabPaneList[3].eleId)"><i class="el-icon-data-analysis"></i>{{tabPaneList[3].label}}</span>-->
        <!--      </el-tab-pane>-->
        <!--      <el-tab-pane>-->
        <!--        <span slot="label" @click="getAttributeList(tabPaneList[4].eleId)"><i class="el-icon-files"></i>{{tabPaneList[4].label}}</span>-->
        <!--      </el-tab-pane>-->
      </div>

    </el-tabs>
  </div>
</template>

<script>
    import api from 'api'
    export default {
      name: "Attribute",
      data() {
        return {
          tabPaneList: [
            {
              label: '工艺对象',
              eleId: 1
            },
            {
              label: '设备',
              eleId: 2
            },
            {
              label: '辅料',
              eleId: 3
            },
            {
              label: '工艺参数',
              eleId: 4
            },
            {
              label: '能源消耗',
              eleId: 5
            },
          ],
          attributeList: []
          // objectList: [],
          // deviceList: [],
          // assistList: [],
          // paramList: [],
          // energyList: []
        }
      },
      beforeRouteEnter(to,from,next){
        next(vm => {
          let query = {
            eleId: 1
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
        getAttributeList(eleId) {
          let query = {
            eleId: eleId
          }
          let args = {
            url: 'attribute/list',
            params: query
          }
          api.get(args).then(res => {
            this.attributeList = res
          })
        }
      }
    }
</script>

<style scoped>

</style>
