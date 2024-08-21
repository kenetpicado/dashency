import type { IErrorStatus, IBatch } from '@/types'
import { useBatchStore } from '@/stores/batch'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

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

  async function storeBatch(data: IBatch) {
    console.log(data)
    return
    try {
      processing.value = true
      const response = await api.post('/batches', data)
      //await getBatches()
    } catch (error) {
      console.log(error)
    } finally {
      processing.value = false
    }
  }

  return { getBatches, batches, processing, storeBatch }
}
