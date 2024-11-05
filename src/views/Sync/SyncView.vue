<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useGoogle from '@/composables/useGoogle'
import usePackage from '@/composables/usePackage'
import type { IPackage } from '@/types'
import foundPackage from '@/utils/found-package'
import PackageCard from '@/components/PackageCard.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import router from '@/router'

const { emails, getEmails, message, getMessage } = useGoogle()
const { bulkPackages, processing, trackings, getTrackings } = usePackage()

const temporalPackage = ref<IPackage>()
const foundPackages = ref<IPackage[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await getEmails()
  await getTrackings()

  if (emails.value && emails.value.messages) {
    emails.value.messages.forEach(async (email) => {
      await getMessage(email.id)

      if (message.value) {
        temporalPackage.value = foundPackage(message.value)

        if (temporalPackage.value && temporalPackage.value.tracking) {
          const found = foundPackages.value.find(
            (p) => p.tracking === temporalPackage.value?.tracking
          )
          if (!found && !trackings.value.includes(temporalPackage.value.tracking)) {
            foundPackages.value.push(temporalPackage.value)
          } else if (found && temporalPackage.value.guide && !found.guide) {
            found.guide = temporalPackage.value.guide
          }
        }
      }
    })
  }

  loading.value = false
})

function savePackages() {
  const messageIds = emails.value.messages.map((email) => email.id) as string[]
  bulkPackages(foundPackages.value, messageIds, () => {
    router.push({ name: 'packages' })
  })
}
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Sincronización</span>
    <BtnPrimary v-if="foundPackages.length" :loading="processing" @click="savePackages">
      Guardar todos
    </BtnPrimary>
  </header>

  <div v-if="loading" class="text-center text-gray-600">Buscando paquetes...</div>

  <template v-else>
    <h5 class="mb-8">{{ foundPackages.length }} paquetes encontrados</h5>
    <div v-if="foundPackages.length" class="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
      <PackageCard
        v-for="(item, index) in foundPackages"
        :item="item"
        :key="index"
        :showIcon="false"
      />
    </div>
  </template>
</template>
