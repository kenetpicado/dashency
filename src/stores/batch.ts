import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBatch, IBatchResponse } from '@/types'

export const useBatchStore = defineStore('batch', () => {
  const batches = ref<IBatchResponse>({
    data: [],
    current: 1,
    pages: 1
  })

  const batch = ref<IBatch>()

  function setBatches(data: IBatchResponse) {
    batches.value = data
  }

  function setBatch(data: IBatch) {
    batch.value = data

    if (data.packages) {
      const packages = data.packages.sort((a, b) => {
        return a.guide.localeCompare(b.guide)
      })

      batch.value.packages = packages
    }
  }

  return { batches, setBatches, batch, setBatch }
})
