<template>
  <CommonWrapper
    class="training-manage"
    title="实训管理"
    :tabs-list="tabsList"
    :active-tab="activeITem"
  >
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

const tabsList = [
  '全部课程',
  '课程运行',
  '实训管理',
  '督学面板',
  '学情分析',
  '公告',
  '答疑讨论区',
  '评论',
]
const activeITem = '全部课程'
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
