import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const auth = ref<IUser>()

    function setAuthData(data: IUser) {
      auth.value = data
    }

    function clearData() {
      auth.value = undefined
      //Eliminar lego que se asegure
      //que se ha completado la integracion
      //de las cookies
      localStorage.clear()
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

    return { auth, setAuthData, clearData, getAuth, hasRoles }
  },
  {
    persist: true
  }
)
