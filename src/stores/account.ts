import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>([])

  return { accounts }
})
