import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBatch, IMeta } from '@/types'
import { defaultMeta } from '@/defaults'

export const useBatchStore = defineStore('batch', () => {
  const batches = ref<IBatch[]>([])

  const meta = ref<IMeta>({ ...defaultMeta })

  const batch = ref<IBatch>()

  return { batches, meta, batch }
})
