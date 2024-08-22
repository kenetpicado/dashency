import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>()

  function setUsers(data: IUser[]) {
    users.value = data
  }

  return { users, setUsers }
})
