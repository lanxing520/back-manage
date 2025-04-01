<template>
  <div class="custom-edge" @dblclick="onDoubleClick">
    <!-- 边路径 -->
    <!-- <path class="edge-path" :d="props.path" :style="edgeStyle" marker-end="url(#arrow)" /> -->

    <!-- 边标签 -->
    <foreignObject
      v-if="data.label"
      :width="labelWidth"
      :height="labelHeight"
      :x="labelX"
      :y="labelY"
      requiredExtensions="http://www.w3.org/1999/xhtml"
    >
      <div class="edge-label" :style="labelStyle">
        {{ data.label }}
      </div>
    </foreignObject>

    <!-- 删除按钮 -->
    <foreignObject
      :width="30"
      :height="30"
      :x="buttonX"
      :y="buttonY"
      requiredExtensions="http://www.w3.org/1999/xhtml"
    >
      <el-button class="delete-btn" type="danger" size="small" circle @click.stop="$emit('remove')">
        <el-icon><Close /></el-icon>
      </el-button>
    </foreignObject>
  </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import type { EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

defineEmits(['remove'])

// 计算边样式
const edgeStyle = computed(() => ({
  stroke: props.data?.color || '#3366ff',
  strokeWidth: props.data?.width || 2,
  strokeDasharray: props.data?.style === 'dashed' ? '5,5' : 'none',
}))

// 计算标签样式
const labelStyle = computed(() => ({
  color: props.data?.color || '#3366ff',
  fontSize: '12px',
  fontWeight: 'bold',
}))

// 计算标签位置
const labelX = computed(() => (props.sourceX + props.targetX) / 2 - 50)
const labelY = computed(() => (props.sourceY + props.targetY) / 2 - 10)
const labelWidth = 100
const labelHeight = 20

// 计算删除按钮位置
const buttonX = computed(() => (props.sourceX + props.targetX) / 2 - 15)
const buttonY = computed(() => (props.sourceY + props.targetY) / 2 - 15)

// 双击事件
const onDoubleClick = (event: MouseEvent) => {
  event.stopPropagation()

  // if (label !== null) {
  //   props.data = { ...props.data, label }
  // }
}
</script>

<style scoped>
.custom-edge {
  pointer-events: all;
}

.edge-path {
  fill: none;
  pointer-events: stroke;
}

.edge-label {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 3px;
}

.delete-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn :deep(.el-icon) {
  font-size: 12px;
}
</style>
