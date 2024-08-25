import type { IBatch } from '@/types'
import { useBatchStore } from '@/stores/batch'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'

export default function useBatch() {
  const { setBatches } = useBatchStore()
  const { batches } = storeToRefs(useBatchStore())
  const processing = ref<boolean>(false)

  const queryParams = ref({
    type: ''
  })

  function getBatches() {
    api
      .get('/batches', { params: queryParams.value })
      .then((response) => {
        setBatches(response.data as IBatch[])
      })
      .catch((error) => {
        console.log(error)
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
      .finally(() => {
        processing.value = false
      })
  }

  function updateBatch(data: IBatch, callback: () => void) {
    if (!data.total) {
      toast.error('El campo total es requerido')
      return
    }

    if (!data.type) {
      toast.error('El campo tipo es requerido')
      return
    }

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

  return { getBatches, batches, processing, storeBatch, updateBatch, queryParams }
}
