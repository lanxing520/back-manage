<template>
  <CommonWrapper
    class="exam-manage"
    title="考试管理"
    :tabs-list="tabsList"
    :active-tab="activeITem"
    @click-tab="clickTab"
  >
    <ExamManage v-if="activeITem === '考试管理'" />
    <QuestionStore v-if="activeITem === '题库'" />
    <PaperStore v-if="activeITem === '试卷库'" />
    <CategoryManage v-if="activeITem === '分类管理'"/>
  </CommonWrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import ExamManage from './exam/ExamManage.vue'
import QuestionStore from './question-store/index.vue'
import PaperStore from './paper-store/index.vue'
import CategoryManage from './category-manage/index.vue'

const tabsList = ['考试管理', '题库', '试卷库', '分类管理']
const activeITem = ref('试卷库')
const clickTab = (val) => {
  activeITem.value = val
}
</script>
<style lang="scss" scoped>
.exam-manage {
}
</style>
