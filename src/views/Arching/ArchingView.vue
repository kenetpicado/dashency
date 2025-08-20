<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Arqueos</span>
    <RouterLink :to="{ name: 'archings.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <TheTable>
    <template #header>
      <th>Creado</th>
      <th>Por</th>
      <th>Fecha</th>
      <th>Facturas</th>
      <th>Total</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="6" class="text-center">
          <span class="loading-table-data"> </span>
        </td>
      </tr>
      <tr v-else-if="!archings.length">
        <td colspan="6" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-else v-for="(item, index) in archings" :key="index" class="hover:bg-gray-50">
        <td>
          <span v-if="item.createdAt">
            {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
          </span>
        </td>
        <td>
          {{ item.user?.name }}
        </td>
        <td>
          {{ format(item.date) }}
        </td>
        <td>
          {{ item.billings?.length }}
        </td>
        <td>{{ item.total.toLocaleString('en', CURRENCY_OPTIONS) }}</td>
        <td>
          <div class="flex gap-4">
            <RouterLink :to="{ name: 'archings.show', params: { id: item.id } }">
              <IconEye size="20" />
            </RouterLink>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useArching from '@/composables/useArching'
import { IconEye } from '@tabler/icons-vue'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ThePaginate from '@/components/ThePaginate.vue'
import { format } from '@formkit/tempo'
import { CURRENCY_OPTIONS } from '@/defaults'

const { getArchings, archings, meta, processing } = useArching()

onMounted(() => {
  getArchings()
})

watch(
  () => meta.value.page,
  () => {
    getArchings()
  }
)
</script>
