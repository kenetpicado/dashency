import axios from 'axios'
import { config } from '@/config/config'
import router from '@/router'

const api = axios.create({
  baseURL: config.base_url,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
  function (conf) {
    const token = localStorage.getItem('token')
    if (token) conf.headers.Authorization = `Bearer ${token}`

    return conf
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default api
