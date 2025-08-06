import type { IAccount } from '@/types'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import cleanQueryParams from '@/utils/query-params'
import useCrud from '@/composables/useCrud'
import useForm from '@/composables/useForm'

export default function useAccount() {
  const { accounts } = storeToRefs(useAccountStore())
  const processing = ref<boolean>(false)
  const { index, store, destroy, update } = useCrud('accounts')
  const openModal = ref<boolean>(false)

  const queryParams = ref<any>({
    status: ''
  })

  const { form, reset } = useForm<any>({
    id: '',
    type: '',
    number: '',
    holder: '',
    status: 'ACTIVO'
  })

  async function getAccounts() {
    const params = cleanQueryParams(queryParams.value)

    await index(params).then((response) => {
      accounts.value = response.data as IAccount[]
    })
  }

  async function storeAccount() {
    await store(form.value).then(() => {
      onSuccess()
    })
  }

  async function updateAccount(id: string) {
    await update(id, form.value).then(() => {
      onSuccess()
    })
  }

  async function destroyAccount(id: string) {
    await destroy(id).then(() => {
      getAccounts()
    })
  }

  async function onSuccess() {
    openModal.value = false
    document.getElementById('resetAccount')?.click()
    reset()
    await getAccounts()
  }

  return {
    getAccounts,
    accounts,
    processing,
    storeAccount,
    updateAccount,
    destroyAccount,
    form,
    reset,
    queryParams,
    openModal
  }
}
