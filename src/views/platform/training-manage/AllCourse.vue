<template>
  <div class="all-course">
    <el-button class="add-button" type="primary" plain @click="showAddDialog = true"
      >+新建课程</el-button
    >
    <div class="subject-container">
      <LessonCard 
  v-for="(item, i) in list" 
  :key="item.id" 
  :id="item.id"
  :lesson-name="item.lessonName"
  :status="item.status"
  :school="item.school"
  :teacher="item.teacher"
  :picture-url="item.pictureUrl"
  @click="clickCard(item)" 
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
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import LessonCard from '@/components/LessonCard.vue'
import type { FormField } from '@/types/form-field'
import CustomForm from '@/components/element-plus/CustomForm.vue'
// import { getSubjectList } from '@/api/subject/index'

const images = [
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
  new URL('@/assets/img/platform/subject/XX.png', import.meta.url).href,
]

interface LabInfo {
  id: string
  name: string
  appointmentTimeList: string[]
}

interface FormData {
  name: string
  description: string
  lab: string
}

const labInfo = reactive<LabInfo>({
  id: '123',
  name: '实验室1',
  appointmentTimeList: ['2023-01-01 09:00-12:00', '2023-01-01 14:00-17:00']
})

const data = reactive<FormData>({
  name: '',
  description: '',
  lab: ''
})

const formFields: FormField[] = [
  {
    label: '课程名称',
    type: 'input',
    prop: 'name',
    placeholder: '请输入课程名称'
  },
  {
    label: '课程描述',
    type: 'textarea',
    prop: 'description',
    placeholder: '请输入课程描述',
    rows: 4
  },
  {
    label: '选择实验室',
    type: 'custom',
    prop: 'lab',
    slotName: 'lab'
  }
]

const showAddDialog = ref(false)
const addPage = ref(true)
const selectedSubject = ref(null)

interface CourseItem {
  id: string
  name: string
  description: string
  status: string
  school: string
  teacher: string
  pictureUrl?: string
  lessonName: string
  onClick?: () => void
}

const list = ref<CourseItem[]>([])
const totalSubjectList: CourseItem[] = [
  {
    id: '1',
    name: '课程1',
    lessonName: '课程1',
    description: '课程描述1',
    status: '进行中',
    school: '学校1',
    teacher: '教师1',
  },
  {
    id: '2',
    name: '课程2',
    lessonName: '课程2',
    description: '课程描述2',
    status: '已结束',
    school: '学校2',
    teacher: '教师2',
  },
  {
    id: '3',
    name: '课程3',
    lessonName: '课程3',
    description: '课程描述3',
    status: '未发布',
    school: '川北医学院',
    teacher: '教师名',
  },
]

const clickCard = (item: CourseItem) => {
  console.log('Selected course:', item)
}

onMounted(async () => {
  // const list = await getSubjectList()
  list.value = totalSubjectList
})

const onConfirmAdd = async () => {
  try {
    // Add your form submission logic here
    showAddDialog.value = false
  } catch (error) {
    console.error('Failed to add course:', error)
  }
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
