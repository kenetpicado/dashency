import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IHome } from '@/types'

export const useHomeStore = defineStore('home', () => {
  const home = ref<IHome>({
    expenses: [],
    incomes: [],
    batches: []
  })

  return { home }
})
