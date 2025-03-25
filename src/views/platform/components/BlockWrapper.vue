<template>
  <div class="block-wrapper">
    <div class="block-title">
      {{ props.title }}
    </div>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.block-wrapper {
  background: #fff;
  height: 100%;
  .block-title {
    padding: 0 0.5rem;
    font-size: 20px;
    color: #000;
  }
  .block-content {
    padding: 0 0.5rem;
  }
}
</style>
