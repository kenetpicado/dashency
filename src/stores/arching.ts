import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IArching, IMeta } from '@/types'
import { defaultMeta } from '@/defaults'

export const useArchingStore = defineStore('arching', () => {
  const archings = ref<IArching[]>([])

  const arching = ref<IArching>()

  const meta = ref<IMeta>({ ...defaultMeta })

  return { archings, arching, meta }
})
