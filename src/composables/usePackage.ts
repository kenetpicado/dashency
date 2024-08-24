import type { IPackage } from '@/types'
import { usePackageStore } from '@/stores/package'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default function usePackage() {
  const { setPackages } = usePackageStore()
  const { packages } = storeToRefs(usePackageStore())
  const processing = ref<boolean>(false)

  const queryParams = ref({
    type: ''
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

  return { getPackages, packages, processing, queryParams }
}
