import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
})

//拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如，可以在请求头中添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    } else {
      // router.push('login')
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权的情况
          break
        case 404:
          // 处理资源未找到的情况
          break
        case 500:
          // 处理服务器错误的情况
          break
        default:
          // 处理其他错误
          break
      }
    }
    return Promise.reject(error)
  },
)

// 封装 GET 请求
export const get = (url, params) => {
  return instance.get(url, { params })
}

// 封装 POST 请求
export const post = (url, data) => {
  return instance.post(url, data)
}

// 封装 PUT 请求
export const put = (url, data) => {
  return instance.put(url, data)
}

// 封装 DELETE 请求
export const del = (url, data) => {
  return instance.delete(url, data)
}

export default instance
