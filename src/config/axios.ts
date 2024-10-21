import axios from 'axios'
import { config } from '@/config/config'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import toast from '@/utils/toast'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: config.base_url,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
  function (conf) {
    const token = Cookies.get('edo_token')
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
    if (error.response && error.response.status === 401) {
      useAuthStore().clearData()
      Cookies.remove('edo_token')
      toast.error('Sesión expirada')
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default api
