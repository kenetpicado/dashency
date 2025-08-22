import type { IArching } from '@/types'
import { useArchingStore } from '@/stores/arching'
import { storeToRefs } from 'pinia'
import router from '@/router'
import toast from '@/utils/toast'
import useCrud from '@/composables/useCrud'

export default function useArching() {
  const { arching, archings, meta } = storeToRefs(useArchingStore())
  const { index, processing, show, store } = useCrud('/archings')

  async function getArchings() {
    const params = {
      page: meta.value.page
    }

    await index(params).then((response) => {
      const { docs, ...rest } = response.data
      archings.value = docs
      meta.value = rest
    })
  }

  function getArching(id: string) {
    show(id).then((response) => {
      arching.value = response.data
    })
  }

  function storeArching(data: IArching) {
    store(data).then(() => {
      toast.success('Arqueo creado correctamente')
      router.push({ name: 'archings' })
    })
  }

  return { getArchings, archings, processing, storeArching, meta, getArching, arching }
}
