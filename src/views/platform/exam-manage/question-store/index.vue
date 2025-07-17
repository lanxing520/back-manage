<template>
  <div class="content-wrapper">
    <BlockWrapper v-if="!showAdd" title="题库">
      <div class="top-button-group">
        <el-button
          type="primary"
          v-for="(item, i) in buttonList"
          :key="i"
          @click="topButtonClick(item)"
          >{{ item }}</el-button
        >
      </div>
      <div class="filter-wrapper">
        <CustomForm :form-data="filterForm" :form-fields="filterFormFields"></CustomForm>
        <!-- <el-button type="primary" @click="search"> 搜索</el-button> -->
      </div>
      <div class="question-wrapper">
        <div class="question-item" v-for="(item, i) in questionList" :key="i">
          <div class="up">
            <span class="type">【{{ item.questionType }}】</span>
            <span>{{ item.question }}</span>
          </div>
          <div class="down">
            <span>难易:{{ item.difficulty }}</span>
            <span>分类:{{ item.catergory }}</span>
            <span class="time">上次更新:{{ item.lastRenew }}</span>
          </div>
          <div class="right-icon-wrapper">
            <div class="icon" v-for="(item, i) in 4"></div>
          </div>
        </div>
      </div>
    </BlockWrapper>
    <AddPaper v-if="showAdd"></AddPaper>
  </div>
</template>
<script setup lang="ts">
import BlockWrapper from '../../components/BlockWrapper.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'
import AddPaper from './AddPaper.vue'

const buttonList = ['批量导入', '导出试题', '新增试题', '批量删除']
const filterForm = reactive({ questionType: '', difficulty: '', catergory: '', search: '' })
const filterFormFields = [
  {
    label: '选择题型:',
    type: 'select',
    prop: 'questionType',
    options: [{ label: '1', value: '1' }],
    placeholder: '请选择',
  },
  {
    label: '难易度:',
    type: 'select',
    prop: 'difficulty',
    options: [{ label: '1', value: '1' }],
    placeholder: '请选择',
  },
  {
    label: '所属分类:',
    type: 'select',
    prop: 'catergory',
    options: [{ label: '2', value: '2' }],
    placeholder: '请选择',
  },
  { label: '', type: 'input', prop: 'search', placeholder: '按标题搜索' },
]
const questionList = ref([
  {
    question: '控制出水塘多为()',
    questionType: '单选题',
    difficulty: '简单',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
  {
    question:
      '某水厂日产水量为50000m³/d,所用混凝剂为聚合氯化铝,需要配置成5%的浓度,混凝剂投加量为30ml/L,每天配药3次。计算所需溶液池容积为（）m³',
    questionType: '多选题',
    difficulty: '困难',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
  {
    question: '控制出水塘多为()',
    questionType: '单选题',
    difficulty: '简单',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
  {
    question:
      '某水厂日产水量为50000m³/d,所用混凝剂为聚合氯化铝,需要配置成5%的浓度,混凝剂投加量为30ml/L,每天配药3次。计算所需溶液池容积为（）m³',
    questionType: '多选题',
    difficulty: '困难',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
  {
    question: '控制出水塘多为()',
    questionType: '单选题',
    difficulty: '简单',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
  {
    question:
      '某水厂日产水量为50000m³/d,所用混凝剂为聚合氯化铝,需要配置成5%的浓度,混凝剂投加量为30ml/L,每天配药3次。计算所需溶液池容积为（）m³',
    questionType: '多选题',
    difficulty: '困难',
    catergory: '水处理工程技术虚拟仿真实训',
    lastRenew: '2022-12-30 14:12:00',
  },
])
const showAdd = ref(false)

const topButtonClick = (item) => {
  switch (item) {
    case '批量导入':
      break

    case '导出试题':
      break
    case '新增试题':
      showAdd.value = true
      break
    case '批量删除':
      break
  }
}
</script>
<style lang="scss" scoped>
.top-button-group {
  position: absolute;
  right: 1em;
  top: 1em;
  display: flex;
  gap: 0.5em;
}

.filter-wrapper {
  display: flex;
  gap: 2em;
  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0 1em;
    margin-top: 10px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.question-wrapper {
  height: calc(100vh - 240px);
  overflow: hidden auto;
  .question-item {
    position: relative;
    padding: 1rem;
    border: 1px solid #aeaeae;
    margin-top: 1rem;
    .up {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 80%;
      .type {
        text-wrap: nowrap;
      }
    }
    .down {
      margin-top: 10px;
      display: flex;
      gap: 1.5rem;
      .time {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        color: #aeaeae;
        font-size: 14px;
      }
    }
    .right-icon-wrapper {
      position: absolute;
      display: flex;
      gap: 1.5rem;
      right: 3rem;
      top: 50%;
      transform: translateY(-50%);
      .icon {
        width: 15px;
        height: 15px;
        background: #aeaeae;
      }
    }
  }
}
</style>
