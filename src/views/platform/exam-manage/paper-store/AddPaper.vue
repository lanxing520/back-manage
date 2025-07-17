<template>
  <div class="add-paper">
    <BlockWrapper title="新建试卷">
      <CustomForm :form-data="paperData" :form-fields="paperFields" />
      <div class="save-wrapper">
        <el-button class="save" type="primary">保存</el-button>
      </div>

      <div class="bottom-title">试题</div>
      <div class="space-between">
        <div class="select-question">
          <span>组卷方式:</span>
          <el-radio-group v-model="way">
            <el-radio value="手动">手动</el-radio>
            <el-radio value="随机">随机</el-radio>
          </el-radio-group>
        </div>
        <el-button type="primary" @click="chooseQuestion">题库选题</el-button>
      </div>
      <div class="bottom-info">
        题量：{{ testPaperInfo.questionNumber }}, 试卷总分：{{ testPaperInfo.totalPoints }}
      </div>
    </BlockWrapper>
  </div>

  <el-dialog
    class="question-store-dialog"
    v-model="showChooseQuestion"
    align-center
    append-to-body
    title="题库选题"
    width="80%"
  >
    <div class="filter-wrap">
      <CustomForm :form-data="searchData" :form-fields="searchFields" />
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">前往题库</el-button>
    </div>
    <CustomTable
      :columns="columns"
      :data="questionStoreList"
      show-pagination
      show-selection
      @selection-change="handleSelectionChange"
    />
  </el-dialog>
</template>
<script setup lang="ts">
import BlockWrapper from '../../components/BlockWrapper.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'
import CustomTable from '@/components/element-plus/CustomTable.vue'

const paperData = ref({
  name: '',
  difficulty: '',
  category: '',
  passScore: '',
  remark: '',
})
const paperFields = ref([
  {
    label: '名称',
    type: 'input',
    prop: 'name',
  },
  {
    label: '名称',
    type: 'select',
    prop: 'difficulty',
    options: [{ label: 'x', value: 'x' }],
  },
  {
    label: '名称',
    type: 'select',
    prop: 'category',
    options: [{ label: 'x', value: 'x' }],
  },
  {
    label: '名称',
    type: 'input',
    prop: 'passScore',
  },
  {
    label: '名称',
    type: 'textarea',
    prop: 'remark',
    rows: 5,
  },
])
const way = ref('手动')
const testPaperInfo = ref({
  questionNumber: 0,
  totalPoints: 0,
})
const showChooseQuestion = ref(false)
const chooseQuestion = () => {
  showChooseQuestion.value = true
}

const searchData = reactive({
  type: '',
  difficulty: '',
  category: '',
  serach: '',
})
const searchFields = ref([
  { label: '', type: 'select', prop: 'type', options: [{ label: 'x', value: 'x' }] },
  { label: '', type: 'select', prop: 'difficulty', options: [{ label: 'x', value: 'x' }] },
  { label: '', type: 'select', prop: 'category', options: [{ label: 'x', value: 'x' }] },
  { label: '', type: 'input', prop: 'serach' },
])
const columns = [
  {
    prop: 'questionStem',
    label: '题干',
  },
  {
    prop: 'category',
    label: '分类',
    width: '300px',
  },
  {
    prop: 'type',
    label: '单选题',
    width: '150px',
  },
  {
    prop: 'difficulty',
    label: '难度',
    width: '100px',
  },
]
const questionStoreList = ref([
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
  { questionStem: 'XXXXXXXXX', category: '水处理工程技术', type: '单选题', difficulty: '简单' },
])
const handleSelectionChange = (val) => {}
</script>
<style lang="scss" scoped>
.add-paper {
  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1rem;
    .el-form-item:nth-child(1),
    .el-form-item:nth-child(5) {
      grid-column: span 4;
    }
  }
  .save-wrapper {
    width: 100%;
    .save {
      display: block;
      margin: 0 auto;
    }
  }
  .bottom-title {
    position: relative;
    padding-left: 3rem;
    font-size: 1.5rem;
    margin: 1rem 0;
    &::before {
      content: '';
      width: 2rem;
      height: 1px;
      background: #aeaeae;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after {
      content: '';
      width: calc(100% - 7rem);
      height: 1px;
      background: #aeaeae;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .select-question {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;
  }

  .bottom-info {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background-color: #f6f6f6;
    margin-top: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
}
</style>
