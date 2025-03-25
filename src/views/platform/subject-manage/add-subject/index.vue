<template>
  <common-wrapper title="新建课程">
    <div class="tabs-container">
      <span
        class="tab-item"
        :class="{ active: activeTab === item }"
        v-for="(item, i) in tabsList"
        :key="i"
        @click="switchTab(item)"
      >
        {{ item }}
      </span>
    </div>

    <BasicContent v-show="activeTab === '填写基本内容'" />
    <TeacherTeam v-show="activeTab === '添加教学团队'" />
  </common-wrapper>
</template>
<script setup>
import CommonWrapper from '../../components/CommonWrapper.vue'
import BasicContent from './BasicContent.vue'
import TeacherTeam from './TeacherTeam.vue'

const tabsList = ['填写基本内容', '添加教学团队', '填写在线教程', '填写线下教程', '设置课程推广']
const activeTab = ref('填写基本内容')
const switchTab = (item) => {
  activeTab.value = item
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
}
</style>
