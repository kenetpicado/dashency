import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBatch } from '@/types'

export const useBatchStore = defineStore('batch', () => {
  const batches = ref<IBatch[]>()

  function setBatches(data: IBatch[]) {
    batches.value = data
  }

  return { batches, setBatches }
})
