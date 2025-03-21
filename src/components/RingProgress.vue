<template>
  <div ref="chart" class="ring-progress"></div>
</template>

<script setup>
import * as echarts from 'echarts'

// 获取 DOM 元素
const chart = ref(null)
let myChart = null

// 定义 props
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  progressColor: {
    type: String,
    default: '#1983FF',
  },
  radius: {
    default: ['85%', '95%'], // 内半径和外半径
  },
  angelRange: {
    default: [270, -90], // 起始角度,结束角度
  },
})

// 初始化图表
const initChart = () => {
  if (chart.value) {
    myChart = echarts.init(chart.value)

    const option = {
      series: [
        {
          type: 'pie',
          radius: props.radius,
          center: ['50%', '50%'], // 圆心位置
          startAngle: props.angelRange[0],
          endAngle: props.angelRange[1],
          data: [
            {
              value: props.progress,
              name: '进度',
              itemStyle: {
                color: props.progressColor, // 进度条颜色
              },
            },
            {
              value: 100 - props.progress,
              name: '剩余',
              itemStyle: {
                color: '#E6E6E6', // 背景颜色
              },
            },
          ],
          label: {
            show: false, // 隐藏标签
          },
        },
      ],
    }

    myChart.setOption(option)
  }
}

// 监听 progress 变化
watch(
  () => props.progress,
  () => {
    if (myChart) {
      myChart.setOption({
        series: [
          {
            data: [{ value: props.progress }, { value: 100 - props.progress }],
          },
        ],
      })
    }
  },
)

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
})

// 组件卸载时销毁图表
onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style scoped>
.ring-progress {
  width: 100%;
  height: 100%;
  min-height: 100px;
}
</style>
