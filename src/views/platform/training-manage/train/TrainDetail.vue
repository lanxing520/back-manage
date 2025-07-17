<template>
  <div class="train-chart-wrapper">
    <BlockWrapper title="访问变化">
      <span
        >总访问量:
        <span>{{ visitNumber }}</span>
        <span>次</span>
      </span>
      <LineChart :data="visitChangeData" />
    </BlockWrapper>
    <BlockWrapper title="学生完成率">
      <div class="finish-wrapper">
        <div class="finish-chart-wrapper">
          <RingProgress :data="50" />
          <div class="center-text">1%</div>
        </div>

        <div class="learn-detail">
          <div class="detail-item" v-for="(item, i) in learnDetail" :key="i">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
            <span>次</span>
          </div>
        </div>
      </div>
    </BlockWrapper>
    <BlockWrapper title="学习时长">
      <BarChart :data="learnDuration" :bar-width="20" />
    </BlockWrapper>
    <BlockWrapper title="学生分数分布">
      <DoughnutChart :data="scoreDistribution" />
      <span
        >平均分:
        <span>{{ averageScore }}</span>
      </span>
    </BlockWrapper>
  </div>
</template>
<script setup lang="ts">
import BlockWrapper from '../../components/BlockWrapper.vue'
import LineChart from '@/components/chart/LineChart.vue'
import RingProgress from '@/components/chart/RingProgress.vue'
import BarChart from '@/components/chart/BarChart.vue'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'

const visitNumber = ref(25)
const visitChangeData = ref([
  { name: '5-15', value: 0 },
  { name: '5-16', value: 12 },
  { name: '5-17', value: 10 },
])
const learnDetail = ref([
  { name: '参与人数:', value: 23 },
  { name: '完成人数:', value: 23 },
  { name: '提交报告人数:', value: 0 },
])
const learnDuration = ref([
  { name: '平均', value: 50 },
  { name: '最长', value: 80 },
  { name: '最短', value: 10 },
])
const scoreDistribution = ref([
  { name: '60以下', value: 10 },
  { name: '60~80', value: 40 },
  { name: '80~90', value: 40 },
  { name: '90以上', value: 10 },
])

const averageScore = ref(60)
</script>
<style lang="scss" scoped>
.train-chart-wrapper {
  display: grid;
  // width: calc(100% - 5em);
  grid-template-columns: repeat(2, 1fr);
  // margin: 1em;
  margin-right: 1em;
  .common-wrapper {
    width: 40%;
  }
  .finish-wrapper {
    display: grid;

    height: 200px;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1em;
    // margin-top: 3em;
    .finish-chart-wrapper {
      position: relative;
      .center-text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
