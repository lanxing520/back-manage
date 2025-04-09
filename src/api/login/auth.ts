import {get,post} from '../index'

const API_URL = '/api/auth'

// 获取图片验证码
export const getCaptchaApi = async () => {
  try {
    const response = await get(`${API_URL}/captcha`)
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message || '获取验证码失败')
  }
}

// 发送短信验证码
export const sendSmsApi = async (data) => {
  try {
    const response = await post(`${API_URL}/sms`, data)
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message || '发送验证码失败')
  }
}

// 手机号+验证码登录
export const loginApi = async (credentials) => {
  try {
    const response = await post(`${API_URL}/login`, credentials)
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message || '登录失败')
  }
}

// 注册
export const registerApi = async (userData) => {
  try {
    const response = await post(`${API_URL}/register`, userData)
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message || '注册失败')
  }
}

// 忘记密码
export const forgotPasswordApi = async (data) => {
  try {
    const response = await post(`${API_URL}/forgot-password`, data)
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message || '重置密码失败')
  }
}