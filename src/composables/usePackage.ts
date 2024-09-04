import type { IPackage } from '@/types'
import { usePackageStore } from '@/stores/package'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import cleanQueryParams from '@/utils/query-params'

export default function usePackage() {
  const { setPackages } = usePackageStore()
  const { packages } = storeToRefs(usePackageStore())
  const processing = ref<boolean>(false)

  const queryParams = ref({
    type: '',
    client: '',
    guide: '',
    status: '',
    entryDate: ''
  })

  function getPackages() {
    api
      .get('/packages', { params: queryParams.value })
      .then((response) => {
        setPackages(response.data as IPackage[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function searchPackages() {
    processing.value = true
    const params = cleanQueryParams(queryParams.value)

    api
      .get('/search-packages', { params })
      .then((response) => {
        setPackages(response.data as IPackage[])
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getPackages, packages, processing, queryParams, searchPackages }
}
