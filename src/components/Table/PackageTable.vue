<template>
  <TheTable>
    <template #header>
      <th>Detalles</th>
      <th>Peso (lbs)</th>
      <th>Tipo</th>
      <th>Estado</th>
      <th>Ingreso</th>
    </template>
    <template #body>
      <tr v-if="!packages?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <template v-else>
        <tr v-for="(item, index) in packages" :key="index" class="hover:bg-gray-50">
          <td>
            <div class="mb-2">
              <span class="text-blue-600">{{ item.guide }}</span> - {{ item.client }}
            </div>
            <div class="text-sm text-gray-500">({{ item.pieces }}) {{ item.description }}</div>
          </td>
          <td>
            {{ item.grossWeight }}
          </td>
          <td>
            <span class="bg-gray-200 px-3 py-1 rounded-lg">
              {{ item.type }}
            </span>
          </td>
          <td>
            <span class="bg-red-100 text-red-600 px-3 py-1 rounded-lg">
              {{ item.status }}
            </span>
          </td>
          <td>
            {{ getBaseDate(item.entryDate) }}
          </td>
        </tr>
      </template>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import type { IPackage } from '@/types'
import { getBaseDate } from '@/utils/date'

defineProps<{
  packages?: IPackage[]
}>()
</script>
