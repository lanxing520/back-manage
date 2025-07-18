<template>
  <div v-if="isCoursePage" class="course-page">
    <div class="tab-container">
      <div class="tab-item" v-for="(item, i) in tabList" :key="i" @click="goToEdit(item)">
        {{ item.label }}
      </div>
    </div>
  </div>

  <div v-else class="scene">
    <Scene />
  </div>
</template>

<script setup lang="ts">
import Scene from './scene/index.vue'

const isCoursePage = ref(true)
interface TabItem {
  label: string;
}

const tabList = ref<TabItem[]>([
  {
    label: 'xxxx1',
  },
  {
    label: 'xxxx2',
  },
  {
    label: 'xxxx3',
  },
])
const goToEdit = (item: TabItem) => {
  isCoursePage.value = false
}
</script>

<style scoped lang="scss">
.course-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tab-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .tab-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.5rem;
    }
  }
}

.scene {
  width: 100%;
  height: 100vh;
}
</style>
