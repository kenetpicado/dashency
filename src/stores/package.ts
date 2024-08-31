import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPackage } from '@/types'

export const usePackageStore = defineStore('package', () => {
  const packages = ref<IPackage[]>([])

  function setPackages(data: IPackage[]) {
    packages.value = data
  }

  return { packages, setPackages }
})
