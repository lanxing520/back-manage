<template>
  <div class="add-exam">
    <BlockWrapper title="基本信息">
      <CustomForm :form-data="examData" :form-fields="examFields"></CustomForm>
    </BlockWrapper>
    <BlockWrapper title="考试控制">
      <div class="exam-control">
        <span>考试次数:</span>
        <el-radio-group v-model="examData.examTimes">
          <el-radio v-for="option in timesOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
        <el-input
          v-model="moreTimes"
          :disabled="examData.examTimes !== '多次'"
          placeholder="请输入次数"
        />
        <span>次</span>
      </div>
    </BlockWrapper>
    <BlockWrapper title="成绩发布">
      <div class="exam-control">
        <span>发布方式:</span>
        <el-radio-group v-model="examData.publish">
          <el-radio v-for="option in timesOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
        <el-date-picker v-model="customPublishDate" type="date" placeholder="请选择日期" />
      </div>
      <div class="m-l">
        <el-checkbox v-model="isShowRank" label="显示排名" size="large" />
      </div>

      <div class="flex-wrapper">
        <span>添加试卷:</span>
        <el-button type="primary" plain @click="selectExamPaper">选择试卷</el-button>
        <span>(可选择多套试卷,考试时间将会从这些试卷中随机抽取)</span>
      </div>

      <div class="flex-center m-t">
        <el-button type="primary" @click="saveBack">保存并返回</el-button>
      </div>
    </BlockWrapper>
  </div>
  <el-dialog v-model="paperDialogVisible" align-center title="选择试卷" width="80%">
    <div class="top-filter">
      <CustomForm :form-data="filterForm" :form-fields="filterFormFields"></CustomForm>
      <el-button type="primary" @click="search"> 搜索</el-button>
    </div>
    <CustomTable :data="tableData" :columns="tableColumns" :show-selection="true"> </CustomTable>
  </el-dialog>
</template>
<script setup lang="ts">
import BlockWrapper from '../../components/BlockWrapper.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'
import CustomTable from '@/components/element-plus/CustomTable.vue'

const emit = defineEmits(['save-back'])

const examData = reactive({
  name: '',
  category: '',
  timeLimit: '',
  startTime: '',
  endTime: '',
  remark: '',
  examTimes: '',
  publish: '',
})
const moreTimes = ref('')
const customPublishDate = ref('')
const isShowRank = ref(false)
const examFields = [
  {
    label: '考试名称:',
    type: 'input',
    prop: 'name',
  },
  {
    label: '所属分类:',
    type: 'select',
    prop: 'category',
    options: [{ label: 'xxx', value: 'xxx' }],
  },
  {
    label: '考试限时:',
    type: 'input',
    prop: 'timeLimit',
  },
  {
    label: '开始时间:',
    type: 'datetime',
    prop: 'startTime',
  },
  {
    label: '结束时间:',
    type: 'datetime',
    prop: 'endTime',
  },
  {
    label: '备注说明:',
    type: 'textarea',
    prop: 'remark',
    rows: 5,
  },
]
const timesOptions = [
  { label: '不限次数', value: '不限次数' },
  { label: '只允许考一次', value: '1' },
  { label: '允许考多次', value: '多次' },
]
const paperDialogVisible = ref(false)
const filterForm = reactive({ difficulty: '', catergory: '' })
const filterFormFields = [
  { label: '', type: 'select', prop: 'difficulty', options: [{ label: '1', value: '1' }] },
  { label: '', type: 'select', prop: 'catergory', options: [{ label: '2', value: '2' }] },
  { label: '', type: 'input', prop: 'difficulty' },
]

const tableColumns = [
  { prop: 'paperName', label: '试卷名称', width: '300' },
  { prop: 'category', label: '分类' },
  { prop: 'questionNumber', label: '题数' },
  { prop: 'difficulty', label: '难度' },
  { prop: 'score', label: '总分数' },
]
const tableData = ref([
  // { paperName: '', category: '', questionNumber: '', difficulty: '', score: '' },
])
const saveBack = () => {
  emit('save-back')
}
const selectExamPaper = () => {
  paperDialogVisible.value = true
}

const search = () => {}
</script>
<style lang="scss" scoped>
.add-exam {
  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0 1em;
    .el-form-item:nth-child(1),
    .el-form-item:nth-child(6) {
      grid-column: span 4;
    }
  }
  .exam-control {
    display: grid;
    grid-template-columns: 4.5em 20em 10em 1em;
    gap: 0.5em;
  }
  .m-l {
    margin-left: 5em;
  }
  .m-t {
    margin-top: 1rem;
  }
  .flex-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
}

.top-filter {
  display: flex;
  gap: 2em;
  :deep(.el-form) {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    gap: 0 1em;
  }
}
</style>
