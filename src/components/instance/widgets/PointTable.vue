<template>
  <div class="PointTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column width="60px"
        prop="style"
        label="类型"
        :filters="[{ text: '复合点', value: 1 }, { text: '单元点', value: 0 }]"
        :filter-method="filterStyle"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.style === 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.style ? '复' : '单'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="坐标标号">
        <template slot-scope="scope">
          {{ scope.row.label }}
        </template>
      </el-table-column>
      <el-table-column label="坐标名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain v-if="scope.row.chain.attributeList === undefined" :disabled="true"
            @click="handleSelect(scope.row)">
            未配置
          </el-button>
          <el-button size="mini" type="primary" plain v-else
            @click="handleSelect(scope.row)">
            规则链
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'PointTable',
  props: {
    table: {
      type: Array
    }
  },
  methods: {
    filterStyle (value, row) {
      return row.style === value
    },
    handleSelect (row) {
      this.$emit('handleSelect', row.chain)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
