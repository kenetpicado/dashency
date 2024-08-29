import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBatch } from '@/types'

export const useBatchStore = defineStore('batch', () => {
  const batches = ref<IBatch[]>()
  const batch = ref<IBatch>()

  function setBatches(data: IBatch[]) {
    batches.value = data
  }

  function setBatch(data: IBatch) {
    batch.value = data
  }

  return { batches, setBatches, batch, setBatch }
})
