import { useCredentialStore } from '@/stores/credential'
import { storeToRefs } from 'pinia'
import api from '@/config/axios'
import processError from '@/utils/process-error'
import { ref } from 'vue'
import toast from '@/utils/toast'

export default function useCredential() {
  const { credential } = storeToRefs(useCredentialStore())
  const processing = ref(false)

  async function getCredential() {
    processing.value = true
    try {
      const { data } = await api.get('/credential')
      credential.value = data
    } catch (error) {
      processError(error)
    } finally {
      processing.value = false
    }
  }

  async function destroyCredential(id: string) {
    processing.value = true
    try {
      await api.delete(`/credential/${id}`)
      credential.value = undefined
      toast.success('Eliminado')
    } catch (error) {
      processError(error)
    } finally {
      processing.value = false
    }
  }

  return { credential, getCredential, destroyCredential, processing }
}
