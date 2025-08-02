import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const auth = ref<IUser>()

    function getAuth() {
      return auth.value
    }

    function clearData() {
      auth.value = undefined
    }

    function hasRoles(names: Array<string>) {
      if (auth.value && auth.value) {
        return names.includes(auth.value.role)
      }

      return false
    }

    return { auth, getAuth, hasRoles, clearData }
  },
  {
    persist: true
  }
)
