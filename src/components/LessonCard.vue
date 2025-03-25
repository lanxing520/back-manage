<template>
  <el-card class="card">
    <div class="card-header">
      <!-- <img :src="props.pictureUrl" alt="" /> -->
    </div>
    <div class="card-content">
      <span class="lesson-name">
        <span>{{ props.lessonName }}</span>
        <span
          v-if="props.status"
          class="lesson-status"
          :class="{ 'not-publish': props.status === '未发布' }"
          >{{ props.status }}</span
        >
      </span>

      <div class="bottom-wrapper">
        <span>{{ props.school }}</span>
        <span>
          <img src="@assets/img/main-page/person_icon.png" alt="" />
          <span class="teacher">{{ props.teacher }}</span>
        </span>
      </div>
    </div>
  </el-card>
</template>
<script setup>
const props = defineProps({
  pictureUrl: {
    type: String,
  },

  lessonName: {
    type: String,
    default: '课程名',
  },
  status: {
    default: '',
  },
  school: {
    type: String,
    default: '川北医学院',
  },
  teacher: {
    type: String,
    default: '教师名',
  },
})
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  height: 285px;
  border-radius: 5px;
  cursor: pointer;

  .card-header {
    width: 100%;
    height: 207px;
    border-radius: 5px;
    background: #348dfa;
  }
  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    color: #999999;
    font-size: 14px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 1rem;
  }
  .lesson-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lesson-status {
      display: inline-block;
      width: 70px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #348dfa;
      color: #348dfa;
      text-align: center;
      border-radius: 5px;
      &.not-publish {
        color: #fff;
        background: #348dfa;
      }
    }
  }
}

:deep(.el-card__body) {
  padding: 0;
  height: 100%;
  display: grid;
  grid-template-rows: 207px auto;
}
</style>
