import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBilling, IMeta } from '@/types'
import { defaultMeta } from '@/defaults'

export const useBillingStore = defineStore('billing', () => {
  const billing = ref<IBilling[]>([])

  const bill = ref<IBilling>()

  const meta = ref<IMeta>({ ...defaultMeta, sumTotal: 0 })

  return { billing, bill, meta }
})
