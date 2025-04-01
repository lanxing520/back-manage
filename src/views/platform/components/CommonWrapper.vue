<template>
  <section class="common-wrapper">
    <div class="top-part">
      <div v-if="props.title" class="top-title">{{ props.title }}</div>

      <div class="right-user-wrapper">
        <img src="@assets/img/platform/tips_icon.png" alt="" />
        <img src="@assets/img/platform/user_icon.png" alt="" />
        <span>{{ store.userName }}</span>
        <img src="@assets/img/platform/arrow_down_icon.png" alt="" />
      </div>
    </div>
    <section class="content">
      <div v-if="tabsList?.length" class="tabs-container">
        <span
          class="tab-item"
          :class="{ active: ownActiveTab === item }"
          v-for="(item, i) in tabsList"
          :key="i"
          @click="switchTab(item)"
        >
          {{ item }}
        </span>
      </div>
      <slot></slot>
    </section>
  </section>
</template>
<script setup>
import { useUserStore } from '@/stores/index.js'
const store = useUserStore()
const emit = defineEmits(['click-tab'])
const props = defineProps({
  title: {
    default: 'XXX',
  },
  tabsList: {
    type: Array,
  },
  activeTab: {
    type: String,
  },
})

const ownActiveTab = ref(props.activeTab)
const switchTab = (item) => {
  ownActiveTab.value = item
  emit('click-tab', item)
}
</script>
<style lang="scss" scoped>
.common-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .top-part {
    position: relative;
    width: 100%;
    height: 100px;
    .top-title {
      font-size: 24px;
      font-weight: bold;
      padding: 5px 10px;
    }
    .tabs-container {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .right-user-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .content {
    height: calc(100vh - 100px);
    // overflow: auto;
    background: #ebf0f7;
  }
}

:deep(.tabs-container) {
  transform: translateY(-100%);

  .tab-item {
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    &.active {
      color: #1983ff;
      background-color: #ebf0f7;
    }
  }
}
:deep(.content-wrapper) {
  transform: translateY(-1rem);
  padding: 0 1rem;
}
</style>
