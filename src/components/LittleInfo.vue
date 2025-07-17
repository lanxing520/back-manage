<template>
  <div class="little-info">
    <span class="name">{{ data.name }}:</span>
    <span class="value">{{ data.value }}</span>
    <span v-if="data?.unit" class="unit">{{ data.unit }}</span>
  </div>
</template>
<script setup lang="ts">
interface PropType {
  data: {
    name: string
    value: number | string
    unit?: string
  }
  style?: {
    numberColor?: string
    numberFontSize?: string
  }
}

const { data, style } = defineProps<PropType>()
</script>
<style lang="scss" scoped>
.little-info {
  display: inline-block;
  .name {
    margin-right: 0.5em;
  }
  .value {
    color: v-bind('style?.numberColor');
    font-size: v-bind('style?.numberFontSize');
  }
  .unit {
    color: v-bind('style?.numberColor');
    margin-left: 3px;
  }
}
</style>
