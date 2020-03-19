<template>
  <div class="NodeTable">
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <!-- <el-table-column
        label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column> -->
      <el-table-column width="60px"
        prop="style"
        label="类型"
        :filters="[{ text: '复合模型', value: 1 }, { text: '单元模型', value: 0 }]"
        :filter-method="filterStyle"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.style === 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.style ? '复' : '单'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入模型标题搜索"/>
        </template>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column width="150px">
        <template slot="header">
          <el-button v-if="!editable" size="mini" type="primary" @click="addNode">
            <i class="el-icon-circle-plus-outline"></i> 添加模型
          </el-button>
          <span v-else>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" v-if="editable" type="danger" plain
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" v-if="!editable" type="primary" plain
            @click="handleDetail(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" v-if="!editable" type="success" plain
            @click="handleSelect(scope.$index, scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="编辑"
      :with-header="false"
      :visible.sync="drawer"
      :append-to-body="true"
      :size="'50%'"
      :direction="'rtl'">
      <NodeForm :node="selectNode" :editable="editable"></NodeForm>
    </el-drawer>
  </div>
</template>
<script>
import NodeForm from './NodeForm'
export default {
  name: 'NodeTable',
  components: {
    NodeForm
  },
  props: {
    table: {
      type: Array
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: '',
      drawer: false,
      selectNode: null
    }
  },
  methods: {
    filterStyle (value, row) {
      return row.style === value
    },
    addNode () {
      this.drawer = true
    },
    handleDetail (index, row) {
      this.$router.push({name: 'ModelIndex', query: {id: row.id}})
    },
    handlePut (index, row) {
      this.selectNode = row
      this.drawer = true
    },
    handleDelete (index, row) {
      this.$emit('handleDelete', row)
    },
    handleSelect (index, row) {
      this.$emit('handleSelect', row)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
