<template>
  <div class="question-answer">
    <ComprehensiveAppraise
      :comprehensive-appraise="total"
      :appraises="appraises"
      @add-appraise="handleAddComment"
      @add-reply="handleAddReply"
      show-collapse-button
    />
  </div>
</template>

<script setup>
import ComprehensiveAppraise from '@/components/ComprehensiveAppraise.vue'

const total = ref({
  score: 3.7,
  personNumber: 1,
})
const appraises = ref([
  {
    id: '1',
    author: '张三',
    avatar: '',
    text: '这篇文章写得真好！',
    score: 3.5,
    tips: '已学习2小时8分钟时评价',
    goodNumber: 1,
    time: new Date('2023-05-01'),
    replies: [
      {
        id: '1-1',
        author: '李四',
        avatar: '',
        text: '我也这么觉得！',
        time: new Date('2023-05-02'),
      },
    ],
  },
])

const handleAddComment = (appraise) => {
  const newComment = {
    ...appraise,
    id: Date.now().toString(),
  }
  appraises.value.unshift(newComment)
}

const handleAddReply = ({ commentId, reply }) => {
  const appraise = appraises.value.find((c) => c.id === commentId)
  if (appraise) {
    appraise.replies.push({
      ...reply,
      id: `${commentId}-${Date.now()}`,
    })
  }
}
</script>
<style scoped lang="scss">
.question-answer {
  height: calc(100vh - 140px);
  overflow: auto;
  margin-right: 1rem;
}
</style>
