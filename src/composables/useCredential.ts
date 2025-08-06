import { useCredentialStore } from '@/stores/credential'
import api from '@/config/axios'
import type { ICredential } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'
import { ref } from 'vue'

export default function useCredential() {
  const processing = ref(false)
  const { credential } = storeToRefs(useCredentialStore())

  async function getCredential() {
    processing.value = true

    await api
      .get('/credential')
      .then((response) => {
        credential.value = response.data as ICredential
      })
      .finally(() => {
        processing.value = false
      })
  }

  async function destroyCredential() {
    processing.value = true

    await api
      .delete('/credential')
      .then(() => {
        toast.success('Desconectado correctamente')
        credential.value = undefined
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { credential, getCredential, destroyCredential, processing }
}
