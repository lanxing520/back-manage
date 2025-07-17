<template>
  <div class="question-answer">
    <CommentsSection
      :comments="comments"
      @add-comment="handleAddComment"
      @add-reply="handleAddReply"
      show-collapse-button
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentsSection from '@/components/CommentsSection.vue'

const comments = ref([
  {
    id: '1',
    author: '张三',
    avatar: '',
    text: '这篇文章写得真好！',
    time: new Date('2023-05-01'),
    replies: [
      {
        id: '1-1',
        author: '李四',
        avatar: '',
        text: '我也这么觉得！',
        time: new Date('2023-05-02'),
      },
      {
        id: '1-1',
        author: '李四',
        avatar: '',
        text: '我也这么觉得！',
        time: new Date('2023-05-02'),
      },
      {
        id: '1-1',
        author: '李四',
        avatar: '',
        text: '我也这么觉得！',
        time: new Date('2023-05-02'),
      },

      {
        id: '1-1',
        author: '李四',
        avatar: '',
        text: '我也这么觉得！',
        time: new Date('2023-05-02'),
      },
    ],
  },
  {
    id: '2',
    author: '王五',
    text: '学到了很多新知识，感谢分享！',
    time: new Date('2023-05-03'),
    replies: [],
  },
])

const handleAddComment = (comment) => {
  const newComment = {
    ...comment,
    id: Date.now().toString(),
  }
  comments.value.unshift(newComment)
}

const handleAddReply = ({ commentId, reply }) => {
  const comment = comments.value.find((c) => c.id === commentId)
  if (comment) {
    comment.replies.push({
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
