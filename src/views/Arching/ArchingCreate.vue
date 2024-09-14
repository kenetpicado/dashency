<template>
  <header class="flex items-center justify-between mb-4 h-14">
    <span class="font-bold text-2xl">Nuevo Arqueo</span>
  </header>

  <div class="grid grid-cols-4 gap-4 mb-4">
    <InputForm text="Fecha" name="date" v-model="billingParams.date" type="date" />
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <div class="font-bold text-xl">
        Transacciones
      </div>
      <div v-if="!billing.data.length" class="text-center text-gray-400">
        No hay transacciones
      </div>
      <div v-for="item in billing.data" :key="item.id" class="bg-white p-4 rounded-lg border">
        <div class="text-gray-400 text-xs mb-2">
          {{ getFormattedDate(item.createdAt) }}
        </div>
        <div class="mb-1">
          {{ item.client }}
        </div>
        <div class="flex justify-between">
          <div>
            {{ item.bank }}: {{ item.reference }}
          </div>
          <div class="text-xl">
            ${{ item.total }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="font-bold text-xl">
        Resumen
      </div>
      <TheTable>
        <template #header>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Peso</th>
          <th>Total</th>
        </template>
        <template #body>
          <tr v-if="!summary.length">
            <td colspan="6" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr v-for="(item, index) in summary" :key="index" class="hover:bg-gray-50">
            <td>
              {{ item.type }}
            </td>
            <td>
              {{ item.count }}
            </td>
            <td>
              {{ item.weight }} lbs
            </td>
            <td>
              ${{ item.amount }}
            </td>
          </tr>
        </template>
      </TheTable>
      <TheTable>
        <template #header>
          <th>Banco</th>
          <th>Cantidad</th>
          <th>Total</th>
        </template>
        <template #body>
          <tr v-if="!bankSummary.length">
            <td colspan="6" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr v-for="(item, index) in bankSummary" :key="index" class="hover:bg-gray-50">
            <td>
              {{ item.bank }}
            </td>
            <td>
              {{ item.references.length }}
            </td>
            <td>${{ item.total }}</td>
          </tr>
        </template>
      </TheTable>
      <div class="flex justify-end gap-4">
        <BtnSecondary>Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import InputForm from '@/components/Form/InputForm.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useArching from '@/composables/useArching'
import useBilling from '@/composables/useBilling'
import type { IBankSummary, ISummary, IArching } from '@/types'
import getFormattedDate from '@/utils/date'
import toast from '@/utils/toast'
import { onMounted, ref, watch } from 'vue'
import 'vue-loading-overlay/dist/css/index.css'

const { getBillingDay, queryParams: billingParams, billing } = useBilling()
const { processing, storeArching } = useArching()

const bankSummary = ref<IBankSummary[]>([])
const summary = ref<ISummary[]>([])

const form = ref<IArching>({
  date: "",
  total: 0,
  summary: [],
  summaryBanks: [],
  billing_ids: []
})

watch(() => billingParams.value.date, async () => {
  await getBillingDay()
  setBankSummary()
  setSummary()
})

onMounted(async () => {
  billingParams.value.date = getFormattedDate(new Date(), 'YYYY-MM-DD')
  await getBillingDay()
  setBankSummary()
  setSummary()
})

function setBankSummary() {
  const uniqueBanks = new Set(billing.value.data.map((item) => item.bank))
  const temporalSummary: IBankSummary[] = []

  uniqueBanks.forEach((bank) => {
    const transactions = billing.value.data.filter((item) => item.bank === bank)

    temporalSummary.push({
      bank,
      total: Math.round(transactions.reduce((acc, item) => acc + item.total, 0) * 100) / 100,
      references: transactions.map((item) => item.reference)
    })
  })

  temporalSummary.push({
    bank: 'TOTAL',
    total: Math.round(temporalSummary.reduce((acc, item) => acc + item.total, 0) * 100) / 100,
    references: billing.value.data.map((item) => item.reference)
  })

  bankSummary.value = temporalSummary
}

function setSummary() {
  const flatSummary = billing.value.data.filter((item) => item.summary !== undefined && item.summary.length > 1).map((item) => item.summary).flat() as ISummary[]
  const temporalSummary: ISummary[] = []

  const uniqueTypes = [...new Set(flatSummary.map((item) => item.type))].sort()

  uniqueTypes.forEach((type) => {
    const summaries = flatSummary.filter((item) => item && item.type === type)

    temporalSummary.push({
      type: type as string,
      weight: Math.round(summaries.reduce((acc, item) => acc + item.weight, 0) * 100) / 100,
      amount: Math.round(summaries.reduce((acc, item) => acc + item.amount, 0) * 100) / 100,
      count: Math.round(summaries.reduce((acc, item) => acc + item.count, 0))
    })
  })

  summary.value = temporalSummary
}

function onSubmit() {
  if (!billing.value.data.length) {
    toast.error("No hay transacciones que guardar")
  }

  form.value.date = billingParams.value.date
  form.value.summary = summary.value
  form.value.summaryBanks = bankSummary.value
  form.value.billing_ids = billing.value.data.map((item) => item.id as string)

  const totalItem = bankSummary.value.find((item) => item.bank === "TOTAL")

  if (totalItem) {
    form.value.total = totalItem.total
  }

  if (form.value.total < 1) {
    toast.error("El total es requerido")
  }

  storeArching(form.value)
}

</script>
