<template>
  <CommonWrapper
    class="training-manage"
    title="实训管理"
    :tabs-list="tabsList"
    :active-tab="activeTab"
    @click-tab="clickTab"
  >
    <div class="content-wrapper">
      <AllCourse v-if="activeTab === '全部课程'" />
      <CourseOperation v-if="activeTab === '课程运行'" />
      <TrainList v-if="activeTab === '实训管理'" />
      <InspectorPanel v-if="activeTab === '督学面板'" />
      <LearningSituation v-if="activeTab === '学情分析'" />
      <Announcement v-if="activeTab === '公告'" />
      <QuestionAnswerForum v-if="activeTab === '答疑讨论区'" />
      <Appraise v-if="activeTab === '评价'" />
    </div>
  </CommonWrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import TrainList from './train/TrainList.vue'
import AllCourse from './AllCourse.vue'
import CourseOperation from './CourseOperation.vue'
import InspectorPanel from './InspectorPanel.vue'
import LearningSituation from './LearningSituation.vue'
import Announcement from './Announcement.vue'
import QuestionAnswerForum from './QuestionAnswerForum.vue'
import Appraise from './Appraise.vue'

const tabsList = [
  '全部课程',
  '课程运行',
  '实训管理',
  '督学面板',
  '学情分析',
  '公告',
  '答疑讨论区',
  '评价',
]
const activeTab = ref('评价')
const clickTab = (item) => {
  activeTab.value = item
}
</script>
<style lang="scss" scoped>
.content-wrapper {
  padding-right: 0;
}
.training-manage {
}
</style>
