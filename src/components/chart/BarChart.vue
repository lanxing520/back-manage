<template>
  <div ref="chart" class="bar-chart"></div>
</template>

<script setup>
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  barWidth: {
    type: Number || String,
  },
  colors: {
    type: Array,
    default: () => [
      { offset: 0, color: '#36EBCA' },
      { offset: 1, color: '#1882FF' },
    ],
  },
})

const chart = ref(null) // 用于绑定 DOM 元素
let myChart = null // ECharts 实例

// 初始化图表
const initChart = () => {
  if (!chart.value) return

  // 初始化 ECharts 实例
  myChart = echarts.init(chart.value)

  // 配置项
  const option = {
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.name), // 从 props 获取 x 轴数据
    },

    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dotted' } },
    },
    grid: {
      top: 20,
      bottom: 30,
      right: 20,
    },
    series: [
      {
        name: '',
        type: 'bar',
        data: props.data.map((item) => item.value), // 从 props 获取 y 轴数据
        barWidth: props.barWidth,
        itemStyle: {
          color: {
            type: 'linear', // 线性渐变
            x: 0, // 渐变起始点 x
            y: 0, // 渐变起始点 y
            x2: 0, // 渐变结束点 x
            y2: 1, // 渐变结束点 y
            colorStops: props.colors, // 从 props 获取渐变色
          },
          // shadowBlur: 10, // 阴影模糊大小
          // shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
          // borderRadius: [5, 5, 0, 0], // 圆角
        },
      },
    ],
  }

  // 设置配置项并渲染图表
  myChart.setOption(option)
}

// 监听 props 变化，重新渲染图表
watch(
  () => props.data,
  () => {
    if (myChart) {
      myChart.dispose() // 销毁旧实例
      initChart() // 重新初始化
    }
  },
)

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
})
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
