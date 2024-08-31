import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBilling } from '@/types'

export const useBillingStore = defineStore('billing', () => {
  const billing = ref<IBilling[]>([])
  const bill = ref<IBilling>()

  function setBilling(data: IBilling[]) {
    billing.value = data
  }

  function setBill(data: IBilling) {
    bill.value = data
  }

  return { billing, setBilling, bill, setBill }
})
