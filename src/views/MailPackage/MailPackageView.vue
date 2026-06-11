<script setup lang="ts">
import { onMounted } from 'vue'
import useGoogle from '@/composables/useGoogle'
import TheTable from '@/components/Table/TheTable.vue'
import { format } from '@formkit/tempo'

const { emails, getEmails, processing, queryParams } = useGoogle()

onMounted(async () => {
  await getEmails()
})

function getNextPage() {
  if (!emails.value.nextPageToken) return

  queryParams.page = emails.value.nextPageToken
  getEmails()
}
</script>

<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Correo</h2>
      <div class="text-sm text-balance text-gray-400">
        Paquetes registrados mediante correo electrónico
      </div>
    </div>
  </div>

  <div v-if="processing" class="text-center max-w-lg mx-auto space-y-4 text-balance">
    <span class="loading loading-dots loading-lg"></span>
    <h2 class="font-bold text-lg">Sincronizando paquetes...</h2>
    <p class="text-gray-400 text-sm">
      Esto puede tardar unos momentos dependiendo de la cantidad de correos a procesar.
    </p>
    <p class="text-gray-400 text-sm">
      Por favor, ten paciencia mientras completamos la sincronización.
    </p>
  </div>

  <template v-else>
    <TheTable>
      <template #header>
        <th>Fecha</th>
        <th>Guia</th>
        <th>Tipo</th>
        <th>Peso</th>
        <th>Tracking</th>
        <th>Nombre</th>
        <th>Desc.</th>
      </template>
      <template #body>
        <tr v-if="!emails.data.length">
          <td colspan="7" class="text-center">No hay datos que mostrar</td>
        </tr>

        <template v-else>
          <tr v-for="(item, index) in emails.data" :key="index" class="hover:bg-gray-50">
            <td>
              <span v-if="item.data.createdAt">
                {{ format(item.data.createdAt, { date: 'short', time: 'medium' }) }}
              </span>
            </td>
            <td>
              {{ item.data.guide }}
            </td>
            <td>
              {{ item.data.type }}
            </td>
            <td>
              {{ item.data.weight }}
            </td>
            <td>
              <span :class="{ 'text-blue-500 cursor-pointer underline': item.data.id }">
                {{ item.data.tracking }}
              </span>
            </td>
            <td>
              {{ item.data.client }}
            </td>
            <td>
              {{ item.data.description }}
            </td>
          </tr>
        </template>
      </template>
    </TheTable>
    <div v-if="emails.nextPageToken" class="flex justify-center mt-4">
      <button type="button" class="btn btn-neutral" @click="getNextPage">Siguiente página</button>
    </div>
  </template>
</template>
