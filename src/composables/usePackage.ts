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

  return { getPackages, packages, processing, queryParams, updatePackage }
}
