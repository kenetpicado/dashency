import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBilling } from '@/types'

export const useBillingStore = defineStore('billing', () => {
  const billing = ref<IBilling[]>([])

  function setBilling(data: IBilling[]) {
    billing.value = data
  }

  return { billing, setBilling }
})
