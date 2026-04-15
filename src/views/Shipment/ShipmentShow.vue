<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Encomienda</h2>
      <div class="text-sm text-balance text-gray-400">Detalles de la etiqueta de encomienda</div>
    </div>
    <BtnPrimary> Imprimir </BtnPrimary>
  </div>

  <template v-if="processing">
    <span class="loading loading-spinner loading-lg flex mx-auto text-gray-300"></span>
  </template>

  <template v-else-if="shipment">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div>
        <TheTable table-class="table-fixed">
          <template #body>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Creado</td>
              <td>
                <span v-if="shipment.createdAt">
                  {{ format(shipment.createdAt, { date: 'short', time: 'short' }) }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Nombre del remitente</td>
              <td>{{ shipment.senderName }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Teléfono del remitente</td>
              <td>{{ shipment.senderPhone }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">País de destino</td>
              <td>{{ shipment.destinationCountry }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Departamento de destino</td>
              <td>{{ shipment.destinationDepartment }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Nombre del destinatario</td>
              <td>{{ shipment.receiverName }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Teléfono del destinatario</td>
              <td>{{ shipment.receiverPhone }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Dirección completa</td>
              <td>{{ shipment.fullAddress }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Tracking</td>
              <td>{{ shipment.tracking }}</td>
            </tr>
          </template>
        </TheTable>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import useShipment from '@/composables/useShipment'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { format } from '@formkit/tempo'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'

const route = useRoute()
const { getShipment, shipment, processing } = useShipment()

onMounted(async () => {
  await getShipment(route.params.id as string)
})
</script>
