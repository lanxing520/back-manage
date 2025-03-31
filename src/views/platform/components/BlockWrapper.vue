<template>
  <div class="common-block-wrapper">
    <div class="common-block-title-wrapper">
      <div>
        <span class="common-block-title">{{ props.title }}</span>
        <span class="block-tips">{{ props.tips }}</span>
      </div>

      <slot name="button"></slot>
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
  tips: {
    type: String,
  },
})
</script>
<style lang="scss" scoped>
.common-block-wrapper {
  background: #fff;
  position: relative;
  background: #fff;
  width: 100%;
  padding: 10px 15px;

  .common-block-title-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    border-bottom: 1px solid #aeaeae;
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;

    .common-block-title {
      font-size: 24px;
    }
    .block-tips {
      color: #aeaeae;
      font-size: 16px;
      margin-left: 1.5em;
    }
  }
  .block-content {
    padding: 0 0.5rem;
  }
}
</style>
