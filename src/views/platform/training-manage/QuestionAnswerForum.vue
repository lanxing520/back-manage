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

<script setup lang="ts">
import { ref } from 'vue'
import CommentsSection from '@/components/CommentsSection.vue'
import type { Comment } from '@/types/comment'

const comments = ref<Comment[]>([
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
        id: '1-2',
        author: '王五',
        avatar: '',
        text: '非常同意！',
        time: new Date('2023-05-03'),
      },
      {
        id: '1-3',
        author: '赵六',
        avatar: '',
        text: '学到了很多！',
        time: new Date('2023-05-04'),
      },
      {
        id: '1-4',
        author: '钱七',
        avatar: '',
        text: '感谢分享！',
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

interface NewComment {
  text: string
  author: string
  avatar?: string
}

const handleAddComment = (comment: NewComment) => {
  const newComment: Comment = {
    ...comment,
    id: Date.now().toString(),
    time: new Date(),
    replies: [],
  }
  comments.value.unshift(newComment)
}

interface Reply {
  text: string
  author: string
  avatar?: string
}

interface AddReplyParams {
  commentId: string
  reply: Reply
}

const handleAddReply = ({ commentId, reply }: AddReplyParams) => {
  const comment = comments.value.find((c) => c.id === commentId)
  if (comment) {
    comment.replies.push({
      ...reply,
      id: `${commentId}-${comment.replies.length + 1}`,
      time: new Date(),
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
