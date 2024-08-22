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
      <th>Total</th>
      <th>Creado por</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-for="(item, index) in batches" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.created_at }}
        </td>
        <td>${{ item.total }}</td>
        <td>
          {{ item.created_by?.email }}
        </td>
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

const { getBatches, batches } = useBatch()

onMounted(() => getBatches())
</script>
