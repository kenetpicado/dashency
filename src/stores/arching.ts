import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IArching, IArchingResponse } from '@/types'

export const useArchingStore = defineStore('arching', () => {
  const archings = ref<IArchingResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  const arching = ref<IArching>()

  function setArchings(data: IArchingResponse) {
    archings.value = data
  }

  function setArching(data: IArching) {
    arching.value = data
  }

  return { archings, setArchings, arching, setArching }
})
