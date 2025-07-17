<template>
  <main class="login-page">
    <div class="auth-container">
      <el-card class="auth-card">
        <h2 class="auth-title">登录</h2>
        <el-form
          ref="loginForm"
          :model="form"
          :rules="rules"
          label-width="auto"
          @submit.prevent="handleLogin"
          status-icon
        >
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="Iphone" />
          </el-form-item>

          <el-form-item prop="captcha">
            <div class="captcha-container">
              <el-input
                v-model="form.captcha"
                placeholder="请输入图片验证码"
                prefix-icon="Picture"
              />
              <img :src="captchaImage" class="captcha-image" @click="refreshCaptcha" alt="验证码" />
            </div>
          </el-form-item>

          <el-form-item prop="smsCode">
            <div class="sms-container">
              <el-input
                v-model="form.smsCode"
                placeholder="请输入短信验证码"
                prefix-icon="Message"
              />
              <el-button :disabled="smsCountdown > 0 || !canSendSms" @click="sendSmsCode">
                {{ smsCountdown > 0 ? `${smsCountdown}s后重新获取` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth-footer">
          <el-link type="primary" @click="$router.push('/register')">注册账号</el-link>
          <el-link type="primary" @click="$router.push('/forgot-password')">忘记密码</el-link>
        </div>
      </el-card>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const smsCountdown = ref(0)
const captchaImage = ref('')
const captchaToken = ref('')

const form = ref({
  phone: '',
  captcha: '',
  password: '',
  smsCode: '',
})

const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入图片验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '验证码长度为4-6位', trigger: 'blur' },
  ],
  smsCode: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' },
  ],
}

const canSendSms = computed(() => {
  return form.value.phone && form.value.captcha && form.value.phone.match(/^1[3-9]\d{9}$/)
})

// 获取图片验证码
const refreshCaptcha = async () => {
  try {
    const response = await authStore.getCaptcha()
    captchaImage.value = response.image
    captchaToken.value = response.token
  } catch (error: any) {
    ElMessage.error(error.message || '获取验证码失败')
  }
}

// 发送短信验证码
const sendSmsCode = async () => {
  try {
    await authStore.sendSms({
      phone: form.value.phone,
      captcha: form.value.captcha,
      captchaToken: captchaToken.value,
    })
    ElMessage.success('验证码已发送')
    smsCountdown.value = 60
    const timer = setInterval(() => {
      smsCountdown.value--
      if (smsCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error: any) {
    ElMessage.error(error.message || '发送验证码失败')
    refreshCaptcha()
  }
}

// 处理登录
const handleLogin = async () => {
  try {
    loading.value = true
    await authStore.login({
      phone: form.value.phone,
      smsCode: form.value.smsCode,
    })
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// 初始化时获取验证码
refreshCaptcha()
</script>

<style scoped lang="scss">
@use './common-style.scss';
</style>
