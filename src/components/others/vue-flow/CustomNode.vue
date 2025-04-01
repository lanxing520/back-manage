<template>
  <div class="image-node">
    <NodeResizer :min-width="100" :min-height="30" />

    <Handle type="target" :position="Position.Left" />
    <div class="node-label">{{ data.label }}</div>

    <Handle type="source" :position="Position.Right" />

    <img v-if="data.imageUrl" :src="data.imageUrl" alt="Node Image" class="node-image" />

    <div class="node-handle source" data-handlepos="top" />
    <div class="node-handle target" data-handlepos="bottom" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'
import '@vue-flow/node-resizer/dist/style.css'

const props = defineProps<{
  data: {
    label: string
    imageUrl: string
  }
}>()

onMounted(() => {
  console.log(props.data)
})

defineEmits(['remove'])
</script>

<style scoped>
.image-node {
  border: 2px solid;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  min-height: 30px;
  min-width: 100px;
}

.node-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  display: block;
}

.node-label {
  padding: 5px;
  text-align: center;
  word-break: break-word;
}

.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 4px;
  width: 24px;
  height: 24px;
  z-index: 10;
}

.node-handle {
  width: 10px;
  height: 10px;
  background: #fff;
  border: 2px solid #409eff;
  border-radius: 50%;
  position: absolute;
}

.node-handle.source {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.node-handle.target {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
