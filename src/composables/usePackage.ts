import type { IPackage, IPackageResponse } from '@/types'
import { usePackageStore } from '@/stores/package'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import cleanQueryParams from '@/utils/query-params'
import toast from '@/utils/toast'

export default function usePackage() {
  const { setPackages } = usePackageStore()
  const { packages } = storeToRefs(usePackageStore())
  const processing = ref<boolean>(false)
  const trackings = ref<string[]>([])

  const queryParams = ref({
    type: '',
    client: '',
    guide: '',
    status: '',
    entryDate: '',
    page: 1
  })

  function getPackages() {
    processing.value = true

    const params = cleanQueryParams(queryParams.value)

    api
      .get('/packages', { params })
      .then((response) => {
        setPackages(response.data as IPackageResponse)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updatePackage(data: IPackage, callback: () => void) {
    processing.value = true

    api
      .put('/packages/' + data.id, data)
      .then(() => {
        callback()
        toast.success('Paquete actualizado correctamente')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        processing.value = false
      })
  }

  async function getTrackings() {
    await api.get('/trackings').then(({ data }) => {
      trackings.value = data as string[]
    })
  }

  function bulkPackages(data: IPackage[], messageIds: string[], callback: () => void) {
    processing.value = true

    api
      .post('/bulk-packages', {
        packages: data,
        messages: messageIds
      })
      .then(() => {
        toast.success('Paquetes guardados correctamente')
        callback()
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Error al guardar los paquetes')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    getPackages,
    packages,
    processing,
    queryParams,
    updatePackage,
    bulkPackages,
    getTrackings,
    trackings
  }
}
