import type { IExpense } from '@/types'
import { useExpenseStore } from '@/stores/expense'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import useCrud from '@/composables/useCrud'
import cleanQueryParams from '@/utils/query-params'
import useForm from '@/composables/useForm'

export default function useExpense() {
  const { expenses, meta } = storeToRefs(useExpenseStore())
  const { index, processing, store, update, destroy } = useCrud('expenses')
  const openModal = ref<boolean>(false)

  const queryParams = ref<any>({
    concept: ''
  })

  const { form, reset } = useForm<IExpense>({
    id: '',
    concept: '',
    description: '',
    quantity: 1,
    cost: 0
  })

  function getExpenses() {
    const params = {
      page: meta.value.page,
      ...cleanQueryParams(queryParams.value)
    }

    index(params).then((response) => {
      const { docs, ...rest } = response.data
      expenses.value = docs
      meta.value = rest
    })
  }

  async function storeExpense() {
    await store(form.value).then(() => {
      onSuccess()
    })
  }

  function updateExpense(id: string) {
    update(id, form.value).then(() => {
      onSuccess()
    })
  }

  function destroyExpense(id: string) {
    destroy(id).then(() => {
      getExpenses()
    })
  }

  function onSuccess() {
    openModal.value = false
    document.getElementById('resetExpense')?.click()
    reset()
    getExpenses()
  }

  return {
    getExpenses,
    expenses,
    processing,
    storeExpense,
    updateExpense,
    queryParams,
    meta,
    form,
    reset,
    destroyExpense,
    openModal
  }
}
