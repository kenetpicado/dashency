<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Arqueos</span>
    <RouterLink :to="{ name: 'archings.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Creado</th>
      <th>Fecha</th>
      <th>Total</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!archings.data.length">
        <td colspan="5" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in archings.data" :key="index" class="hover:bg-gray-50">
        <td>
          <UserInfo v-if="item.user" :item="item.user" />
        </td>
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          {{ getBaseDate(item.date) }}
        </td>
        <td>${{ item.total }}</td>
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
  <PaginationComponent :pages="archings.pages" :page="archings.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import TheTable from '@/components/Table/TheTable.vue'
import UserInfo from '@/components/UserInfo.vue'
import useArching from '@/composables/useArching'
import getFormattedDate, { getBaseDate } from '@/utils/date'
import { IconEye } from '@tabler/icons-vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const { getArchings, archings, queryParams } = useArching()

onMounted(() => {
  getArchings()
})

function getThisPage(selected: number) {
  queryParams.value.page = selected * 1
}
</script>
