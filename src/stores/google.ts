import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IEmail, IMessageContent } from '@/types'

export const useGoogleStore = defineStore('google_store', () => {
  const authRoute = ref<string>('')

  const emails = ref<IEmail>({
    messages: [],
    nextPageToken: '',
    resultSizeEstimate: 0
  })

  const message = ref<IMessageContent>()

  function setAuthRoute(value: string) {
    authRoute.value = value
  }

  function setEmails(data: IEmail) {
    emails.value = data
  }

  function setMessage(data: IMessageContent) {
    message.value = data
  }

  return { authRoute, setAuthRoute, setEmails, emails, message, setMessage }
})
