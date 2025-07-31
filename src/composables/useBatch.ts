import type { IBatch } from '@/types'
import { useBatchStore } from '@/stores/batch'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'
import cleanQueryParams from '@/utils/query-params'

export default function useBatch() {
  const { batches, batch, meta } = storeToRefs(useBatchStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<any>({
    type: '',
    code: ''
  })

  async function getBatches() {
    processing.value = true

    const params = {
      page: meta.value.page,
      ...cleanQueryParams(queryParams.value)
    }

    await api
      .get('/batches', { params })
      .then((response) => {
        const { docs, ...rest } = response.data
        batches.value = docs
        meta.value = rest
      })
      .finally(() => {
        processing.value = false
      })
  }

  async function getBatch(id: string) {
    processing.value = true
    batch.value = undefined

    await api
      .get('/batches/' + id)
      .then((response) => {
        batch.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        processing.value = false
      })
  }

  function storeBatch(data: IBatch, callback: () => void) {
    processing.value = true

    api
      .post('/batches', data)
      .then(() => {
        callback()
        toast.success('Lote creado correctamente')
        router.push({ name: 'batches' })
      })
      .catch((err) => {
        toast.error('Error al crear el lote: ' + err.response?.data?.message || 'Error desconocido')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updateBatch(data: IBatch, callback: () => void) {
    processing.value = true

    api
      .put('/batches/' + data.id, data)
      .then(() => {
        callback()
        toast.success('Lote actualizado correctamente')
        getBatches()
      })
      .finally(() => {
        processing.value = false
      })
  }

  function deleteBatch(id: string) {
    processing.value = true

    api
      .delete('/batches/' + id)
      .then(() => {
        toast.success('Lote eliminado correctamente')
        router.push({ name: 'batches' })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    getBatches,
    getBatch,
    batches,
    batch,
    processing,
    storeBatch,
    updateBatch,
    queryParams,
    meta,
    deleteBatch
  }
}
