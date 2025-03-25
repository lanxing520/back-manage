<template>
  <div v-if="!addPage">
    <common-wrapper title="课程管理">
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
      <el-button class="add-button" type="primary" plain @click="showAddDialog = true"
        >+新建课程</el-button
      >
      <div class="subject-container">
        <LessonCard
          v-for="(item, i) in list"
          :key="i"
          :lesson-name="item.lessonName"
          :picture-url="item.pictureUrl"
          :school="item.school"
          :status="item.status"
          :teacher="item.teacher"
        />
      </div>
    </common-wrapper>
    <el-dialog
      v-model="showAddDialog"
      align-center
      title="新建课程"
      width="500"
      @close="selectedSubject = ''"
    >
      <div class="new-subject-wrapper">
        <div
          class="new-subject-item"
          :class="{ active: item === selectedSubject }"
          @click="onChooseSubject(item)"
          v-for="(item, i) in newSubjectList"
          :key="i"
        >
          <!-- <i class="subject-icon" :style="`background-image:url(${images[i]})`"></i> -->
          <i class="subject-icon"></i>
          <div class="subject-name">{{ item }}</div>
        </div>
      </div>

      <template #footer>
        <div class="footer-wrapper">
          <span>{{ selectedSubject }}</span>
          <el-button type="primary" @click="onConfirmAdd">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <AddSubject v-else />
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import LessonCard from '@/components/LessonCard.vue'
import AddSubject from './add-subject/index.vue'

// import { getSubjectList } from '@/api/subject/index'
const images = [
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
]
const tabsList = ['全部课程', '我教的课']
const newSubjectList = ['进阶式课程', '微课程', 'VR课程']
const activeTab = ref('全部课程')
const showAddDialog = ref(false)
const addPage = ref(false)
const selectedSubject = ref(null)

const list = ref([])
const totalSubjectList = [
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
  },
]
const mySubjectList = [
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '已发布',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '未发布',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '已发布',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '未发布',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '已发布',
    school: '川北医学院',
    teacher: '教师名',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    status: '未发布',
    school: '川北医学院',
    teacher: '教师名',
  },
]
onMounted(async () => {
  // const list = await getSubjectList()
  list.value = totalSubjectList
})

const switchTab = (item) => {
  activeTab.value = item
  if (item === '全部课程') {
    list.value = totalSubjectList
  } else {
    list.value = mySubjectList
  }
}
const onChooseSubject = (item) => {
  selectedSubject.value = item
}
const onConfirmAdd = () => {
  addPage.value = true
}
</script>
<style lang="scss" scoped>
.add-button {
  position: absolute;
  top: 120px;
  right: 3%;
  width: 127px;
  height: 43px;
  font-size: 20px;
}
.subject-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  // width: 100%;
  margin: 0 3%;
  margin-top: 50px;
  padding-right: 5px;
  height: calc(100vh - 200px);
  overflow: auto;
}

.new-subject-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 2em;
  align-items: center;
  .new-subject-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    gap: 1em;
    border-radius: 5px;
    background-color: #ebf0f7;
    cursor: pointer;

    &.active {
      color: #1983ff;
      border: 1px solid #1983ff;
    }
    .subject-icon {
      display: inline-block;
      width: 63px;
      height: 63px;
      // background: no-repeat center;
      background: red;
      background-size: contain;
    }
    .subject-name {
      text-align: center;
    }
  }
}
.footer-wrapper {
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  font-size: 18px;
  margin-top: 1em;
}
</style>
