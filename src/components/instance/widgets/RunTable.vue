<template>
  <div class="RunTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleClick('put', scope.row)">开始采集</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'RunTable',
  props: {
    table: {
      type: Array
    }
  }
}
</script>
