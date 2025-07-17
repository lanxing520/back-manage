<template>
  <div class="account-info">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>更换头像</span>
        </div>
      </template>
      <AvatarUpload />
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>账号信息</span>
        </div>
      </template>
      <el-descriptions label-width="110px" border>
        <el-descriptions-item label="用户名">{{ accountInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="用户ID">{{ accountInfo.userId }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ accountInfo.gender }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ encryptedPhone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ encryptedEmail }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ accountInfo.registerTime }}</el-descriptions-item>
        <el-descriptions-item label="上次登录时间">{{
          accountInfo.lastLoginTime
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>教师资料</span>
          <el-button type="primary" @click="editTeacherInfo">编辑</el-button>
        </div>
      </template>
      <el-form :model="teacherInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="teacherInfo.name" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="teacherInfo.title" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="teacherInfo.bio" type="textarea" :rows="4" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item v-if="isEditing">
          <el-button type="primary" @click="saveTeacherInfo">保存</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import AvatarUpload from './AvatarUpload.vue'

const accountInfo = ref({
  username: 'teacher123',
  userId: 'T20230001',
  gender: '男',
  phone: '13800138000',
  email: 'teacher@mool.edu',
  registerTime: '2023-01-15 10:30:45',
  lastLoginTime: '2023-06-20 15:20:10',
})

const teacherInfo = ref<TeacherInfo>({
  name: '张老师',
  title: '副教授',
  bio: '计算机科学专业，主要研究方向为人工智能与机器学习。',
})

const isEditing = ref(false)
interface TeacherInfo {
  name: string
  title: string
  bio: string
}

let originalTeacherInfo: TeacherInfo

const encryptedPhone = computed(() => {
  const phone = accountInfo.value.phone
  return phone ? `${phone.substring(0, 3)}****${phone.substring(7)}` : ''
})

const encryptedEmail = computed(() => {
  const email = accountInfo.value.email
  if (!email) return ''
  const atIndex = email.indexOf('@')
  if (atIndex < 3) return email
  return `${email.substring(0, 3)}****${email.substring(atIndex)}`
})

const editTeacherInfo = () => {
  originalTeacherInfo = { ...teacherInfo.value }
  isEditing.value = true
}

const saveTeacherInfo = () => {
  // 这里应该调用API保存数据
  isEditing.value = false
  ElMessage.success('教师资料已更新')
}

const cancelEdit = () => {
  if (originalTeacherInfo) {
    teacherInfo.value = { ...originalTeacherInfo }
    isEditing.value = false
  } else {
    isEditing.value = false
  }
}
</script>

<style scoped>
.account-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
