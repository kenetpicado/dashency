import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IExpenseResponse } from '@/types'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<IExpenseResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  function setExpenses(data: IExpenseResponse) {
    expenses.value = data
  }

  return { expenses, setExpenses }
})
