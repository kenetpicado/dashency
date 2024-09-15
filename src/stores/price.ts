import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPrice } from '@/types'

export const usePriceStore = defineStore('prices', () => {
  const prices = ref<IPrice[]>([])

  function setPrices(data: IPrice[]) {
    prices.value = data
  }

  return { prices, setPrices }
})
