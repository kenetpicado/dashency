import { ref } from 'vue'
import { defineStore } from 'pinia'

interface ErrorState {
  name: string
  value: string
}

export const useErrorStore = defineStore('error', () => {
  const error = ref<ErrorState>()

  function clearErrorState() {
    error.value = undefined
  }

  function setErrorState(state: ErrorState) {
    error.value = state
  }

  return { error, setErrorState, clearErrorState }
})
