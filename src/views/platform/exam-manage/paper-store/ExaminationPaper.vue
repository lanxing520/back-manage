<template>
  <div class="exam-paper">
    <section class="question-wrapper" v-for="(item, i1) in examData" :key="i1">
      <div class="question-category-title">
        {{ item.title }}(共 {{ item.questionNumber }}题, {{ item.totalPoints }}分)
      </div>
      <template v-if="item.type === 'radio'">
        <div class="question radio-question" v-for="(q, i2) in item.list">
          <div>{{ q.question }}</div>
          <el-radio-group v-model="myAnswer[i1][i2]">
            <el-radio :value="option.value" v-for="(option, i3) in q.options" :key="i3">{{
              option.label
            }}</el-radio>
          </el-radio-group>
          <div v-if="showAnswer" class="green-text">正确答案：{{ q.answer }}</div>
          <div v-if="showAnswerAnalysis" class="green-text">答案解析：{{ q.answerAnalysis }}</div>
        </div>
      </template>
    </section>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  showAnswer: {
    type: Boolean,
    default: false,
  },
  showAnswerAnalysis: { type: Boolean, default: false },
})
const examData = [
  {
    title: '一.单选题',
    questionNumber: 11,
    totalPoints: 55,
    type: 'radio',
    list: [
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
      {
        question: '1.影响土壤压实效果的因素主要有（）(5分)',
        options: [
          { label: 'A、含水量', value: 'A' },
          { label: 'B、土的可松性', value: 'B' },
          { label: 'C、压文功', value: 'C' },
          { label: 'D、泄水坡度', value: 'D' },
          { label: 'E、每层铺土厚度', value: 'E' },
        ],
        answer: 'A',
        answerAnalysis: 'XXXXXXXXXXX',
      },
    ],
  },
]

const answer = examData.map((e) => {
  const list = e.list.map((item) => '')
  return list
})
const myAnswer = ref(answer)
</script>
<style lang="scss" scoped>
.green-text {
  color: #21b08e;
}
.exam-paper {
  .question-wrapper {
    .question-category-title {
      height: 3rem;
      line-height: 3rem;
      border-top: 1px solid #aeaeae;
      border-bottom: 1px solid #aeaeae;
      margin-top: 1rem;
    }
    .question {
      margin-top: 1rem;
    }
  }
}
</style>
