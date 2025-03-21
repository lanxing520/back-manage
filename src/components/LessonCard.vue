<template>
  <el-card class="card">
    <div class="card-header">
      <!-- <img src="" alt="" /> -->
    </div>
    <div class="card-content">
      <span class="lesson-name">{{ lessonName }}</span>

      <div class="bottom-wrapper">
        <span>{{ school }}</span>
        <span>
          <img src="@assets/img/main-page/person_icon.png" alt="" />
          <span class="teacher">{{ teacher }}</span>
        </span>
      </div>
    </div>
  </el-card>
</template>
<script setup>
const { lessonName, school, teacher } = defineProps({
  lessonName: {
    type: String,
    default: '课程名',
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
  }
}

:deep(.el-card__body) {
  padding: 0;
  height: 100%;
  display: grid;
  grid-template-rows: 207px auto;
}
</style>
