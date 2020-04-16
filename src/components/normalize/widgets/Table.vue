<template>
  <div class="Table">
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column label="主键" width="50px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="属性名称" v-if="element === 'attribute'">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="属性值" v-if="element === 'attribute'">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="属性规则链" v-if="element === 'attribute'">
        <template slot-scope="scope">
          <div v-if="scope.row.chainList && scope.row.chainList.length > 0">
            <div v-for="item in scope.row.chainList" :key="item.index">
              {{ item.left.title }} <i class="el-icon-right"/>  {{ item.right.title }} 
            </div>
          </div>
          <div v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="规则元名称" v-if="element === 'metadata'">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="规则元内容" v-if="element === 'metadata'">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="规则元" v-if="element === 'rule'">
        <template slot-scope="scope">
          {{ scope.row.metadata.title + ' ( ' + scope.row.metadata.value + ' )' }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="规则值" v-if="element === 'rule'">
        <template slot-scope="scope">
          {{ scope.row.title + ' ( ' + scope.row.value + ' )' }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="左侧规则" v-if="element === 'chain'">
        <template slot-scope="scope">
          {{ scope.row.left ? scope.row.left.metadata.title : '/' }}
        </template>
      </el-table-column>
      <el-table-column width="100px" label="右侧规则" v-if="element === 'chain'">
        <template slot-scope="scope">
          {{ scope.row.right ? scope.row.right.metadata.title : '/' }}
        </template>
      </el-table-column>
      <el-table-column width="150px" label="信息名称" v-if="element === 'information'">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column width="150px" label="引用信息" v-if="element === 'information'">
        <template slot-scope="scope">
          <div v-if="scope.row.infoRefList && scope.row.infoRefList.length > 0">
            <div v-for="item in scope.row.infoRefList" :key="item.index">
              {{ item.child.title }}
            </div>
          </div>
          <div v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="引用属性" v-if="element === 'information'">
        <template slot-scope="scope">
          <div v-if="scope.row.attrRefList && scope.row.attrRefList.length > 0">
            <div v-for="item in scope.row.attrRefList" :key="item.index">
              {{ item.child.title }}
            </div>
          </div>
          <div v-else>/</div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="引用信息名称" v-if="element === 'inforef' || element === 'attrref'">
        <template slot-scope="scope">
          {{ scope.row.parent ? scope.row.parent.title : '/' }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="被引用信息名称" v-if="element === 'inforef'">
        <template slot-scope="scope">
          {{ scope.row.child ? scope.row.child.title : '/' }}
        </template>
      </el-table-column>
      <el-table-column width="200px" label="被引用属性名称" v-if="element === 'attrref'">
        <template slot-scope="scope">
          {{ scope.row.child ? scope.row.child.title : '/' }}
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
