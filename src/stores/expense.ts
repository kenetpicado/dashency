import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IExpense, IMeta } from '@/types'
import { defaultMeta } from '@/defaults'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<IExpense[]>([])
  const meta = ref<IMeta>({ ...defaultMeta })

  return { expenses, meta }
})
