import type { IBatch, IBilling } from '@/types'
import { useBillingStore } from '@/stores/billing'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'

export default function useBilling() {
  const { setBilling } = useBillingStore()
  const { billing } = storeToRefs(useBillingStore())
  const processing = ref<boolean>(false)

  const queryParams = ref({
    type: ''
  })

  function getBilling() {
    api
      .get('/billing')
      .then((response) => {
        setBilling(response.data as IBilling[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getBill(id: string) {
    api
      .get('/billing/' + id)
      .then((response) => {
        //setBatch(response.data as IBatch)
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

  return { getBilling, billing, processing, storeBilling, queryParams }
}
