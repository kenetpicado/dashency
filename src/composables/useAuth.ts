import router from '@/router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/config/axios'
import type { ILoginForm, IUser, IRegisterForm } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'
import Cookie from 'js-cookie'

export default function useAuth() {
  const processing = ref(false)
  const { auth } = storeToRefs(useAuthStore())

  async function getProfile() {
    await api.get('/profile').then((response) => {
      auth.value = response.data as IUser
    })
  }

  function login(data: ILoginForm) {
    processing.value = true

    api
      .post('/login', data)
      .then((response) => {
        Cookie.set('edo_token', response.data.token, {
          expires: 30,
          secure: true,
          sameSite: 'Lax'
        })

        auth.value = response.data.user as IUser
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
    auth.value = undefined
    Cookie.remove('edo_token')
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
