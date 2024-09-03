import type { IExpense } from '@/types'
import { useExpenseStore } from '@/stores/expense'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import toast from '@/utils/toast'

export default function useExpense() {
  const { setExpenses } = useExpenseStore()
  const { expenses } = storeToRefs(useExpenseStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<{ concept: string }>({
    concept: ''
  })

  function getExpenses() {
    const params = Object.fromEntries(
      Object.entries(queryParams.value).filter(([_, value]) => value)
    )

    api
      .get('/expenses', { params })
      .then((response) => {
        setExpenses(response.data as IExpense[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storeExpense(data: IExpense, callback: () => void) {
    processing.value = true

    api
      .post('/expenses', data)
      .then(() => {
        callback()
        getExpenses()
        toast.success('Registro creado correctamente')
      })
      .catch((error) => {
        toast.error(error.response.data?.message || 'Error al crear el registro')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updateExpense(data: IExpense, callback: () => void) {
    processing.value = true

    api
      .put('/expenses/' + data.id, data)
      .then(() => {
        callback()
        toast.success('Registro actualizado correctamente')
        getExpenses()
      })
      .catch((error) => {
        toast.error(error.response.data?.message || 'Error al crear el registro')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    getExpenses,
    expenses,
    processing,
    storeExpense,
    updateExpense,
    queryParams
  }
}
