<template>
  <div class="AttributeTable Table">
    <el-table
      :data="table.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width:100%">
      <el-table-column
        label="所属规则">
        <template slot-scope="scope">
          {{ scope.row.rule.label }}
        </template>
      </el-table-column>
      <el-table-column
        label="实例编号">
        <template slot-scope="scope">
          {{ 'R-' + scope.row.rule.id + '-I-' + scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入实例搜索"/>
        </template>
        <template slot-scope="scope">
          {{ scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column
        label="实例值">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'AttributeTable',
  props: {
    table: {
      type: Array
    }
  },
  data () {
    return {
      search: '',
      editType: 'post',
      drawer: false,
      url: this.$store.state.url,
      baseForm: {
        label: null,
        value: null
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .AttributeTable{
  }
</style>
