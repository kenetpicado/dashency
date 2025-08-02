import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICredential } from '@/types'

export const useCredentialStore = defineStore('credential_store', () => {
  const credential = ref<ICredential>()

  return { credential }
})
