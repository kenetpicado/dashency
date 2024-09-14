import router from '@/router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/config/axios'
import type { ILoginForm, IUser, IRegisterForm } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'

export default function useAuth() {
  const processing = ref(false)
  const { setAuthData, setToken, clearData } = useAuthStore()
  const { auth } = storeToRefs(useAuthStore())

  async function getProfile() {
    await api.get('/profile').then((response) => {
      setAuthData(response.data as IUser)
    })
  }

  function login(data: ILoginForm) {
    processing.value = true

    api
      .post('/login', data)
      .then((response) => {
        setToken(response.data.token)
        setAuthData(response.data.user)
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
    clearData()
    router.push({ name: 'login' })
  }

  function register(data: IRegisterForm, onDone: () => void) {
    processing.value = true

    api
      .post('/register', data)
      .then(() => onDone())
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updateProfile(data: { name: string; email: string }) {
    processing.value = true

    api
      .put('/profile', data)
      .then(() => {
        getProfile()
        toast.success('Perfil actualizado')
      })
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { login, logout, getProfile, processing, auth, register, updateProfile }
}
