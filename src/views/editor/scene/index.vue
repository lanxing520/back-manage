<template>
  <section
    v-loading="loading"
    element-loading-background="rgba(35, 39, 46, 0.7)"
    element-loading-text="Loading..."
    class="experiment-simulation"
  >
    <canvas class="canvas" ref="renderCanvas"></canvas>
   
  </section>
</template>

<script setup lang="ts">
import { initScene, loading, dispose } from "../methods/common/initScene"

const isInited = ref(false)
const renderCanvas = useTemplateRef<HTMLCanvasElement>("renderCanvas")


onMounted(async () => {
  if (!renderCanvas.value) return


  try {
    await initScene(renderCanvas.value)
    isInited.value = true
  } catch (error) {
    console.error("初始化 Babylon 场景失败:", error)
  }
})

onBeforeUnmount(() => {
  dispose()
})
</script>

<style scoped lang="scss">
.experiment-simulation {
  position: relative;
  width: 100%;
  height: calc(100vh - 5rem);

  .canvas {
    width: 100vw;
    height: calc(100vh - 3rem);
    display: block;
    transform: translate(-1rem, -1rem);
    border: none;
  }
  .canvas:focus {
    outline: none;
  }
}
</style>
