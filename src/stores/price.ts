import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPrice } from '@/types'

export const usePriceStore = defineStore('prices', () => {
  const prices = ref<IPrice[]>([])

  return { prices }
})
