<template>
  <el-container class="SceneData">
    <el-header>
      <SceneBasic :sceneModel="sceneModel"></SceneBasic>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <!--      <el-table-->
      <!--        :data="sceneData['inputFrameDataList']"-->
      <!--        style="width: 100%">-->
      <!--        <el-table-column-->
      <!--          label="物料数据"-->
      <!--          width="180">-->
      <!--          <template slot-scope="scope">-->
      <!--            <div v-for="item in scope.row['materialDataList']" :key="item.index" class="text item">-->
      <!--              &lt;!&ndash;              {{item['material']['title']}} ： {{item['value']}} {{item['unit']['title']}}&ndash;&gt;-->
      <!--              {{item['material']?item['material']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column-->
      <!--          label="能源数据"-->
      <!--          width="180">-->
      <!--          <template slot-scope="scope">-->
      <!--            <div v-for="item in scope.row['energyDataList']" :key="item.index" class="text item">-->
      <!--              &lt;!&ndash;              {{item['energy']['title']}} ： {{item['value']}} {{item['unit']['title']}}&ndash;&gt;-->
      <!--              {{item['energy']?item['energy']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column-->
      <!--          label="设备数据"-->
      <!--          width="180">-->
      <!--          <template slot-scope="scope">-->
      <!--            <div v-for="item in scope.row['deviceDataList']" :key="item.index" class="text item">-->
      <!--              {{item['device']?item['device']['title']:''}}-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column-->
      <!--          label="关键工艺参数"-->
      <!--          width="180">-->
      <!--          <template slot-scope="scope">-->
      <!--            <div v-for="item in scope.row['keyParameterDataList']" :key="item.index" class="text item">-->
      <!--              {{item['title']?item['title']:''}}-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column-->
      <!--          label="功能单位"-->
      <!--          width="180">-->
      <!--          <template slot-scope="scope">-->
      <!--            <div v-for="item in scope.row['functionUnitDataList']" :key="item.index" class="text item">-->
      <!--              {{item['title']?item['title']:''}}-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column label="操作">-->
      <!--          <template slot-scope="scope">-->
      <!--            <el-popover-->
      <!--              placement="right"-->
      <!--              trigger="hover">-->
      <!--              <el-table :data="scope.row['outputFrameDataList']">-->
      <!--                <el-table-column-->
      <!--                  label="采集描述"-->
      <!--                  width="180">-->
      <!--                  <template slot-scope="scope">-->
      <!--                    {{scope.row['collectionDescription']}}-->
      <!--                  </template>-->
      <!--                </el-table-column>-->
      <!--                <el-table-column-->
      <!--                  label="环境负荷"-->
      <!--                  width="180">-->
      <!--                  <template slot-scope="scope">-->
      <!--                    <div v-for="item in scope.row['envLoadDataList']" :key="item.index" class="text item">-->
      <!--                      {{item['envLoad']?item['envLoad']['title']:''}} ： {{item['value']}} {{item['unit']?item['unit']['title']:''}}-->
      <!--                    </div>-->
      <!--                  </template>-->
      <!--                </el-table-column>-->
      <!--                <el-table-column-->
      <!--                  label="输出部件"-->
      <!--                  width="180">-->
      <!--                  <template slot-scope="scope">-->
      <!--                    <div v-for="item in scope.row['outputPartDataList']" :key="item.index" class="text item">-->
      <!--                      {{item['title']}}-->
      <!--                    </div>-->
      <!--                  </template>-->
      <!--                </el-table-column>-->
      <!--              </el-table>-->
      <!--              <el-button @click="handleDetail(scope.row)" slot="reference" size="mini">详情</el-button>-->
      <!--            </el-popover>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--      </el-table>-->
    </el-main>
  </el-container>
</template>

<script>
import api from 'api'
import SceneBasic from './widgets/SceneBasic'
import index from "../../router";
export default {
  name: 'SceneModel',
  components: {
    SceneBasic
  },
  data() {
    return {
      sceneModel: {
        title: '',
        parentId: '',
        parent: {},
        processTypeId: '',
        processType: {},
        description: '',
        elementDataList: []
      },
      objectList: [],
      deviceList: [],
      assistList: [],
      paramList: [],
      energyList: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let sceneModelId = to.params['sceneModelId']
      let args = {
        url: '/sceneModel/' + sceneModelId
      }
      api.get(args).then(res => {
        vm.sceneModel = res
        vm.sceneModel.elementDataList.forEach(item => {
          if(item['elementId'] === 1) {
            vm.objectList.push(item)
          } else if (item['elementId'] === 2) {
            vm.deviceList.push(item)
          } else if (item['elementId'] === 3) {
            vm.assistList.push(item)
          } else if (item['elementId'] === 4) {
            vm.paramList.push(item)
          } else if (item['elementId'] === 5) {
            vm.energyList.push(item)
          }
        })
      })
    })
  }
}
</script>

<style scoped lang="scss">
  .model{
    height: 100%;
  }
</style>
