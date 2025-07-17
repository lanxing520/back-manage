<template>
  <BlockWrapper class="check-paper" title="题库">
    <div class="top">
      <div class="left">
        <h2>{{ paperInfo.title }}</h2>
        <div>题量：{{ paperInfo.questionNumber }}|总分：{{ paperInfo.totalPoints }}分</div>
        <div>所属分类：{{ paperInfo.category }}</div>
        <div>难易度：{{ paperInfo.difficulty }}</div>
        <div>说明：{{ paperInfo.tips }}</div>
      </div>
      <div class="right">
        <span class="print" @click="toPrint">打印</span>
        <el-checkbox v-model="showAnswer" label="显示答案" size="large" />
        <el-checkbox v-model="showAnswerAnalysis" label="显示答案解析" size="large" />
      </div>
    </div>
    <div class="content">
      <ExaminationPaper
        id="printArea"
        :show-answer="showAnswer"
        :show-answer-analysis="showAnswerAnalysis"
      />
    </div>
  </BlockWrapper>
</template>
<script setup lang="ts">
import BlockWrapper from '../../components/BlockWrapper.vue'
import ExaminationPaper from './ExaminationPaper.vue'
import { usePrint } from '@/utils/usePrint.js'

const { printHtml } = usePrint()
const paperInfo = ref({
  title: '试卷一',
  questionNumber: 11,
  totalPoints: 55,
  difficulty: '易',
  category: '水利工程施工技术仿真实训',
  tips: '测试卷',
})
const showAnswer = ref(true)
const showAnswerAnalysis = ref(true)
const toPrint = () => {
  printHtml('printArea', {
    scanStyles: true,
    // css: 'https://example.com/print-styles.css'
  })
}
</script>
<style lang="scss" scoped>
.check-paper {
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    align-items: center;
    .right {
      .print {
        margin-right: 1rem;
        cursor: pointer;
        &:hover {
          color: #1e76fd;
        }
      }
    }
  }
  .content {
    height: calc(100vh - 335px);
    overflow: auto;
  }
}
</style>
