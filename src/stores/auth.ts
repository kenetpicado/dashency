import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<IUser>()

  function setAuthData(data: IUser) {
    auth.value = data
  }

  return { auth, setAuthData }
})
