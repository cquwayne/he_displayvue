<template>
  <div class="ChainTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="规则链名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ChainTable',
  props: {
    table: {
      type: Array
    }
  }
}
</script>
<style scoped lang="scss">
  .ChainTable{
    padding: 20px;
  }
</style>
