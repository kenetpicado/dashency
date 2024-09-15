import type { IPrice } from '@/types'
import { usePriceStore } from '@/stores/price'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import toast from '@/utils/toast'

export default function usePrice() {
  const { setPrices } = usePriceStore()
  const { prices } = storeToRefs(usePriceStore())
  const processing = ref<boolean>(false)

  function getPrices() {
    api
      .get('/prices')
      .then((response) => {
        setPrices(response.data as IPrice[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storePrice(data: IPrice, callback: () => void) {
    processing.value = true

    api
      .post('/prices', data)
      .then(() => {
        callback()
        getPrices()
        toast.success('Precio creado correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updatePrice(data: IPrice, callback: () => void) {
    processing.value = true

    api
      .put('/prices/' + data.id, data)
      .then(() => {
        callback()
        getPrices()
        toast.success('Precio actualizado correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  function destroyPrice(id: string) {
    processing.value = true

    api
      .delete('/prices/' + id)
      .then(() => {
        getPrices()
        toast.success('Precio eliminado correctamente')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getPrices, prices, processing, storePrice, updatePrice, destroyPrice }
}
