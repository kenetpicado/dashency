import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const auth = ref<IUser>()
    const token = ref<string>()

    function setAuthData(data: IUser) {
      auth.value = data
    }

    function clearData() {
      auth.value = undefined
      token.value = undefined
    }

    function setToken(t: string) {
      token.value = t
    }

    function getToken() {
      return token.value
    }

    function getAuth() {
      return auth.value
    }

    function hasRoles(names: Array<string>) {
      if (auth.value && auth.value) {
        return names.includes(auth.value.role)
      }

      return false
    }

    return { auth, setAuthData, clearData, setToken, token, getToken, getAuth, hasRoles }
  },
  {
    persist: true
  }
)
