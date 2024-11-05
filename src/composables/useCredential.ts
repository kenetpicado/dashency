import { useCredentialStore } from '@/stores/credential'
import api from '@/config/axios'
import type { ICredential } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'

export default function useCredential() {
  const { credential } = storeToRefs(useCredentialStore())
  const { setCredential, clearCredential } = useCredentialStore()

  async function getCredential() {
    await api.get('/credential').then((response) => {
      setCredential(response.data as ICredential)
    })
  }

  async function destroyCredential(id: string) {
    await api.delete('/credential/' + id).then(() => {
      toast.success('Eliminada correctamente')
      clearCredential()
    })
  }

  async function updateCredential(id: string, data: { from_email: string }) {
    console.log(data)
    await api.put('/credential/' + id, data).then((response) => {
      toast.success('Correo actualizado correctamente')
      setCredential(response.data as ICredential)
    })
  }

  return { credential, getCredential, updateCredential, destroyCredential }
}
