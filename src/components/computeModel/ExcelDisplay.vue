<template>
  <div class="sample-tutorial">
    <gc-spread-sheets class="sample-spreadsheets" @workbookInitialized="initSpread">
      <gc-worksheet :dataSource="excelData" :autoGenerateColumns="autoGenerateColumns">
        <div v-for="item in fieldList" :key="fieldList.index">
          <gc-column :dataField="item"></gc-column>
        </div>
      </gc-worksheet>
    </gc-spread-sheets>
  </div>
</template>

<script>
import axios from 'axios'
import XLSX from "xlsx"
import '@grapecity/spread-sheets-vue'
import '@grapecity/spread-sheets-resources-zh'
import GC from '@grapecity/spread-sheets'
GC.Spread.Common.CultureManager.culture('zh-cn')
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'

export default {
  name: 'ExcelDisplay',
  data() {
    return {
      autoGenerateColumns: false,
      spread: null,
      excelData: [],
      fieldList: []
    };
  },
  methods: {
    initSpread: function(spread) {
      this.spread = spread;
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      console.log(to.params.sceneDataTitle)
      let url = '../../static/'+ to.params.sceneDataTitle +'.xlsx'
      axios.get(url, {responseType: 'arraybuffer'}).then(res => {
        let data = new Uint8Array(res.data)
        let wb = XLSX.read(data, {type: "array"})
        let wb_sheet = wb.Sheets.Sheet1
        vm.excelData = XLSX.utils.sheet_to_json(wb_sheet)
        vm.fieldList = Object.keys(vm.excelData[0])
      })
    })
  }
}
</script>

<style scoped>
  .sample-tutorial {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .sample-spreadsheets {
    width: 100%;
    height: 100%;
  }
</style>
