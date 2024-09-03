import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IExpense } from '@/types'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<IExpense[]>([])

  function setExpenses(data: IExpense[]) {
    expenses.value = data
  }

  return { expenses, setExpenses }
})
