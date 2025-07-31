import type { IPackage, IMailPackage, IMailPackageResponse } from '@/types'
import { usePackageStore } from '@/stores/package'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import cleanQueryParams from '@/utils/query-params'
import toast from '@/utils/toast'

export default function usePackage() {
  const { packages, mailPackages, meta } = storeToRefs(usePackageStore())
  const processing = ref<boolean>(false)

  const queryParams = ref<any>({
    type: '',
    client: '',
    guide: '',
    status: '',
    entryDate: '',
    tracking: ''
  })

  async function getPackages() {
    processing.value = true

    const params = {
      page: meta.value.page,
      ...cleanQueryParams(queryParams.value)
    }

    await api
      .get('/packages', { params })
      .then((response) => {
        const { docs, ...rest } = response.data
        packages.value = docs
        meta.value = rest
      })
      .finally(() => {
        processing.value = false
      })
  }

  function getMailPackages() {
    processing.value = true

    const params = cleanQueryParams(queryParams.value)

    api
      .get('/mail-packages', { params })
      .then((response) => {
        mailPackages.value = response.data as IMailPackageResponse
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

  function bulkPackages(data: IMailPackage[], messageIds: string[], callback: () => void) {
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
    getMailPackages,
    mailPackages,
    meta,
  }
}
