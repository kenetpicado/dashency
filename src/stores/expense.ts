import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IExpenseResponse } from '@/types'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<IExpenseResponse>({
    data: [],
    pages: 0,
    current: 0
  })

  function setExpenses(data: IExpenseResponse) {
    expenses.value = data
  }

  return { expenses, setExpenses }
})
