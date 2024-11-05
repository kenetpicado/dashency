import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICredential } from '@/types'

export const useCredentialStore = defineStore('credential_store', () => {
  const credential = ref<ICredential>()

  function setCredential(value: ICredential) {
    credential.value = value
  }

  function clearCredential() {
    credential.value = undefined
  }

  return { credential, setCredential, clearCredential }
})
