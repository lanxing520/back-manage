<template>
  <div class="event-list-wrapper">
    <div class="event-item" v-for="(item, i) in props.data">
      <div class="time">
        {{ time }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [{ time: '2025.3.19-10:25', value: 'XXX提交了XXXX课程作业', action: 0 }],
  },
})
</script>
<style lang="scss" scoped>
.event-list-wrapper {
}
</style>
