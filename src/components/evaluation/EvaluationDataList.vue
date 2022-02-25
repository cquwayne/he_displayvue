<!--清单数据,第二层-->
<template>
  <el-container class="EvaluationDataList" style="width: 1100px; margin:0 auto;" >
    <!--<el-header>-->
    <!--</el-header>-->
    <div style="width: 100%">
      <!--<el-divider></el-divider>-->
      <el-row :gutter="12" class="hover">
      <div class="el-dialog__header" :style="{ height: '1px'}"><span class="el-dialog__title"><strong>孪生体清单数据</strong></span><!----></div>
        <!--选择归一化与综合加权算法-->
        <el-button type="success" icon="el-icon-s-data" @click="dialogFormVisible = true" style="float:right">生成评价结果</el-button>
        <el-dialog title="选择归一化基准值及综合加权值" :visible.sync="dialogFormVisible" style="margin-top: 20px" width="30%" center>
          <el-divider></el-divider>
          <el-form :model="form" >
            <el-form-item label="归一化基准值" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择" style="width:80%">
                <el-option label="LCA系统归一化标准值同步版V1.0" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="综合加权值" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择" style="width:80%">
                <el-option label="LCA系统综合加权值数据同步版V1.0" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <router-link :to="{ path: '/evaluation/envAssessment'}">
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </router-link>
          </div>
        </el-dialog>
        <el-button type="warning" @click="goBack" style="float:right; margin-right: 10px" plain><i class="el-icon-back">返回</i></el-button>
      </el-row>
      <el-divider></el-divider>
      <el-main>
        <!--资源消耗-->
        <el-descriptions class="margin-top" title="资源消耗"  :size="size" border style="margin-top: 0px">
          <template slot="extra">
            <el-button type="primary" size="medium">编辑</el-button>
          </template>
        </el-descriptions>
        <el-table :data="tableDataMaterials" border style="width:100%" :row-style="{height:'0px'}" :cell-style="{padding:'3px'}">
          <el-table-column
            prop="id" label="序号" align="center">
          </el-table-column>
          <el-table-column
            prop="name" label="资源名称" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="value" label="物质量" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="unit" label="单位" width="200" align="center">
          </el-table-column>
          <el-table-column
          prop="type" label="投入产出类别" width="300" align="center">
        </el-table-column>
        </el-table>
        <!--能源-->
        <el-descriptions class="margin-top" title="能源消耗"  :size="size" border style="margin-top: 5px">
          <template slot="extra">
            <el-button type="primary" size="medium">编辑</el-button>
          </template>
        </el-descriptions>
        <el-table :data="tableDataEnergy" border style="width:100%" :row-style="{height:'0px'}" :cell-style="{padding:'3px'}">
          <el-table-column
            prop="id" label="序号"  align="center">
          </el-table-column>
          <el-table-column
            prop="name" label="资源名称" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="value" label="物质量" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="unit" label="单位" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="type" label="投入产出类别" width="300" align="center">
          </el-table-column>
        </el-table>
        <!--环境排放-->
        <el-descriptions class="margin-top" title="环境排放"  :size="size" border style="margin-top: 5px">
          <template slot="extra">
            <el-button type="primary" size="medium">编辑</el-button>
          </template>
        </el-descriptions>
        <el-table :data="tableDataEmission" border style="width:100%" :row-style="{height:'0px'}" :cell-style="{padding:'3px'}">
          <el-table-column
            prop="id" label="序号" align="center">
          </el-table-column>
          <el-table-column
            prop="name" label="资源名称" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="value" label="物质量" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="unit" label="单位" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="type" label="投入产出类别" width="300" align="center">
          </el-table-column>
        </el-table>
      </el-main>
    </div>

  </el-container>
</template>

<script>
export default {
  name: "EvaluationDataList",
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      size: '',
      tableDataMaterials: [
        {id: '1', name: '废钢', value: '476.1744375', unit: 'kg', type: '资源投入'},
        {id: '2', name: '回炉料', value: '361.867', unit: 'kg', type: '资源投入'},
        {id: '3', name: '铁屑', value: '220', unit: 'kg', type: '资源投入'},
        // {id: '4', name: '增碳剂C≥90', value: '48.84', unit: 'kg', type: '输入'},
        // {id: '5', name: '硅铁', value: '22', unit: 'kg', type: '输入'},
        // {id: '6', name: '除渣剂3M', value: '4.381', unit: 'kg', type: '输入'},
        // {id: '7', name: '锆孕育剂0.2--0.7㎜', value: '0.963', unit: 'kg', type: '输入'},
        // {id: '8', name: '电解铜≧99.9%', value: '33.3', unit: 'kg', type: '输入'},
        // {id: '9', name: '高碳锰铁 FeMn65C7.0', value: '10.395', unit: 'kg', type: '输入'},
        // {id: '10', name: '硅钡钙孕育剂3-5', value: '6.05', unit: 'kg', type: '输入'},
        // {id: '11', name: '高碳铬铁FeCr55-C-1000', value: '6.875', unit: 'kg', type: '输入'},
        // {id: '12', name: '锡锭', value: '4.125', unit: 'kg', type: '输入'},
      ],
      tableDataEnergy: [
        {id: '1', name: '电', value: '1004.4668', unit: 'kW.h', type: '资源投入'},
        {id: '2', name: '水', value: '0.2297', unit: 'm3', type: '资源投入'},
        {id: '3', name: '天然气', value: '0.06108463', unit: 'm3', type: '资源投入'},
      ],
      tableDataEmission: [
        {id: '1', name: 'VOC', value: '0.2147', unit: 'ppm', type: '环境排放'},
        {id: '2', name: 'PM2.5', value: '0.2176', unit: 'mg/m3', type: '环境排放'},
        {id: '3', name: 'PM10', value: '1.0307', unit: 'mg/m3', type: '环境排放'},
        {id: '4', name: 'PM100', value: '1.6501', unit: 'mg/m3', type: '环境排放'},
        {id: '5', name: '二氧化硫', value: '0.0042', unit: 'mg/m3', type: '环境排放'},
        {id: '6', name: '氮氧化物', value: '0.06395', unit: 'mg/m3', type: '环境排放'},
        {id: '7', name: '废渣', value: '0.0198', unit: 'kg', type: '环境排放'},
        {id: '8', name: '噪声', value: '77.7848', unit: 'dB', type: '环境排放'},
      ],
    }
  },
  methods: {
    goBack () {
      window.history.back()
    },
  },
}
</script>

<style scoped>

</style>
