<template>
  <div class="LinkTable">
    <el-table
      v-if="table != null"
      :data="table"
      style="width:100%">
      <el-table-column
        label="链序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="链规则">
        <template slot-scope="scope">
          {{ scope.row.base.rule.label }}
        </template>
      </el-table-column>
      <el-table-column
        label="规则实例">
        <template slot-scope="scope">
          {{ scope.row.base.title + ' (' + scope.row.base.value + ')' }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button  type="primary" size="mini" @click.native="drawer = true">
            <i class="el-icon-circle-plus-outline"></i> 添加
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form :model="linkForm">
        <el-form-item>
          <el-select filterable v-model="linkForm.baseId" placeholder="关联规则实例">
            <el-option v-for="item in attributeList" :key="item.index"
              :label="item.rule.label + ' (' + item.title + ')' " :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handlePost">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'LinkTable',
  props: {
    chain: {
      type: Object
    },
    table: {
      type: Array
    },
    attributeList: {
      type: Array
    }
  },
  data () {
    return {
      url: this.$store.state.url,
      drawer: false,
      linkForm: {}
    }
  },
  methods: {
    handlePost () {
      this.linkForm.chainId = this.chain.id
      this.$axios.post(this.url + 'links', this.linkForm).then(res => {
        history.go(0)
      })
    },
    handleDelete (index, row) {
    }
  }
}
</script>
<style scoped lang="scss">
  .LinkTable{
    height: 100%;
    max-height: 100%;
    overflow: auto;
  }
</style>
