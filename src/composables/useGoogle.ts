import { useGoogleStore } from '@/stores/google'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import processError from '@/utils/process-error'
import { reactive, ref } from 'vue'
import { cleanQueryParamsTs } from '@/utils/query-params'

export default function useGoogle() {
  const processing = ref<boolean>(false)
  const { authRoute, emails } = storeToRefs(useGoogleStore())

  const queryParams = reactive({
    page: ''
  })

  async function getAuthRoute() {
    processing.value = true

    try {
      const { data } = await api.get('/google/auth-route')
      authRoute.value = data as string
    } catch (error) {
      processError(error)
    } finally {
      processing.value = false
    }
  }

  async function getEmails() {
    processing.value = true

    try {
      const { data } = await api.get('/google/emails', { params: cleanQueryParamsTs(queryParams) })
      emails.value = data
    } catch (error) {
      processError(error)
    } finally {
      processing.value = false
    }
  }

  return {
    getAuthRoute,
    authRoute,
    getEmails,
    emails,
    processing,
    queryParams
  }
}
