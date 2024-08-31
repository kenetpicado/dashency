<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Facturación</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <TheTable>
    <template #header>
      <th>Fecha</th>
      <th>Usuario</th>
      <th>Referencia</th>
      <th>Cliente</th>
      <th>Facturado</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!billing?.length">
        <td colspan="5" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in billing" :key="index" class="hover:bg-gray-50">
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          <UserInfo v-if="item.user" :item="item.user" />
        </td>
        <td>
          {{ item.bank }}: {{ item.reference }}
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>
          <span class="font-bold">${{ item.paid }}</span>
        </td>
        <td>
          <div class="flex gap-4">
            <RouterLink :to="{ name: 'billing.show', params: { id: item.id } }">
              <IconEye size="20" />
            </RouterLink>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useBilling from '@/composables/useBilling';
import { onMounted } from 'vue';
import TheTable from '@/components/Table/TheTable.vue';
import getFormattedDate from '@/utils/date';
import { IconEye } from '@tabler/icons-vue';
import UserInfo from '@/components/UserInfo.vue';

const { getBilling, billing } = useBilling()

onMounted(() => {
  getBilling()
})
</script>
