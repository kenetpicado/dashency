import router from '@/router'
import { ref } from 'vue'
import { useErrorStore } from '@/stores/error'
import { useAuthStore } from '@/stores/auth'
import api from '@/config/axios'
import type { IErrorStatus, ILoginForm, IUser, IRegisterForm } from '@/types'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export default function useAuth() {
  const processing = ref(false)
  const errorStatus = ref<IErrorStatus>()
  const errorStore = useErrorStore()
  const { setAuthData } = useAuthStore()
  const { auth } = storeToRefs(useAuthStore())

  async function getProfile() {
    try {
      const response = await api.get('/profile')
      setAuthData(response.data as IUser)
    } catch (error) {}
  }

  async function login(data: ILoginForm) {
    errorStore.clearErrorState()

    try {
      processing.value = true
      const response = await api.post('/login', data)
      localStorage.setItem('token', response.data.token)

      router.push({ name: 'home' })
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        errorStatus.value = error.response.data as IErrorStatus
        errorStore.setErrorState(errorStatus.value)
      } else {
        console.error('Unexpected error', error)
      }
    } finally {
      processing.value = false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }

  async function register(data: IRegisterForm): boolean {
    try {
      processing.value = true
      const response = await api.post('/register', data)
      return true
      //router.push({ name: 'home' })
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        errorStatus.value = error.response.data as IErrorStatus
        errorStore.setErrorState(errorStatus.value)
      } else {
        console.error('Unexpected error', error)
      }

      return false
    } finally {
      processing.value = false
    }
  }

  return { login, logout, getProfile, processing, auth, register }
}
