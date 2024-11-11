import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPackageResponse, IPackageMailResponse } from '@/types'

export const usePackageStore = defineStore('package', () => {
  const packages = ref<IPackageResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  const mailPackages = ref<IPackageMailResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  function setPackages(data: IPackageResponse) {
    packages.value = data
  }

  function setMailPackages(data: IMailPackageResponse) {
    mailPackages.value = data
  }

  return { packages, setPackages, mailPackages, setMailPackages }
})
