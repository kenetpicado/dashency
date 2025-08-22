import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IMeta, IPackage } from '@/types'
import { defaultMeta } from '@/defaults'

export const usePackageStore = defineStore('package', () => {
  const packages = ref<IPackage[]>([])

  const mailPackages = ref<IPackage[]>([])

  const meta = ref<IMeta>({ ...defaultMeta })

  return { packages, meta, mailPackages }
})
