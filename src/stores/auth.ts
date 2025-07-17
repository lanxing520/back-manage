import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCaptchaApi,
  sendSmsApi,
  loginApi,
  registerApi,
  forgotPasswordApi,
} from '@/api/login/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // 获取图片验证码
  const getCaptcha = async () => {
    const response = await getCaptchaApi()
    return response.data
  }

  // 发送短信验证码
  const sendSms = async (data) => {
    await sendSmsApi(data)
  }

  // 手机号+验证码登录
  const login = async (credentials) => {
    const response = await loginApi(credentials)
    user.value = response.user
    token.value = response.token
    localStorage.setItem('token', response.token)
  }

  // 注册
  const register = async (userData) => {
    await registerApi(userData)
  }

  // 忘记密码
  const forgotPassword = async (data) => {
    await forgotPasswordApi(data)
  }

  // 退出登录
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    getCaptcha,
    sendSms,
    login,
    register,
    forgotPassword,
    logout,
  }
})
