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

  function getBatches() {
    api
      .get('/batches')
      .then((response) => {
        setBatches(response.data as IBatch[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storeBatch(data: IBatch) {
    api
      .post('/batches', data)
      .then(() => {
        toast.success('Lote creado correctamente')
        getBatches()
        router.push({ name: 'batches' })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getBatches, batches, processing, storeBatch }
}
