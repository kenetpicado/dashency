import type { IBilling, IBillingResponse } from '@/types'
import { useBillingStore } from '@/stores/billing'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'
import cleanQueryParams from '@/utils/query-params'

export default function useBilling() {
  const { setBilling, setBill } = useBillingStore()
  const { billing, bill } = storeToRefs(useBillingStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<{
    date: string
    reference: string
    client: string
    bank: string
    page: number
  }>({
    date: '',
    reference: '',
    client: '',
    bank: '',
    page: 1
  })

  function getBilling() {
    const params = cleanQueryParams(queryParams.value)

    api
      .get('/billing', { params })
      .then((response) => {
        setBilling(response.data as IBillingResponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getBill(id: string) {
    api
      .get('/billing/' + id)
      .then((response) => {
        setBill(response.data as IBilling)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storeBilling(data: IBilling) {
    processing.value = true

    api
      .post('/billing', data)
      .then(() => {
        toast.success('Factura creada correctamente')
        router.push({ name: 'billing' })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getBilling, billing, processing, storeBilling, queryParams, getBill, bill }
}
