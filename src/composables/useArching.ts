import type { IArching, IArchingResponse, IBilling } from '@/types'
import { useArchingStore } from '@/stores/arching'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import toast from '@/utils/toast'
import cleanQueryParams from '@/utils/query-params'

export default function useArching() {
  const { setArching, setArchings } = useArchingStore()
  const { arching, archings } = storeToRefs(useArchingStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<{
    date: string
    page: number
    timezoneOffset: number
  }>({
    date: '',
    page: 1,
    timezoneOffset: new Date().getTimezoneOffset()
  })

  function getArchings() {
    const params = cleanQueryParams(queryParams.value)

    api
      .get('/archings', { params })
      .then((response) => {
        setArchings(response.data as IArchingResponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getArching(id: string) {
    api
      .get('/archings/' + id)
      .then((response) => {
        setArching(response.data as IArching)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function storeArching(data: IArching) {
    processing.value = true

    api
      .post('/archings', data)
      .then(() => {
        toast.success('Arqueo creado correctamente')
        router.push({ name: 'archings' })
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getArchings, archings, processing, storeArching, queryParams, getArching, arching }
}
