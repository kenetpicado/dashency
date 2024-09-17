<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles de la factura</span>
  </header>

  <!-- <div class="grid grid-cols-2 gap-4 mb-4">
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

<div v-if="bill?.packages" class="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
  <PackageCard v-for="(item, index) in bill?.packages" :item="item" :key="index" :showIcon="false" />
</div> -->

  <!-- dibujar hoja tamaño carta para previsualizacion de impresion -->
  <div class="w-full flex justify-center">
    <div class="w-[210mm] h-[290mm] bg-white p-[1cm]">
      <div class="flex justify-between mb-6">
        <div class="flex flex-col gap-1">
          <div class="text-xl font-bold">Factura</div>
          <div class="text-gray-400 text-sm">#{{ bill?.id }}</div>
          <div class="text-gray-400 text-sm">{{ getFormattedDate(bill?.createdAt) }}</div>
        </div>
        <div class="text-end flex flex-col gap-1">
          <div class="font-bold">Envios de Occidente</div>
          <div class="text-gray-400 text-sm">86006856</div>
          <div class="text-gray-400 text-sm">info@enviosdeoccidente.com</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1 mb-4">
          <div>
            Cajero: {{ bill?.user?.name }}
          </div>
          <div>
            Cliente: {{ bill?.client }}
          </div>
          <div>
            Dirección de envío: {{ bill?.address ? bill?.address : 'No especificado' }}
          </div>
          <div class="text-gray-400">
            Notas: {{ bill?.notes ? bill?.notes : 'Ninguna' }}
          </div>
        </div>
        <div class="text-end flex flex-col gap-1">
          <div v-if="bill?.account && typeof bill?.account !== 'string'">
            {{ bill?.account.type }}: {{ bill?.account.number }}
          </div>
          <div class="text-gray-400">Referencia: {{ bill?.reference }}</div>
        </div>
      </div>

      <h5 class="font-bold mb-2 text-gray-300">
        Artículos
      </h5>

      <table class="print-table mb-4 table-fixed">
        <thead>
          <tr>
            <th class="bg-gray-100 font-semibold text-sm">Código</th>
            <th class="bg-gray-100 font-semibold text-sm">Descripción</th>
            <th class="bg-gray-100 font-semibold text-sm">Peso</th>
            <th class="bg-gray-100 font-semibold text-sm">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bill?.packages" :key="item.id">
            <td>{{ item.guide }}</td>
            <td>
              {{ item.description }} ({{ item.pieces }})
            </td>
            <td>{{ item.grossWeight }} lbs</td>
            <td>
              {{ item.type }}
            </td>
          </tr>
        </tbody>
      </table>

      <h5 class="font-bold mb-2 text-gray-300">
        Tipos de envío
      </h5>

      <table class="print-table mb-4 table-fixed">
        <thead>
          <tr>
            <th class="bg-gray-100 font-semibold text-sm">
              Tipo envío
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Peso
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Precio
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Monto
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bill?.summary" :key="index" class="hover:bg-gray-50">
            <td>
              {{ item.type }}
            </td>
            <td>
              {{ item.weight }} lbs ({{ item.count }} items)
            </td>
            <td>
              <span v-if="item.price"> ${{ item.price }} </span>
            </td>
            <td>${{ item.amount }}</td>
          </tr>
        </tbody>
      </table>

      <h5 class="font-bold mb-2 text-gray-300">
        Resumen
      </h5>

      <table class="print-table mb-4 table-fixed">
        <thead>
          <tr>
            <th class="bg-gray-100 font-semibold text-sm">
              Costo envío
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Importe extra
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Sub total
            </th>
            <th class="bg-gray-100 font-semibold text-sm">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${{ bill?.delivery }}</td>
            <td>${{ bill?.fee }}</td>
            <td>${{ bill?.subTotal }}</td>
            <td class="font-bold">${{ bill?.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

<style scoped>
.print-table {
  border-collapse: collapse;
  width: 100%;
}

.print-table th,
.print-table td {
  padding: 0.4rem;
  text-align: left;
}

table th:first-child {
  border-radius: 10px 0 0 10px;
}

table th:last-child {
  border-radius: 0 10px 10px 0;
}
</style>