<template>
  <div class="account-security">
    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>手机号验证</span>
          <el-tag :type="accountInfo.phone ? 'success' : 'danger'">
            {{ accountInfo.phone ? '已绑定' : '未绑定' }}
          </el-tag>
        </div>
      </template>
      <div class="security-content">
        <div class="security-info">
          <span>当前手机号: {{ encryptedPhone }}</span>
        </div>
        <el-button type="primary" @click="showPhoneDialog = true">
          {{ accountInfo.phone ? '更换手机号' : '绑定手机号' }}
        </el-button>
      </div>
    </el-card>

    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>邮箱验证</span>
          <el-tag :type="accountInfo.email ? 'success' : 'danger'">
            {{ accountInfo.email ? '已绑定' : '未绑定' }}
          </el-tag>
        </div>
      </template>
      <div class="security-content">
        <div class="security-info">
          <span>当前邮箱: {{ encryptedEmail }}</span>
        </div>
        <el-button type="primary" @click="showEmailDialog = true">
          {{ accountInfo.email ? '更换邮箱' : '绑定邮箱' }}
        </el-button>
      </div>
    </el-card>

    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>修改登录密码</span>
        </div>
      </template>
      <div class="security-content">
        <el-button type="primary" @click="showPasswordDialog = true">修改密码</el-button>
      </div>
    </el-card>

    <!-- 手机号绑定/更换对话框 -->
    <el-dialog
      v-model="showPhoneDialog"
      :title="accountInfo.phone ? '更换手机号' : '绑定手机号'"
      width="500px"
    >
      <el-form :model="phoneForm" label-width="100px">
        <el-form-item label="新手机号" required>
          <el-input v-model="phoneForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="验证码" required>
          <div class="verify-code">
            <el-input v-model="phoneForm.code" placeholder="请输入验证码" />
            <el-button type="primary" :disabled="codeCountdown > 0" @click="sendPhoneCode">
              {{ codeCountdown > 0 ? `${codeCountdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPhoneDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPhoneForm">确认</el-button>
      </template>
    </el-dialog>

    <!-- 邮箱绑定/更换对话框 -->
    <el-dialog
      v-model="showEmailDialog"
      :title="accountInfo.email ? '更换邮箱' : '绑定邮箱'"
      width="500px"
    >
      <el-form :model="emailForm" label-width="100px">
        <el-form-item label="新邮箱" required>
          <el-input v-model="emailForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="验证码" required>
          <div class="verify-code">
            <el-input v-model="emailForm.code" placeholder="请输入验证码" />
            <el-button type="primary" :disabled="emailCodeCountdown > 0" @click="sendEmailCode">
              {{ emailCodeCountdown > 0 ? `${emailCodeCountdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEmailDialog = false">取消</el-button>
        <el-button type="primary" @click="submitEmailForm">确认</el-button>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="showPasswordDialog" title="修改密码" width="500px">
      <el-form
        :model="passwordForm"
        label-width="100px"
        :rules="passwordRules"
        ref="passwordFormRef"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="验证方式" prop="verifyMethod">
          <el-radio-group v-model="passwordForm.verifyMethod">
            <el-radio label="phone">手机验证</el-radio>
            <el-radio label="email">邮箱验证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="passwordForm.verifyMethod === 'phone'"
          label="手机验证码"
          prop="phoneCode"
        >
          <div class="verify-code">
            <el-input v-model="passwordForm.phoneCode" placeholder="请输入验证码" />
            <el-button type="primary" @click="sendPasswordPhoneCode">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item
          v-if="passwordForm.verifyMethod === 'email'"
          label="邮箱验证码"
          prop="emailCode"
        >
          <div class="verify-code">
            <el-input v-model="passwordForm.emailCode" placeholder="请输入验证码" />
            <el-button type="primary" @click="sendPasswordEmailCode">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPasswordForm">确认修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface AccountInfo {
  phone: string
  email: string
}

const accountInfo = ref<AccountInfo>({
  phone: '13800138000',
  email: 'teacher@mool.edu',
})

// 手机号相关
interface PhoneForm {
  phone: string
  code: string
}

const showPhoneDialog = ref(false)
const phoneForm = reactive<PhoneForm>({
  phone: '',
  code: '',
})
const codeCountdown = ref(0)
let phoneTimer: number | null = null

// 邮箱相关
interface EmailForm {
  email: string
  code: string
}

const showEmailDialog = ref(false)
const emailForm = reactive<EmailForm>({
  email: '',
  code: '',
})
const emailCodeCountdown = ref(0)
let emailTimer: number | null = null

// 密码相关
interface PasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  verifyMethod: 'phone' | 'email'
  phoneCode: string
  emailCode: string
}

const showPasswordDialog = ref(false)
const passwordFormRef = ref<FormInstance>()
const passwordForm = reactive<PasswordForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  verifyMethod: 'phone',
  phoneCode: '',
  emailCode: '',
})

const validatePassword = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const passwordRules: FormRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
  ],
  verifyMethod: [{ required: true, message: '请选择验证方式', trigger: 'change' }],
  phoneCode: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }],
  emailCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
}

const encryptedPhone = computed(() => {
  const phone = accountInfo.value.phone
  return phone ? `${phone.substring(0, 3)}****${phone.substring(7)}` : '未绑定'
})

const encryptedEmail = computed(() => {
  const email = accountInfo.value.email
  if (!email) return '未绑定'
  const atIndex = email.indexOf('@')
  if (atIndex < 3) return email
  return `${email.substring(0, 3)}****${email.substring(atIndex)}`
})

const sendPhoneCode = () => {
  if (!phoneForm.phone) {
    ElMessage.warning('请输入手机号')
    return
  }

  // 清除之前的定时器
  if (phoneTimer !== null) {
    clearInterval(phoneTimer)
  }

  // 模拟发送验证码
  codeCountdown.value = 60
  phoneTimer = window.setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0 && phoneTimer !== null) {
      clearInterval(phoneTimer)
      phoneTimer = null
    }
  }, 1000)

  ElMessage.success('验证码已发送')
}

const sendEmailCode = () => {
  if (!emailForm.email) {
    ElMessage.warning('请输入邮箱')
    return
  }

  // 清除之前的定时器
  if (emailTimer !== null) {
    clearInterval(emailTimer)
  }

  // 模拟发送验证码
  emailCodeCountdown.value = 60
  emailTimer = window.setInterval(() => {
    emailCodeCountdown.value--
    if (emailCodeCountdown.value <= 0 && emailTimer !== null) {
      clearInterval(emailTimer)
      emailTimer = null
    }
  }, 1000)

  ElMessage.success('验证码已发送')
}

const submitPhoneForm = () => {
  if (!phoneForm.phone || !phoneForm.code) {
    ElMessage.warning('请填写完整信息')
    return
  }

  // 模拟API调用
  setTimeout(() => {
    accountInfo.value.phone = phoneForm.phone
    showPhoneDialog.value = false
    phoneForm.phone = ''
    phoneForm.code = ''
    ElMessage.success('手机号更新成功')
  }, 1000)
}

const submitEmailForm = () => {
  if (!emailForm.email || !emailForm.code) {
    ElMessage.warning('请填写完整信息')
    return
  }

  // 模拟API调用
  setTimeout(() => {
    accountInfo.value.email = emailForm.email
    showEmailDialog.value = false
    emailForm.email = ''
    emailForm.code = ''
    ElMessage.success('邮箱更新成功')
  }, 1000)
}

const sendPasswordPhoneCode = () => {
  if (!accountInfo.value.phone) {
    ElMessage.warning('请先绑定手机号')
    return
  }
  // 模拟发送验证码
  ElMessage.success('验证码已发送到您的手机')
}

const sendPasswordEmailCode = () => {
  if (!accountInfo.value.email) {
    ElMessage.warning('请先绑定邮箱')
    return
  }
  // 模拟发送验证码
  ElMessage.success('验证码已发送到您的邮箱')
}

const submitPasswordForm = async () => {
  if (!passwordFormRef.value) return
  
  const valid = await passwordFormRef.value.validate()
  if (!valid) return

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  // 模拟API调用
  setTimeout(() => {
    showPasswordDialog.value = false
    // 清空表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    passwordForm.phoneCode = ''
    passwordForm.emailCode = ''
    
    ElMessage.success('密码修改成功')
  }, 1000)
}
</script>

<style scoped>
.account-security {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.security-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.verify-code {
  display: flex;
  gap: 10px;
}
</style>
