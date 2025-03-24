<template>
  <div class="event-list-wrapper">
    <div class="event-item" v-for="(item, i) in props.data">
      <div class="item-time">
        {{ item.time }}
      </div>
      <div class="item-content">
        <span>{{ item.value }}</span>
        <span v-if="item.action" class="veritify-button">待审核</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [
      { time: '2025.3.19-10:25', value: 'XXX提交了XXXX课程作业', action: 0 },

      { time: '2025.3.19-10:25', value: 'XXX提交了XXXX课程作业', action: 1 },
      { time: '2025.3.19-10:25', value: 'XXX提交了XXXX课程作业', action: 1 },
    ],
  },
})
</script>
<style lang="scss" scoped>
.event-list-wrapper {
  min-height: 50px;
  overflow: auto;
  padding-left: 20px;
  .item-time {
    position: relative;
    font-size: 10px;
    margin-top: 0.8em;
    &::before {
      content: '';
      position: absolute;
      right: calc(100% + 1em);
      top: 50%;
      transform: translateY(-50%);
      width: 1em;
      height: 1em;
      background-color: #1983ff;
      border-radius: 50%;
    }
  }

  .item-content {
    position: relative;
    padding: 0.8em;
    background: #ebf0f7;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 12px;
    &::before {
      content: '';
      position: absolute;
      right: calc(100% + 14px);
      top: -8px;
      width: 2px;
      height: calc(100% + 10px);
      background: #ebf0f7;
    }

    .veritify-button {
      display: inline-block;
      padding: 2px 10px;
      color: #1983ff;
      background-color: rgba(133, 187, 255, 0.4);
      border-radius: 5px;
      margin-left: 1em;
      cursor: pointer;
    }
  }
}
</style>
