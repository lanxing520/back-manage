import axios from 'axios'
import { get, put, del } from '../index'

// 获取用户详情
export const fetchUserById = async (id: string) => {
  try {
    const response = await get(`/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('User not found')
      }
    }
    throw error
  }
}

// 更新用户
export const updateUser = async (id: string, userData: { name?: string; email?: string }) => {
  try {
    const response = await put(`/${id}`, userData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Invalid user data')
      }
      if (error.response?.status === 404) {
        throw new Error('User not found')
      }
    }
    throw error
  }
}

// 删除用户
export const deleteUser = async (id: string) => {
  try {
    const response = await del(`/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('User not found')
      }
    }
    throw error
  }
}
