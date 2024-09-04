import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBilling, IBillingResponse } from '@/types'

export const useBillingStore = defineStore('billing', () => {
  const billing = ref<IBillingResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  const bill = ref<IBilling>()

  function setBilling(data: IBillingResponse) {
    billing.value = data
  }

  function setBill(data: IBilling) {
    bill.value = data
  }

  return { billing, setBilling, bill, setBill }
})
