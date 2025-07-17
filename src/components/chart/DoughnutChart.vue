<template>
  <div ref="chart" class="doughnut-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'


const props = withDefaults(defineProps<{
  data: Array<{ name: string; value: number }>
  colors?: string[]
}>(), {
  colors: () => ['rgba(31, 214, 255, 1)', 'rgba(31, 214, 255, 0.1)']
})
const chart = ref(null) // 用于引用 DOM 元素
let myChart = ref<EChartsType | null>(null) // 用于存储 ECharts 实例

// 初始化图表
const initChart = () => {
  if (myChart.value) {
    myChart.value.dispose() // 销毁之前的实例
  }
  myChart.value = echarts.init(chart.value)

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '0%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },

        labelLine: {
          show: false,
        },
        data: props.data,
      },
    ],
  }
  myChart.value?.setOption(option)
}

// 监听 props 变化，更新图表
watch(
  () => [props.data],
  () => {
    initChart()
  },
  { deep: true },
)

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
})

// 组件卸载时销毁图表
onUnmounted(() => {
  if (myChart.value) {
    myChart.value.dispose()
  }
})
</script>

<style lang="scss" scoped>
.doughnut-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
