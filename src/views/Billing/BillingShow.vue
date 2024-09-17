<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles de la factura</span>
  </header>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="bg-white p-4 rounded-xl border flex flex-col gap-3">
      <div class="text-gray-400">Fecha: {{ getFormattedDate(bill?.createdAt) }}</div>
      <div>Cliente: {{ bill?.client }}</div>
      <div>Facturado por: {{ bill?.user?.name }}</div>
      <div>Cantidad de paquetes: {{ bill?.packages?.length }}</div>
      <div>
        Cuenta:
        <span v-if="bill?.account && typeof bill?.account !== 'string'">
          {{ bill?.account.type }}: {{ bill?.account.number }}
        </span>
        <div class="text-gray-400 text-sm">Referencia: {{ bill?.reference }}</div>
      </div>
      <div class="text-gray-400">Notas: {{ bill?.notes ? bill?.notes : 'No especificado' }}</div>
      <div>Sub total: ${{ bill?.subTotal }}</div>
      <div v-if="bill?.fee">Importe extra: ${{ bill?.fee }}</div>
      <template v-if="bill?.delivery">
        <div>Costo de envío: ${{ bill?.delivery }}</div>
        <div class="text-gray-400">
          Dirección: {{ bill?.address ? bill?.address : 'No especificado' }}
        </div>
      </template>
      <div class="font-bold">Total: ${{ bill?.total }}</div>
    </div>
    <div>
      <TheTable>
        <template #header>
          <th>Tipos</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Monto</th>
        </template>
        <template #body>
          <tr v-if="!bill?.summary?.length">
            <td colspan="5" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr v-for="(item, index) in bill?.summary" :key="index" class="hover:bg-gray-50">
            <td>
              {{ item.type }}
            </td>
            <td>{{ item.weight }} lbs</td>
            <td>
              {{ item.count }}
            </td>
            <td>
              <span v-if="item.price"> ${{ item.price }} </span>
            </td>
            <td>${{ item.amount }}</td>
          </tr>
        </template>
      </TheTable>
    </div>
  </div>

  <h5 class="text-lg font-bold mb-2">Paquetes de la factura</h5>

  <div v-if="bill?.packages" class="grid grid-cols-2 xl:grid-cols-3 gap-4">
    <PackageCard
      v-for="(item, index) in bill?.packages"
      :item="item"
      :key="index"
      :showIcon="false"
    />
  </div>
</template>

<script setup lang="ts">
import PackageCard from '@/components/PackageCard.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useBilling from '@/composables/useBilling'
import getFormattedDate from '@/utils/date'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { getBill, bill } = useBilling()

const route = useRoute()

onMounted(() => {
  getBill(route.params.id as string)
})
</script>
