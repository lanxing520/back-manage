<template>
  <CommonWrapper class="training-manage">
    <div class="training-content-wrapper">
      <TrainList />
      <TrainDetail />
    </div>
  </CommonWrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import TrainList from './TrainList.vue'
import TrainDetail from './TrainDetail.vue'
</script>
<style lang="scss" scoped>
.training-manage {
  .training-content-wrapper {
    padding: 1rem;
    height: calc(100vh - 130px);
    overflow: hidden auto;
  }
}
</style>
