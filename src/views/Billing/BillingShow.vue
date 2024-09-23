<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles de la factura</span>
    <BtnPrimary v-print="printObj" id="btnPrint">Imprimir</BtnPrimary>
  </header>

  <div class="w-full flex justify-center">
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

const { getBill, bill } = useBilling()

const route = useRoute()

onMounted(async () => {
  await getBill(route.params.id as string)
  document.title = 'Factura-' + bill?.value?.id

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
