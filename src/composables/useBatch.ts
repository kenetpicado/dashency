import type { IBatch } from '@/types'
import { useBatchStore } from '@/stores/batch'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export default function useBatch() {
  const { setBatches } = useBatchStore()
  const { batches } = storeToRefs(useBatchStore())
  const processing = ref<boolean>(false)

  async function getBatches() {
    try {
      const response = await api.get('/batches')
      setBatches(response.data as IBatch[])
    } catch (error) {
      console.log(error)
    }
  }

  function storeBatch(data: IBatch) {
    return api
      .post('/batches', data)
      .then(() => {
        getBatches()
        router.push({ name: 'batches' })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getBatches, batches, processing, storeBatch }
}
