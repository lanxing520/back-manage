import axios from 'axios'
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
})
// 声明 loading 实例变量
let loadingInstance

// 当前正在请求的数量
let needLoadingRequestCount = 0
// 显示 loading（添加 300ms 延迟，避免快速请求时的闪烁）
function showLoading() {
  if (needLoadingRequestCount === 0) {
    loadingTimer = setTimeout(() => {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(255, 255, 255, 0.7)',
      })
    }, 300)
  }
  needLoadingRequestCount++
}

// 隐藏 loading
function hideLoading() {
  needLoadingRequestCount--
  if (needLoadingRequestCount <= 0) {
    clearTimeout(loadingTimer)
    loadingInstance?.close()
    needLoadingRequestCount = 0
  }
}
//请求拦截器
service.interceptors.request.use(
  (config) => {
    // 显示 loading
    if (config?.showLoading === true) {
      // 允许单个请求配置是否显示 loading
      showLoading()
    }
    // 在发送请求之前做些什么
    // 例如，可以在请求头中添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    } else {
      router.push('login')
    }
    return config
  },
  (error) => {
    // 关闭 loading
    if (error.config?.showLoading === true) {
      hideLoading()
    }
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 关闭 loading
    if (response.config?.showLoading === true) {
      hideLoading()
    }
    // 对响应数据做些什么
    return response.data
  },
  (error) => {
    // 关闭 loading
    if (error.config?.showLoading === true) {
      hideLoading()
    }
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('400，请求错误')
          break
        case 401:
          // 处理未授权的情况，重定向到登录页或刷新token
          window.location.href = '/login'
          break
        case 404:
          // 处理资源未找到的情况
          console.error('404，资源未找到')
          break
        case 500:
          // 处理服务器错误的情况
          console.error('500，服务器错误')
          break
        default:
          // 处理其他错误
          console.error(error.response.status, '未知错误')
          break
      }
    }
    return Promise.reject(error)
  },
)

// 封装 GET 请求
export const get = (url, params) => {
  return service.get(url, { params })
}

// 封装 POST 请求
export const post = (url, data) => {
  return service.post(url, data)
}

// 封装 PUT 请求
export const put = (url, data) => {
  return service.put(url, data)
}

// 封装 DELETE 请求
export const del = (url, data) => {
  return service.delete(url, data)
}

export default service
