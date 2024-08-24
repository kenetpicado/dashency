<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Lotes</span>
    <RouterLink :to="{ name: 'batches.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </header>

  <TheTable>
    <template #header>
      <th>Fecha</th>
      <th>Tipo</th>
      <th>Creado por</th>
      <th>Total</th>
      <th>Cantidad de items</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!batches?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in batches" :key="index" class="hover:bg-gray-50">
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.user?.name }}
        </td>
        <td>
          <span class="bg-red-50 text-red-600 px-3 py-1 rounded-lg">${{ item.total }}</span>
        </td>
        <td>{{ item.packages.length }}</td>
        <td>
          <button type="button">
            <IconEdit size="20" />
          </button>
        </td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted } from 'vue'
import useBatch from '@/composables/useBatch'
import { IconEdit } from '@tabler/icons-vue'
import getFormattedDate from '@/utils/date'

const { getBatches, batches } = useBatch()

onMounted(() => getBatches())
</script>
