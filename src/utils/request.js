import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// 创建一个新的axios实例
const service = axios.create({
  // axios区分环境
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API, // 当前环境的api基地址
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 注入token
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
      // config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认包裹了响应数据data，所以可以直接使用response.data获取响应数据
    const res = response.data
    /**
     * 根据接口返回的数据格式来传递信息
     * 接口格式均为以下格式：
     * {
        "message": "string",
        "success": true,
        "code": 0,
        "data": "string"
      }
     */
    const { data, message, success } = res
    if (success) {
      // 响应成功
      return data
    } else {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
  },
  // Restful风格错误处理,仅针对服务器是否响应请求
  error => {
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
