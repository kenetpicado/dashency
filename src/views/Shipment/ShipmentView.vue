<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Encomiendas</h2>
      <div class="text-sm text-balance text-gray-400">Administra las etiquetas de encomienda</div>
    </div>
    <RouterLink :to="{ name: 'shipments.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </div>

  <TheTable>
    <template #header>
      <th>Creado</th>
      <th>Envia</th>
      <th>Recibe</th>
      <th>Destino</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <TableSkeleton v-if="processing" :columns="5" />
      <tr v-else-if="!shipments.length">
        <td colspan="5" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-else v-for="(item, index) in shipments" :key="index" class="hover:bg-gray-50">
        <td>
          <span v-if="item.createdAt">
            {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
          </span>
        </td>
        <td>{{ item.senderName }}</td>
        <td>{{ item.receiverName }}</td>
        <td>{{ item.destinationCountry }} - {{ item.destinationDepartment }}</td>
        <td>
          <div class="flex gap-4 items-center">
            <RouterLink :to="{ name: 'shipments.show', params: { id: item.id } }">
              <IconEye size="20" />
            </RouterLink>
            <RouterLink :to="{ name: 'shipments.edit', params: { id: item.id } }">
              <IconEdit size="20" />
            </RouterLink>
            <button v-if="item.id" type="button" @click="confirmDelete(item.id)">
              <IconTrash size="20" />
            </button>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import ThePaginate from '@/components/ThePaginate.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useShipment from '@/composables/useShipment'
import { format } from '@formkit/tempo'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-vue'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import TableSkeleton from '@/components/TableSkeleton.vue'

const { getShipments, shipments, processing, deleteShipment, meta } = useShipment()

onMounted(async () => {
  await getShipments()
})

watch(
  () => meta.value.page,
  () => {
    getShipments()
  }
)

function confirmDelete(id: string) {
  if (confirm('¿Estás seguro de eliminar este shipment?')) {
    deleteShipment(id)
  }
}
</script>
