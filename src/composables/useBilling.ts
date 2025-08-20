import type { IBilling } from '@/types'
import { useBillingStore } from '@/stores/billing'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'
import cleanQueryParams from '@/utils/query-params'
import useCrud from '@/composables/useCrud'

export default function useBilling() {
  const { billing, bill, meta } = storeToRefs(useBillingStore())
  const { index, processing, store, show } = useCrud('/billing')

  const queryParams = ref<any>({
    date: '',
    reference: '',
    client: '',
    account: '',
    from: '',
    to: ''
  })

  function getBilling() {
    const params = {
      page: meta.value.page,
      ...cleanQueryParams(queryParams.value)
    }

    index(params).then((response) => {
      const { docs, ...rest } = response.data
      billing.value = docs
      meta.value = rest
    })
  }

  async function getBillingDay() {
    const params = cleanQueryParams(queryParams.value)

    await api.get('/billing/today/arching', { params }).then((response) => {
      billing.value = response.data
    })
  }

  async function getBill(id: string) {
    await show(id).then((response) => {
      bill.value = response.data as IBilling
    })
  }

  function storeBilling(data: IBilling) {
    store(data).then((response) => {
      toast.success('Factura creada correctamente')

      router.push({
        name: 'billing.show',
        params: { id: response.data._id },
        query: { action: 'print' }
      })
    })
  }

  return {
    getBilling,
    billing,
    meta,
    processing,
    storeBilling,
    queryParams,
    getBill,
    bill,
    getBillingDay
  }
}
