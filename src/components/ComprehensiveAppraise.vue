<template>
  <div class="comprehensive-appraise">
    <span class="appraise-title">
      <span class="big">综合评分</span>
      <el-rate
        :model-value="comprehensiveAppraise?.score"
        disabled
        show-score
        score-template="{value}"
        allow-half
      />
      <span class="little">({{ comprehensiveAppraise?.personNumber }}人评价)</span>
    </span>

    <!-- 评论表单 -->
    <div class="appraise-form">
      <textarea v-model="newComment" placeholder="写下你的评论..." rows="3"></textarea>
      <button class="submit-btn" @click="addComment" :disabled="!newComment.trim()">
        发表评论
      </button>
    </div>

    <!-- 评论列表 -->
    <div class="appraise-list">
      <div
        v-for="(appraise, i) in props.appraises"
        :key="appraise.id"
        class="appraise-item"
        :class="{ 'has-replies': appraise.replies.length }"
      >
        <div class="appraise-main">
          <div class="appraise-avatar">
            <img :src="appraise.avatar || defaultAvatar" alt="用户头像" />
          </div>
          <div class="appraise-content">
            <div class="appraise-header">
              <span class="appraise-author">{{ appraise.author }}</span>
              <el-rate
                :model-value="appraise?.score"
                disabled
                show-score
                score-template="{value}"
                allow-half
              />
            </div>
            <div class="appraise-text">{{ appraise.text }}</div>
            <div class="appraise-actions">
              <div>
                <span>{{ appraise.tips }}</span>
                <span class="appraise-time">{{ formatTime(appraise.time) }}</span>
              </div>
              <div class="right">
                <button v-if="0" class="reply-btn" @click="toggleDelete(appraise.id)">删除</button>
                <span class="flex-center button">
                  <i class="icon good-icon"></i>
                  <span>{{ appraise.goodNumber }}</span>
                </span>
                <span class="flex-center button">
                  <i class="icon to-top-icon"></i>
                  <span>置顶</span>
                </span>
                <span class="flex-center button">
                  <i class="icon reply-icon"></i>
                  <button class="reply-btn" @click="toggleReply(appraise.id)">
                    {{ activeReplyId === appraise.id ? '取消回复' : '回复' }}({{
                      appraise.replies.length
                    }})
                  </button>
                </span>
              </div>
            </div>

            <!-- 回复表单 -->
            <div v-if="activeReplyId === appraise.id" class="reply-form">
              <textarea v-model="replyText" placeholder="写下你的回复..." rows="2"></textarea>
              <div class="reply-actions">
                <button class="cancel-btn" @click="cancelReply">取消</button>
                <button
                  class="submit-btn"
                  @click="submitReply(appraise.id)"
                  :disabled="!replyText.trim()"
                >
                  提交回复
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 回复列表 -->
        <div v-if="appraise.replies.length" class="reply-list">
          <div v-for="(reply, i2) in appraise.replies" :key="reply.id" class="reply-item">
            <template v-if="getReplyShow(i, i2)"
              ><div class="reply-avatar">
                <img :src="reply.avatar || defaultAvatar" alt="用户头像" />
              </div>
              <div class="reply-content">
                <div class="reply-header">
                  <span class="reply-author">{{ reply.author }}</span>
                  <span class="reply-time">{{ formatTime(reply.time) }}</span>
                </div>
                <div class="reply-text">{{ reply.text }}</div>
              </div>
            </template>
          </div>
          <!-- 展开/收起按钮 -->
          <button
            v-if="isCollapsedList[i] !== null"
            class="collapse-btn"
            @click="toggleCollapse(i)"
          >
            {{ isCollapsedList[i] ? '收起' : `展开` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import defaultAvatar from '@img/platform/avatar_boy.png'
import { Prop, PropType } from 'vue'

// 定义评论类型
interface Appraise {
  id: string
  author: string
  score: number
  avatar?: string
  text: string
  goodNumber: number
  tips: string
  time: Date | string
  replies: Reply[]
}

interface Reply extends Omit<Appraise, 'replies'> {}

// 组件属性
const props = defineProps({
  comprehensiveAppraise: {
    type: Object as PropType<{
      score: number
      personNumber: number
    }>,
  },

  appraises: {
    type: Array as () => Appraise[],
    default: () => [],
  },
  maxVisibleReplies: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['add-appraise', 'add-reply'])

// 响应式数据
const newComment = ref('')
const replyText = ref('')
const activeReplyId = ref<string | null>(null)
const isCollapsedList = ref<(boolean | null)[]>([])
;(function getCollapsedList() {
  if (props.appraises.length) {
    props.appraises.forEach((e: Appraise) => {
      if (e.replies.length > props.maxVisibleReplies) {
        isCollapsedList.value.push(true)
        return
      }
      isCollapsedList.value.push(null)
    })
  }
})()

const getReplyShow = (i, i2) => {
  if (i2 < props.maxVisibleReplies) {
    return true
  }
  if (isCollapsedList.value[i]) {
    return true
  }
  return false
}

// const visibleComments = computed(() => {
//   if (!isCollapsed.value) return props.appraises
//   return props.appraises.slice(0, props.maxVisibleComments)
// })

// 方法
const addComment = () => {
  if (!newComment.value.trim()) return

  const appraise: Omit<Appraise, 'id'> = {
    author: '当前用户',
    text: newComment.value,
    time: new Date(),
    replies: [],
  }

  emit('add-appraise', appraise)
  newComment.value = ''
}

const toggleReply = (commentId: string) => {
  if (activeReplyId.value === commentId) {
    activeReplyId.value = null
  } else {
    activeReplyId.value = commentId
    replyText.value = ''
  }
}
const toggleDelete = (commentId: string) => {}
const cancelReply = () => {
  activeReplyId.value = null
  replyText.value = ''
}

const submitReply = (commentId: string) => {
  if (!replyText.value.trim()) return

  const reply: Omit<Reply, 'id'> = {
    author: '当前用户',
    text: replyText.value,
    time: new Date(),
  }

  emit('add-reply', { commentId, reply })
  replyText.value = ''
  activeReplyId.value = null
}

const toggleCollapse = (i: number) => {
  isCollapsedList.value[i] = !isCollapsedList.value[i]
  console.log(isCollapsedList.value)
}

const formatTime = (time: Date | string) => {
  const date = typeof time === 'string' ? new Date(time) : time
  return date.toLocaleString()
}
</script>

<style lang="scss" scoped>
$primary-color: #2c81fe;
.comprehensive-appraise {
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  .button {
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
  }

  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: no-repeat center;
    background-size: contain;
  }
  .reply-icon {
    background-image: url('@img/platform/reply_icon.png');
  }
  .good-icon {
    background-image: url('@img/platform/good_icon.png');
  }
  .to-top-icon {
    background-image: url('@img/platform/to_top_icon.png');
  }
}

.appraise-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
  gap: 10px;
  border-bottom: 1px solid #aeaeae;
  padding-bottom: 0.7rem;
  .big {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .little {
    font-size: 0.8rem;
  }
}

.appraise-form {
  margin-bottom: 30px;

  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 10px;

    &:focus {
      outline: none;
      border-color: #4285f4;
      box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
    }
  }
}

.submit-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}

.appraise-list {
  margin-bottom: 20px;
}

.appraise-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;

  &.has-replies {
    margin-bottom: 10px;
  }
}

.appraise-main {
  display: flex;
  gap: 15px;
}

.appraise-avatar,
.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.appraise-content {
  flex: 1;
}

.appraise-header,
.reply-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.appraise-author,
.reply-author {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.appraise-time,
.reply-time {
  font-size: 0.8rem;
  color: #999;
}

.appraise-text,
.reply-text {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #333;
}

.appraise-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 10px;
  .right {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
  }
}

.reply-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;

  &:hover {
    color: #4285f4;
  }
}

.reply-form {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;

  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #f0f0f0;
  }
}

.reply-list {
  margin-top: 15px;
  margin-left: 55px;
  border-left: 2px solid #eee;
  padding-left: 15px;
}

.reply-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  .reply-content {
    flex-grow: 1;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.collapse-btn {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: #4285f4;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 8px 0;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
}
</style>
