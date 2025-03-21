<template>
  <div ref="chart" class="line-chart"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  lineData: {
    type: Array,
    required: true,
  },
  backgroundGradient: {
    type: Array,
    default: () => ['rgba(31, 214, 255, 1)', 'rgba(31, 214, 255, 0.1)'],
  },
  lineColor: {
    type: String,
    default: '#1ED6FF',
  },
  isSmooth: {
    type: Boolean,
    default: false,
  },
})
const chart = ref(null) // 用于引用 DOM 元素
let myChart = null // 用于存储 ECharts 实例

// 初始化图表
const initChart = () => {
  if (myChart) {
    myChart.dispose() // 销毁之前的实例
  }
  myChart = echarts.init(chart.value)

  const option = {
    xAxis: {
      type: 'category',
      data: props.lineData.map((e) => e.name), // 生成默认的 X 轴标签
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dotted' } },
    },
    grid: {
      top: 20,
      bottom: 30,
    },
    colors: ['#1ED6FF'],
    series: [
      {
        data: props.lineData.map((e) => e.value),
        type: 'line',
        smooth: props.isSmooth, // 是否平滑
        lineStyle: {
          color: props.lineColor, // 折线颜色
        },
        symbol: 'circle',
        symbolSize: 7,
        itemStyle: {
          color: props.lineColor,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.backgroundGradient[0], // 渐变起始颜色
              },
              {
                offset: 1,
                color: props.backgroundGradient[1], // 渐变结束颜色
              },
            ],
          },
        },
      },
    ],
  }

  myChart.setOption(option)
}

// 监听 props 变化，更新图表
watch(
  () => [props.lineData, props.backgroundGradient, props.lineColor, props.isSmooth],
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
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
