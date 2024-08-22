import router from '@/router'
import { ref } from 'vue'
import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'
import api from '@/config/axios'
import type { ILoginForm, IUser, IRegisterForm } from '@/types'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import toast from '@/utils/toast'

export default function useAuth() {
  const processing = ref(false)
  const { setAuthData } = useAuthStore()
  const { auth } = storeToRefs(useAuthStore())

  function getProfile() {
    api.get('/profile').then((response) => {
      setAuthData(response.data as IUser)
    })
  }

  function login(data: ILoginForm) {
    processing.value = true

    api
      .post('/login', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        router.push({ name: 'home' })
      })
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function logout() {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }

  function register(data: IRegisterForm) {
    processing.value = true

    return api
      .post('/register', data)
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { login, logout, getProfile, processing, auth, register }
}
