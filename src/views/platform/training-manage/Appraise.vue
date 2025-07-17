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

<script setup lang="ts">
import { ref } from 'vue'
import ComprehensiveAppraise from '@/components/ComprehensiveAppraise.vue'
import type { Appraise, AddAppraiseParams, AddAppraiseReplyParams, AppraiseReply } from '@/types/appraise'

interface AppraiseStats {
  score: number
  personNumber: number
}

const total = ref<AppraiseStats>({
  score: 3.7,
  personNumber: 1,
})
const appraises = ref<Appraise[]>([
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

const handleAddComment = (appraise: AddAppraiseParams) => {
  const newComment = {
    id: Date.now().toString(),
    time: new Date(),
    goodNumber: 0,
    replies: [],
    tips: '刚刚评价'
  }
  // appraises.value.unshift(newComment)
  
  // Update total stats
  const totalScore = appraises.value.reduce((sum, a) => sum + a.score, 0)
  total.value = {
    score: parseFloat((totalScore / appraises.value.length).toFixed(1)),
    personNumber: appraises.value.length,
  }
}

const handleAddReply = ({ commentId, reply }: AddAppraiseReplyParams) => {
  const comment = appraises.value.find((c) => c.id === commentId)
  if (comment) {
    const newReply: AppraiseReply = {
      ...reply,
      id: `${commentId}-${comment.replies.length + 1}`,
      time: new Date(),
    }
    comment.replies.push(newReply)
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
