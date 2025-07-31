import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IMailPackageResponse, IMeta, IPackage, IPackageResponse } from '@/types'
import { defaultMeta } from '@/defaults'

export const usePackageStore = defineStore('package', () => {
  const packages = ref<IPackage[]>([])

  const mailPackages = ref<IPackageResponse>({
    data: [],
    pages: 1,
    current: 1
  })

  const meta = ref<IMeta>({ ...defaultMeta })

  function setMailPackages(data: IMailPackageResponse) {
    mailPackages.value = data
  }

  return { packages, meta, mailPackages, setMailPackages }
})
