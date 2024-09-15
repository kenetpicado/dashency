import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>([])

  function setAccounts(data: IAccount[]) {
    accounts.value = data
  }

  return { accounts, setAccounts }
})
