import type { IAccount } from '@/types'
import { useAccountStore } from '@/stores/account'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import toast from '@/utils/toast'
import cleanQueryParams from '@/utils/query-params'

export default function useAccount() {
  const { accounts } = storeToRefs(useAccountStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<{ status: string }>({
    status: ''
  })

  async function getAccounts() {
    const params = cleanQueryParams(queryParams.value)

    await api
      .get('/accounts', { params })
      .then((response) => {
        accounts.value = response.data as IAccount[]
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storeAccount(data: IAccount, callback: () => void) {
    processing.value = true

    api
      .post('/accounts', data)
      .then(() => {
        callback()
        getAccounts()
        toast.success('Cuenta creada correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updateAccount(data: IAccount, callback: () => void) {
    processing.value = true

    api
      .put('/accounts/' + data.id, data)
      .then(() => {
        callback()
        getAccounts()
        toast.success('Cuenta actualizada correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function destroyAccount(id: string) {
    processing.value = true

    api
      .delete('/accounts/' + id)
      .then(() => {
        getAccounts()
        toast.success('Cuenta eliminada correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    getAccounts,
    accounts,
    processing,
    storeAccount,
    updateAccount,
    destroyAccount,
    queryParams
  }
}
