<template>
  <div class="Table">
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column label="主键" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column v-if="element === 'node'">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            style="width:200px"
            placeholder="搜索"/>
        </template>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="坐标平面" v-if="element === 'node'">
        <template slot-scope="scope">
          <div v-if="scope.row.pointList && scope.row.pointList.length > 0">
            <div v-for="item in scope.row.pointList" :key="item.index">{{' (' + item.x + ', ' + item.y + ')'}}</div>
          </div>
          <div v-else>
            无坐标
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属结点" v-if="element === 'point'">
        <template slot-scope="scope">
          {{ scope.row.parent.title }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="x坐标值" v-if="element === 'point'">
        <template slot-scope="scope">
          {{ scope.row.x }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="y坐标值" v-if="element === 'point'">
        <template slot-scope="scope">
          {{ scope.row.y }}
        </template>
      </el-table-column>
       <el-table-column width="100px" label="输入坐标" v-if="element === 'pipe'">
        <template slot-scope="scope">
          {{ scope.row.inputId + ' ( ' + scope.row.input.x + ', ' + scope.row.input.y  + ' )' }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="输出坐标" v-if="element === 'pipe'">
        <template slot-scope="scope">
          {{ scope.row.outputId + ' ( ' + scope.row.output.x + ', ' + scope.row.output.y  + ' )' }}
        </template>
      </el-table-column>
      <el-table-column label="关联坐标所属结点" v-if="element === 'hyperlink'">
        <template slot-scope="scope">
          {{ scope.row.point.parent.title  }}
        </template>
      </el-table-column>
      <el-table-column label="关联坐标" v-if="element === 'hyperlink'">
        <template slot-scope="scope">
          {{ scope.row.pointId + ' ( ' + scope.row.point.x + ', ' + scope.row.point.y  + ' )'   }}
        </template>
      </el-table-column>
      <el-table-column label="关联结点" v-if="element === 'hyperlink'">
        <template slot-scope="scope">
          {{ scope.row.node.title }}
        </template>
      </el-table-column>
      <el-table-column width="150px">
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
