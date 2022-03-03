<!--评价元数据-->
<template>
  <div>
    <h1 style="margin-left: 20px">评价元数据管理</h1>
    <!--<div style="margin-left: 20px; margin-top: 10px">-->
    <!--  <el-radio v-model="radio1" label="1" border>特征化因子维护</el-radio>-->
    <!--  <el-radio v-model="radio1" label="2" border>归一化基准维护</el-radio>-->
    <!--  <el-radio v-model="radio1" label="3" border>综合加权维护</el-radio>-->
    <!--  <br>-->
    <!--</div>-->
    <el-tabs v-model="activeName" type="card" style="margin-left: 10px; margin-top: -10px" @tab-click="handleClick">
      <!--特征化因子维护-->
      <el-tab-pane label="特征化因子维护" name="first">
        <el-row style="margin-left: 10px; margin-top: 1px">
        <el-button icon="el-icon-plus" plain>新增特征化因子</el-button>
        <el-button type="info" icon="el-icon-document-copy" plain>复制数据</el-button>
        <el-button type="primary" icon="el-icon-edit" plain>修改特征因子</el-button>
        <el-button type="danger" icon="el-icon-delete" plain>删除特征因子</el-button>
        <el-button type="warning" icon="el-icon-refresh-right" plain>刷新</el-button>
        <el-input placeholder="请输入查找内容" style="width: 300px;margin-left: 50px;" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
        <el-table :data="tableDataFactor" style="width: 100%; margin-top: 5px" max-height="620" tooltip-effect="dark" >
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="特征因子名称" width="180" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>特征因子名称: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="投入产出类型" width="180" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="子类型" width="180" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.subtype }}</span>
            </template>
          </el-table-column>
          <el-table-column label="特征化因子" width="180" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.eigenFactor }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="200" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--归一化基准维护-->
      <el-tab-pane label="归一化基准维护" name="second">
        <el-row style="margin-left: 10px; margin-top: 1px">
        <el-button icon="el-icon-plus" plain>新增归一化基准值</el-button>
        <el-button type="info" icon="el-icon-document-copy" plain>复制数据</el-button>
        <el-button type="primary" icon="el-icon-edit" plain>修改归一化基准</el-button>
        <el-button type="danger" icon="el-icon-delete" plain>删除归一化基准</el-button>
        <el-button type="warning" icon="el-icon-refresh-right" plain>刷新</el-button>
        <el-input placeholder="请输入查找内容" style="width: 300px;margin-left: 50px;" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
        <el-table :data="tableDataStandard" style="width: 100%; margin-top: 5px" max-height="620" tooltip-effect="dark">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="归一化基准名称" width="400" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>归一化基准名称: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="基准值" width="300" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.standardValue }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="300" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--综合加权维护-->
      <el-tab-pane label="综合加权维护" name="third">
        <el-row style="margin-left: 10px; margin-top: 1px">
        <el-button icon="el-icon-plus" plain>新增综合加权值</el-button>
        <el-button type="info" icon="el-icon-document-copy" plain>复制数据</el-button>
        <el-button type="primary" icon="el-icon-edit" plain>修改综合加权值</el-button>
        <el-button type="danger" icon="el-icon-delete" plain>删除综合加权值</el-button>
        <el-button type="warning" icon="el-icon-refresh-right" plain>刷新</el-button>
        <el-input placeholder="请输入查找内容" style="width: 300px;margin-left: 50px;" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
        <el-table :data="tableDataWeighted" style="width: 100%; margin-top: 5px" max-height="620" tooltip-effect="dark">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="综合加权名称" width="400" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>综合加权名称: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="加权值" width="300" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.weightedValue }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="300" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--任务测试-->
      <!--<el-tab-pane label="任务测试" name="fourth"><strong>任务</strong></el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
export default {
name: "EvaluationMetadata",
  data () {
    return {
      radio1: '1',
      activeName: 'first',
      tableDataFactor: [
        {"id":1,"name":"淡水，工业用","type":"资源投入","subtype":"水资源消耗","eigenFactor":1,"unit":"m^3","date":"2022/3/2"},
        {"id":2,"name":"硬煤","type":"资源投入","subtype":"化石能源消耗","eigenFactor":1,"unit":"kg Coal-R eq./kg","date":"2022/3/2"},
        {"id":3,"name":"原油","type":"资源投入","subtype":"化石能源消耗","eigenFactor":1.43,"unit":"kg Coal-R eq./kg","date":"2022/3/2"},
        {"id":4,"name":"天然气","type":"资源投入","subtype":"化石能源消耗","eigenFactor":1.21,"unit":"kg Coal-R eq./kg","date":"2022/3/2"},
        {"id":5,"name":"CO2","type":"环境排放","subtype":"全球变暖","eigenFactor":1,"unit":"kg CO2 eq/kg","date":"2022/3/2"},
        {"id":6,"name":"CH4","type":"环境排放","subtype":"全球变暖","eigenFactor":25,"unit":"kg CO2 eq/kg","date":"2022/3/2"},
        {"id":7,"name":"N2O","type":"环境排放","subtype":"全球变暖","eigenFactor":298,"unit":"kg CO2 eq/kg","date":"2022/3/2"},
        {"id":8,"name":"SF6","type":"环境排放","subtype":"全球变暖","eigenFactor":22800,"unit":"kg CO2 eq/kg","date":"2022/3/2"},
        {"id":9,"name":"SO2","type":"环境排放","subtype":"酸化影响","eigenFactor":1,"unit":"kg SO2 eq/kg","date":"2022/3/2"},
        {"id":10,"name":"NH3","type":"环境排放","subtype":"酸化影响","eigenFactor":1.88,"unit":"kg SO2 eq/kg","date":"2022/3/2"},
        {"id":11,"name":"NOX","type":"环境排放","subtype":"酸化影响","eigenFactor":0.7,"unit":"kg SO2 eq/kg","date":"2022/3/2"},
        {"id":12,"name":"H2S","type":"环境排放","subtype":"酸化影响","eigenFactor":1.88,"unit":"kg SO2 eq/kg","date":"2022/3/2"},
        {"id":13,"name":"HCL","type":"环境排放","subtype":"酸化影响","eigenFactor":0.88,"unit":"kg SO2 eq/kg","date":"2022/3/2"},
        {"id":14,"name":"PM2.5","type":"环境排放","subtype":"可吸入无机物","eigenFactor":1,"unit":"kg PM2.5 eq/kg","date":"2022/3/2"},
        {"id":15,"name":"PM10","type":"环境排放","subtype":"可吸入无机物","eigenFactor":0.536,"unit":"kg PM2.5 eq/kg","date":"2022/3/2"},
        {"id":16,"name":"NOX","type":"环境排放","subtype":"可吸入无机物","eigenFactor":0.127,"unit":"kg PM2.5 eq/kg","date":"2022/3/2"},
        {"id":17,"name":"NH3","type":"环境排放","subtype":"可吸入无机物","eigenFactor":0.121,"unit":"kg PM2.5 eq/kg","date":"2022/3/2"},
        {"id":18,"name":"NOX","type":"环境排放","subtype":"人体生态毒性","eigenFactor":1.2,"unit":"kg 1,4-DCB eq./kg","date":"2022/3/2"},
        {"id":19,"name":"SO2","type":"环境排放","subtype":"人体生态毒性","eigenFactor":0.31,"unit":"kg 1,4-DCB eq./kg","date":"2022/3/2"},
        {"id":20,"name":"CO","type":"环境排放","subtype":"人体生态毒性","eigenFactor":0.049,"unit":"kg 1,4-DCB eq./kg","date":"2022/3/2"},
        {"id":21,"name":"苯并(a)芘","type":"环境排放","subtype":"人体生态毒性","eigenFactor":0.096,"unit":"kg 1,4-DCB eq./kg","date":"2022/3/2"},
        {"id":22,"name":"磷酸盐","type":"环境排放","subtype":"水体富营养化","eigenFactor":1,"unit":"kg NO3 eq./kg","date":"2022/3/2"},
        {"id":23,"name":"氨氮","type":"环境排放","subtype":"水体富营养化","eigenFactor":0.33,"unit":"kg NO3 eq./kg","date":"2022/3/2"},
        {"id":24,"name":"NOX","type":"环境排放","subtype":"水体富营养化","eigenFactor":0.13,"unit":"kg NO3 eq./kg","date":"2022/3/2"},
        {"id":25,"name":"化学需氧量","type":"环境排放","subtype":"水体富营养化","eigenFactor":0.022,"unit":"kg NO3 eq./kg","date":"2022/3/2"},
        {"id":26,"name":"VOC","type":"环境排放","subtype":"光化学氧化","eigenFactor":0.022,"unit":"kg C2H4 eq./kg","date":"2022/3/2"},
        {"id":27,"name":"甲醛","type":"环境排放","subtype":"光化学氧化","eigenFactor":0.0033,"unit":"kg C2H4 eq./kg","date":"2022/3/2"},
        {"id":28,"name":"甲苯","type":"环境排放","subtype":"光化学氧化","eigenFactor":0.000056,"unit":"kg C2H4 eq./kg","date":"2022/3/2"},
        {"id":29,"name":"NOX","type":"环境排放","subtype":"光化学氧化","eigenFactor":0.0226,"unit":"kg C2H4 eq./kg","date":"2022/3/2"},
        {"id":30,"name":"苯并(a)芘","type":"环境排放","subtype":"水生生态毒性","eigenFactor":0.0000426,"unit":"kg PO43 eq./kg","date":"2022/3/2"},
        {"id":31,"name":"铜","type":"环境排放","subtype":"水生生态毒性","eigenFactor":0.00325,"unit":"kg PO43 eq./kg","date":"2022/3/2"},
        {"id":32,"name":"铅","type":"环境排放","subtype":"水生生态毒性","eigenFactor":0.00786,"unit":"kg PO43 eq./kg","date":"2022/3/2"},
        {"id":33,"name":"苯","type":"环境排放","subtype":"水生生态毒性","eigenFactor":0.000312,"unit":"kg PO43 eq./kg","date":"2022/3/2"},
        {"id":34,"name":"铁","type":"资源投入","subtype":"金属资源消耗","eigenFactor":1,"unit":"kg Fe eq. /kg","date":"2022/3/2"},
        {"id":35,"name":"铬","type":"资源投入","subtype":"金属资源消耗","eigenFactor":1.18,"unit":"kg Fe eq. /kg","date":"2022/3/2"},
        {"id":36,"name":"锰","type":"资源投入","subtype":"金属资源消耗","eigenFactor":14.2,"unit":"kg Fe eq. /kg","date":"2022/3/2"},
        {"id":37,"name":"锡","type":"资源投入","subtype":"金属资源消耗","eigenFactor":69300,"unit":"kg Fe eq. /kg","date":"2022/3/2"}
      ],
      tableDataStandard: [
        {"id":1,"name":"金属资源消耗潜值（ADP）","standardValue":100000,"date":"2022/3/2"},
        {"id":2,"name":"水资源消耗量（WRC）","standardValue":150000,"date":"2022/3/2"},
        {"id":3,"name":"化石能源消耗量（FEC）","standardValue":1250000,"date":"2022/3/2"},
        {"id":4,"name":"全球变暖影响潜值（GWP）","standardValue":2350000,"date":"2022/3/2"},
        {"id":5,"name":"酸化影响潜值（AP）","standardValue":70000,"date":"2022/3/2"},
        {"id":6,"name":"水体富营养化影响潜值（EP）","standardValue":5600,"date":"2022/3/2"},
        {"id":7,"name":"光化学氧化物产生潜值（POCP）","standardValue":45900,"date":"2022/3/2"},
        {"id":8,"name":"人体毒性潜值（HTP）","standardValue":23000,"date":"2022/3/2"},
        {"id":9,"name":"水生生态毒性潜值（ETP）","standardValue":55000,"date":"2022/3/2"},
        {"id":10,"name":"可吸入无机物影响潜值（RI）","standardValue":80000,"date":"2022/3/2"},
      ],
      tableDataWeighted: [
        {"id":1,"name":"金属资源消耗潜值（ADP）","weightedValue":8,"date":"2022/3/2"},
        {"id":2,"name":"水资源消耗量（WRC）","weightedValue":8,"date":"2022/3/2"},
        {"id":3,"name":"化石能源消耗量（FEC）","weightedValue":9,"date":"2022/3/2"},
        {"id":4,"name":"全球变暖影响潜值（GWP）","weightedValue":8,"date":"2022/3/2"},
        {"id":5,"name":"酸化影响潜值（AP）","weightedValue":5,"date":"2022/3/2"},
        {"id":6,"name":"水体富营养化影响潜值（EP）","weightedValue":7,"date":"2022/3/2"},
        {"id":7,"name":"光化学氧化物产生潜值（POCP）","weightedValue":8,"date":"2022/3/2"},
        {"id":8,"name":"人体毒性潜值（HTP）","weightedValue":5,"date":"2022/3/2"},
        {"id":9,"name":"水生生态毒性潜值（ETP）","weightedValue":7,"date":"2022/3/2"},
        {"id":10,"name":"可吸入无机物影响潜值（RI）","weightedValue":8,"date":"2022/3/2"},
      ],
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>
