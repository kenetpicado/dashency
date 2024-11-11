import { useGoogleStore } from '@/stores/google'
import api from '@/config/axios'
import type { IEmail, IMessageContent } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'

export default function useAuth() {
  const { authRoute, emails, message } = storeToRefs(useGoogleStore())

  async function getAuthRoute() {
    await api.get('/google/auth-route').then((response) => {
      useGoogleStore().setAuthRoute(response.data as string)
    })
  }

  async function getEmails() {
    await api
      .get('/google/emails')
      .then((response) => {
        useGoogleStore().setEmails(response.data as IEmail)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Error fetching emails')
      })
  }

  async function getMessage(id: string) {
    await api.get('/google/emails/' + id).then((response) => {
      useGoogleStore().setMessage(response.data as IMessageContent)
    })
  }

  return { getAuthRoute, authRoute, getEmails, emails, getMessage, message }
}