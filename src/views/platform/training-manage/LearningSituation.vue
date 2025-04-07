<template>
  <div class="learning-situation">
    <div class="out-grid-box">
      <BlockWrapper title="访问统计">
        <LittleInfo :data="totalVisitInfo" :style="infoStyle" />
        <div class="top-filter">
          <div class="select-wrapper">
            <span>时间:</span>
            <el-select v-model="filter.time" :placeholder="'请选择'">
              <el-option
                v-for="option in timeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <el-date-picker
            v-model="filter.timeRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button type="primary">确定</el-button>
        </div>
        <div class="visit-line-chart">
          <LineChart :data="lineData" line-color="#ff1e1e" />
        </div>
      </BlockWrapper>
      <BlockWrapper title="考试概况">
        <div class="up-wrapper">
          <LittleInfo v-for="(item, i) in upExamInfo" :key="i" :data="item" :style="infoStyle" />
        </div>
        <div class="center-chart">
          <RingProgress :data="50" :radius="['55%', '65%']" />
          <div class="center-tips">考试完成进度</div>
        </div>
        <div class="bottom-wrapper">
          <LittleInfo v-for="(item, i) in bottomExamInfo" :key="i" :data="item" />
        </div>
      </BlockWrapper>
      <BlockWrapper title="学习进度"> </BlockWrapper>
    </div>
  </div>
</template>
<script setup>
import BlockWrapper from '../components/BlockWrapper.vue'
import LittleInfo from '@/components/LittleInfo.vue'
import LineChart from '@/components/chart/LineChart.vue'
import RingProgress from '@/components/chart/RingProgress.vue'

const totalVisitInfo = ref({ name: '总访问量', value: 60, unit: '次' })
const upExamInfo = ref([
  { name: '考试场次', value: 0, unit: '次' },
  { name: '参与人数', value: 60, unit: '人' },
])
const bottomExamInfo = ref([
  { name: '未开始', value: 10, unit: '场' },
  { name: '进行中', value: 0, unit: '场' },
  { name: '已结束', value: 0, unit: '场' },
])
const infoStyle = { numberColor: '#4892fe', numberFontSize: '25px' }
const filter = reactive({
  time: '',
  timeRange: [],
})
const timeOptions = [{ label: '时间范围', value: '1' }]
const lineData = ref([
  { name: '03-30', value: 2 },
  { name: '04-11', value: 2 },
  { name: '04-12', value: 25 },
  { name: '04-25', value: 20 },
  { name: '04-30', value: 12 },
  { name: '05-30', value: 25 },
  { name: '06-30', value: 28 },
  { name: '07-30', value: 30 },
])
</script>
<style lang="scss" scoped>
.learning-situation {
  margin-right: 1rem;
  .out-grid-box {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    .top-filter {
      display: flex;
      justify-content: space-between;
      gap: 3rem;
      :deep(.el-range-input) {
        // width: 100px !important;
      }
      .select-wrapper {
        display: flex;
        width: 200px;
        justify-content: space-between;
        align-items: center;
        .el-select {
          width: 150px;
        }
      }
    }
    .visit-line-chart {
      height: 180px;
    }
  }
  .up-wrapper {
    display: flex;
    gap: 2em;
  }
  .center-chart {
    position: relative;
    height: 180px;
    .center-tips {
      position: absolute;
      width: 100%;
      left: 50%;
      bottom: 0;
      font-size: 12px;
      color: #bdbdbd;
      transform: translateX(-50%);
      text-align: center;
      border-bottom: 1px solid #aeaeae;
    }
  }
  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
