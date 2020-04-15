<template>
  <div class="Table">
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column label="主键" width="50px" v-if="element !== 'diagram'">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column width="180px" label="过程名称" v-if="element === 'process'">
        <template slot-scope="scope">
          {{ scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="关联根节点" v-if="element === 'process'">
        <template slot-scope="scope">
          {{ scope.row.node.title + ' (' + scope.row.node.id + ')' }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="所属过程" v-if="element === 'bind'">
        <template slot-scope="scope">
          {{ scope.row.process.title }}
        </template>
      </el-table-column>
      <el-table-column width="160px" label="绑定结点" v-if="element === 'bind'">
        <template slot-scope="scope">
          {{ scope.row.node.title }}
        </template>
      </el-table-column>
      <el-table-column width="150px" label="绑定信息" v-if="element === 'bind'">
        <template slot-scope="scope">
          {{ scope.row.information.title }}
        </template>
      </el-table-column>
      <el-table-column width="150px" v-if="element !== 'diagram'">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleSelect(null, {})">
            <i class="el-icon-circle-plus-outline"></i> 添加
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="数据流图" v-if="element === 'diagram'">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">
            {{ scope.row.title}}
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'NodeTable',
  props: {
    table: {
      type: Array
    },
    element: {
      type: String,
      default: "node"
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
