<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useGoogle from '@/composables/useGoogle'
import usePackage from '@/composables/usePackage'
import type { IMailPackage } from '@/types'
import foundPackage from '@/utils/found-package'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import router from '@/router'
import TheTable from '@/components/Table/TheTable.vue'
import getFormattedDate from '@/utils/date'

const { emails, getEmails } = useGoogle()
const { bulkPackages, processing } = usePackage()

const temporalPackage = ref<IMailPackage>()
const foundPackages = ref<IMailPackage[]>([])
const allEmailsFetched = ref(false)

onMounted(async () => {
  await getEmails()

  if (emails.value && emails.value.messages) {
    emails.value.messages.forEach((email, index) => {
      if (email.payload) {
        temporalPackage.value = foundPackage(email)

        if (temporalPackage.value && temporalPackage.value.tracking) {
          const found = foundPackages.value.find((p) => p.tracking === temporalPackage.value?.tracking)

          if (!found) {
            foundPackages.value.push(temporalPackage.value)
          } else if (found && temporalPackage.value.guide && !found.guide) {
            found.guide = temporalPackage.value.guide
          }
        }
      }

      if (index === emails.value.messages.length - 1) {
        allEmailsFetched.value = true
      }
    })

    if (!emails.value.messages.length) {
      allEmailsFetched.value = true
    }
  }
})

function savePackages() {
  const messageIds = emails.value.messages.map((email) => email.id) as string[]
  bulkPackages(foundPackages.value, messageIds, () => {
    router.push({ name: 'mail.packages' })
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

  <div v-if="!allEmailsFetched" class="text-center text-gray-600">Buscando paquetes...</div>

  <template v-else>
    <h5 class="mb-2">{{ foundPackages.length }} paquetes encontrados</h5>

    <TheTable>
      <template #header>
        <th>Guia</th>
        <th>Tipo</th>
        <th>Peso</th>
        <th>Cliente</th>
        <th>Tracking</th>
        <th>Descripción</th>
        <th>Fecha</th>
      </template>
      <template #body>
        <tr v-if="!foundPackages.length">
          <td colspan="7" class="text-center">No hay paquetes</td>
        </tr>
        <tr v-for="(item, index) in foundPackages" :key="index" class="hover:bg-gray-50">
          <td>
            {{ item.guide }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.grossWeight }}
          </td>
          <td>
            {{ item.client }}
          </td>
          <td>
            {{ item.tracking }}
          </td>
          <td>
            {{ item.description }}
          </td>
          <td class="text-gray-400">
            {{ getFormattedDate(item.createdAt) }}
          </td>
        </tr>
      </template>
    </TheTable>
  </template>
</template>
