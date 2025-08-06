import type { IPrice } from '@/types'
import { usePriceStore } from '@/stores/price'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import useForm from '@/composables/useForm'
import useCrud from '@/composables/useCrud'

export default function usePrice() {
  const { prices } = storeToRefs(usePriceStore())
  const processing = ref<boolean>(false)
  const { index, store, destroy, update } = useCrud('prices')
  const openModal = ref<boolean>(false)

  const { form, reset } = useForm<any>({
    id: '',
    type: '',
    value: 0
  })

  async function getPrices() {
    await index().then((response) => {
      prices.value = response.data as IPrice[]
    })
  }

  async function storePrice() {
    await store(form.value).then(() => {
      onSuccess()
    })
  }

  async function updatePrice(id: string) {
    await update(id, form.value).then(() => {
      onSuccess()
    })
  }

  async function destroyPrice(id: string) {
    await destroy(id).then(() => {
      getPrices()
    })
  }

  async function onSuccess() {
    openModal.value = false
    document.getElementById('resetPrice')?.click()
    reset()
    await getPrices()
  }

  return {
    getPrices,
    prices,
    processing,
    storePrice,
    updatePrice,
    destroyPrice,
    form,
    reset,
    openModal
  }
}
