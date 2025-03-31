<template>
  <CommonWrapper class="training-manage">
    <TrainList />
    <TrainDetail v-if="0" />
  </CommonWrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import TrainList from './TrainList.vue'
import TrainDetail from './TrainDetail.vue'
</script>
<style lang="scss" scoped>
.training-manage {
}
</style>
