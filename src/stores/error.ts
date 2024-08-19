import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IErrorStatus } from '@/types'

export const useErrorStore = defineStore('error', () => {
  const error = ref<IErrorStatus>()

  function clearErrorState() {
    error.value = undefined
  }

  function setErrorState(state: IErrorStatus) {
    error.value = state
  }

  return { error, setErrorState, clearErrorState }
})
