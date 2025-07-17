<template>
  <div class="home-block-wrapper">
    <div class="home-block-title">
      {{ props.title }}
    </div>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.home-block-wrapper {
  background: #fff;
  height: 100%;
  .home-block-title {
    padding: 5px 0.8rem;
    font-size: 20px;
    color: #000;
  }
  .block-content {
    padding: 0 0.5rem;
  }
}
</style>
