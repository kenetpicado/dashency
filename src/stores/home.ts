import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IHome } from '@/types'

export const useHomeStore = defineStore('home', () => {
  const home = ref<IHome>({
    stats: [],
    expenses: []
  })

  function setHome(data: IHome) {
    home.value = data
  }

  return { home, setHome }
})
