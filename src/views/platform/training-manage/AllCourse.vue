<template>
  <div class="all-course">
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
  </div>
  <el-dialog
    v-model="showAddDialog"
    align-center
    title="实验室-新增"
    width="60%"
    @close="selectedSubject = ''"
  >
    <div class="new-subject-wrapper">
      <CustomForm :form-data="data" :form-fields="formFields">
        <template #lab="{ props }">
          <div>
            <el-button type="primary">点击选择实验室</el-button>
          </div>
          <div>我的预约</div>
          <div class="grid-box">
            <img src="" alt="" />

            <div>
              <span>{{ labInfo.name }}(ID:{{ labInfo.id }})</span>
              <div class="appointment-wrapper">
                <span>可预约时间:</span>
                <div class="d-g-2">
                  <div v-for="(item, i) in labInfo.appointmentTimeList" :key="i">{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
        </template></CustomForm
      >
    </div>

    <template #footer>
      <div class="footer-wrapper">
        <el-button @click="onConfirmAdd">取消</el-button>
        <el-button type="primary" @click="onConfirmAdd">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import LessonCard from '@/components/LessonCard.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'
// import { getSubjectList } from '@/api/subject/index'
const images = [
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
]

const labInfo = ref({
  name: '带电作业实训室',
  id: '16',
  appointmentTimeList: [
    '2025-04-02周三08:00~17:30',
    '2025-04-02周三08:00~17:30',
    '2025-04-02周三08:00~17:30',
    '2025-04-02周三08:00~17:30',
    '2025-04-02周三08:00~17:30',
    '2025-04-02周三08:00~17:30',
  ],
})
const data = ref({
  theme: '',
  type: '',
  theme: '',
  speaker: '',
  assist: '',
  lab: '',
  requirement: '',
})
const formFields = [
  { label: '课程主题:', type: 'input', prop: 'theme', placeholder: '请输入课程主题' },
  { label: '任务类型:', type: 'input', prop: 'type', placeholder: '请输入任务类型' },
  { label: '主讲人:', type: 'input', prop: 'speaker', placeholder: '请输入主讲人' },
  { label: '助教:', type: 'input', prop: 'assist', placeholder: '请输入助教' },
  { label: '实验室:', type: 'custom', prop: 'lab' },
  {
    label: '教学要求:',
    type: 'textarea',
    prop: 'requirement',
    placeholder: '请输入教学要求',
    rows: 5,
  },
]

const showAddDialog = ref(false)
const addPage = ref(true)
const selectedSubject = ref(null)

const list = ref([])
const totalSubjectList = [
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '已发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
  {
    pictureUrl: '',
    lessonName: '课程名',
    school: '川北医学院',
    teacher: '教师名',
    status: '未发布',
  },
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

onMounted(async () => {
  // const list = await getSubjectList()
  list.value = totalSubjectList
})

const onConfirmAdd = () => {
  addPage.value = true
}
</script>
<style lang="scss" scoped>
.all-course {
  position: relative;
  .add-button {
    position: absolute;
    top: -55px;
    right: 3%;
    width: 127px;
    height: 43px;
    font-size: 20px;
  }
}

.subject-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  // width: 100%;
  padding: 0 3%;
  margin-top: 55px;
  padding-right: 15px;
  height: calc(100vh - 200px);
  overflow: auto;
}

.new-subject-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 2em;
  align-items: center;
  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 1em;
    .el-form-item {
      // margin-bottom: 5px;
      // .el-input {
      //   width: 250px;
      // }

      &:nth-child(5) {
        grid-column: span 2;
        .el-form-item__content {
          display: block;
        }
      }

      &:nth-child(6) {
        grid-column: span 2;
      }
    }
  }
  .grid-box {
    display: grid;
    grid-template-columns: 100px auto;
    padding: 10px;
    gap: 10px;
    border: 1px solid var(--el-border-color);
    .appointment-wrapper {
      display: grid;
      grid-template-columns: 6em auto;
      background-color: rgba(230, 230, 230, 0.2);
      padding: 1em 1.5em;
      .d-g-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2em;
      }
    }
  }
}
.footer-wrapper {
  display: flex;
  justify-content: right;
  height: 30px;
  align-items: center;
  font-size: 18px;
  margin-top: 1em;
  padding-right: 20px;
}
</style>
