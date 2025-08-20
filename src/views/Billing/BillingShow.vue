<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles</span>
    <BtnPrimary v-print="printObj" id="btnPrint">Imprimir</BtnPrimary>
  </header>

  <IsLoading v-if="processing" />

  <div v-else-if="bill" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
    <div>
      <TheTable table-class="table-fixed">
        <template #body>
          <tr>
            <td class="border-r text-sm text-gray-400">Fecha</td>
            <td>
              <span v-if="bill.createdAt">
                {{ format(bill.createdAt, { date: 'short', time: 'short' }) }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Realizado por</td>
            <td>{{ bill.user?.name }}</td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">ID</td>
            <td>
              {{ bill._id }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Recibo</td>
            <td>
              {{ bill.invoice?.toString().padStart(6, '0') }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Cuenta</td>
            <td>{{ bill.account.type }}: {{ bill.account?.number }}</td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Referencia</td>
            <td>
              {{ bill.reference }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Cliente</td>
            <td>
              {{ bill.client }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Paquetes en la factura</td>
            <td>
              {{ bill.packages?.length }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Dirección de envío</td>
            <td>
              {{ bill.address || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Notas</td>
            <td>
              {{ bill.notes || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Envío terrestre</td>
            <td>
              {{ bill.delivery?.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Importe extra</td>
            <td>
              {{ bill.fee?.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400">Sub total</td>
            <td>
              {{ bill.subTotal.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
          </tr>
          <tr>
            <td class="border-r text-sm text-gray-400 font-bold">Total</td>
            <td class="font-bold">
              {{ bill.total.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
          </tr>
        </template>
      </TheTable>
    </div>

    <div class="flex flex-col gap-4">
      <TheTable>
        <template #header>
          <th>Concepto</th>
          <th>Peso total</th>
          <th>Paquetes</th>
          <th>Precio por lb</th>
          <th>Total</th>
        </template>

        <template #body>
          <tr v-for="(item, index) in bill.summary" :key="index">
            <td>
              {{ item.type }}
            </td>
            <td>{{ item.weight }} lb(s)</td>
            <td>
              {{ item.count }}
            </td>
            <td>
              {{ item.price?.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
            <td>
              {{ item.amount?.toLocaleString('en', CURRENCY_OPTIONS) }}
            </td>
          </tr>
        </template>
      </TheTable>

      <TheTable>
        <template #header>
          <th>Guía</th>
          <th>Tipo</th>
          <th>Peso</th>
          <th>Cliente</th>
        </template>

        <template #body>
          <tr v-for="(item, index) in bill.packages" :key="index">
            <td>
              {{ item.guide }}
            </td>
            <td>
              {{ item.type }}
            </td>
            <td>{{ item.grossWeight }} lb(s)</td>
            <td>
              {{ item.client }}
            </td>
          </tr>
        </template>
      </TheTable>
    </div>
  </div>

  <div class="hidden">
    <div class="bg-white p-[0.8cm]">
      <div class="w-[210mm] min-h-[200mm] bg-white" id="printMe">
        <div class="flex justify-between mb-6">
          <div class="flex flex-col gap-1">
            <div class="font-bold text-2xl">Factura #{{ bill?.invoice }}</div>
            <div class="text-gray-400 text-sm">info@enviosdeoccidente.com</div>
            <div class="text-gray-400 text-sm">+50581898796 / +15043340891</div>
            <div class="text-gray-400 text-sm">{{ getFormattedDate(bill?.createdAt) }}</div>
          </div>
          <img class="w-[2cm] h-[2cm] ml-auto" src="/logo-blue.png" alt="" />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-1 mb-4">
            <div>Cliente: {{ bill?.client }}</div>
            <div v-if="bill?.address">Dirección de envío: {{ bill?.address }}</div>
            <div class="text-gray-400" v-if="bill?.notes">Notas: {{ bill?.notes }}</div>
          </div>
          <div class="text-end flex flex-col gap-1">
            <div>Cajero: {{ bill?.user?.name }}</div>
            <div v-if="bill?.account && typeof bill?.account !== 'string'">
              {{ bill?.account.type }}: {{ bill?.account.number }}
            </div>
            <div class="text-gray-400">Referencia: {{ bill?.reference }}</div>
          </div>
        </div>

        <h5 class="font-bold mb-2 text-gray-300">Artículos</h5>

        <table class="print-table mb-4 table-fixed text-sm">
          <thead>
            <tr>
              <th class="bg-gray-50 font-semibold text-sm" colspan="2">Código</th>
              <th class="bg-gray-50 font-semibold text-sm">Peso</th>
              <th class="bg-gray-50 font-semibold text-sm">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bill?.packages" :key="item.id">
              <td colspan="2">{{ item.guide }} - ({{ item.pieces }}) {{ item.description }}</td>
              <td>{{ item.grossWeight }} lbs</td>
              <td>
                {{ item.type }}
              </td>
            </tr>
          </tbody>
        </table>

        <table class="print-table mb-4 table-fixed text-sm">
          <thead>
            <tr>
              <th class="bg-gray-50 font-semibold text-sm">Tipo envío</th>
              <th class="bg-gray-50 font-semibold text-sm">Precio lb</th>
              <th class="bg-gray-50 font-semibold text-sm">Peso</th>
              <th class="bg-gray-50 font-semibold text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in bill?.summary" :key="index" class="hover:bg-gray-50">
              <td>({{ item.count }}) {{ item.type }}</td>
              <td>
                <span v-if="item.price"> ${{ item.price }} </span>
              </td>
              <td>{{ item.weight }} lbs</td>
              <td>${{ item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <h5 class="font-bold mb-2 text-gray-300">Resumen</h5>

        <table class="print-table table-fixed text-sm">
          <thead>
            <tr>
              <th class="bg-gray-50 font-semibold text-sm">Envío terrestre</th>
              <th class="bg-gray-50 font-semibold text-sm">Importe extra</th>
              <th class="bg-gray-50 font-semibold text-sm">Sub total</th>
              <th class="bg-gray-50 font-semibold text-sm">Total</th>
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
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useBilling from '@/composables/useBilling'
import getFormattedDate from '@/utils/date'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TheTable from '@/components/Table/TheTable.vue'
import { format } from '@formkit/tempo'
import { CURRENCY_OPTIONS } from '@/defaults'
import IsLoading from '@/components/IsLoading.vue'

const { getBill, bill, processing } = useBilling()

const route = useRoute()

onMounted(async () => {
  await getBill(route.params.id as string)

  if (route.query.action === 'print') {
    document.getElementById('btnPrint')?.click()
  }
})

const printObj = {
  id: 'printMe',
  popTitle: 'Factura',
  printTitle: 'Factura'
}
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
