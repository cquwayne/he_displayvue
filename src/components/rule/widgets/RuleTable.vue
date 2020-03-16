<template>
  <div class="RuleTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column width="120px"
        prop="style"
        label="规则类型"
        :filters="styleFilters"
        :filter-method="filterStyle"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag disable-transitions v-if="scope.row.style === ruleStyle.initial">
            缺省取值
          </el-tag>
          <el-tag disable-transitions v-if="scope.row.style === ruleStyle.range">
            取值区间
          </el-tag>
          <el-tag disable-transitions v-if="scope.row.style === ruleStyle.type">
            数据类型
          </el-tag>
          <el-tag disable-transitions v-if="scope.row.style === ruleStyle.unit">
            数据单位
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="规则名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="规则内容">
        <template slot-scope="scope">
          <div v-if="scope.row.style === ruleStyle.initial">
            默认值为：{{scope.row.initial.value}}
          </div>
          <div v-if="scope.row.style === ruleStyle.range">
            取值范围：{{scope.row.range.min}} ~ {{scope.row.range.max}}
          </div>
          <div v-if="scope.row.style === ruleStyle.type">
            数据类型：{{scope.row.type}}
          </div>
          <div v-if="scope.row.style === ruleStyle.unit">
            数据单位：{{scope.row.unit}}
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button  type="primary" size="mini" @click="handleAdd">
            添加规则
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
  name: 'RuleTable',
  props: {
    table: {
      type: Array
    }
  },
  computed: {
    ruleStyle () {
      return {
        initial: 1,
        range: 2,
        type: 3,
        unit: 4,
      }
    },
    styleFilters () {
      return [
        {
          text: '缺省取值', value: this.ruleStyle.initial
        },
        {
          text: '取值区间', value: this.ruleStyle.range
        },
        {
          text: '数据类型', value: this.ruleStyle.type
        },
        {
          text: '数据单位', value: this.ruleStyle.unit
        }
      ]
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleAdd () {
      this.$emit('handleSelect', null)
    },
    handleSelect (index, row) {
      this.$emit('handleSelect', row)
    },
    filterStyle (value, row) {
      return row.style === value
    }
  }
}
</script>
<style scoped lang="scss">
  .RuleTable{
    display: flex;
    padding: 20px;
  }
</style>
