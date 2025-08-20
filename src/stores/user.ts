import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>([])

  return { users }
})
