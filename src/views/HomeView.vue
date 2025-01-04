<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useHome from '@/composables/useHome'
import TheTable from '@/components/Table/TheTable.vue'

interface History {
  name: string
  expense: number
  income: number
  batches: number
}

const { getHome, home, processing, year } = useHome()
const currentMonth = new Date().getMonth() + 1
const history = ref<History[]>([])

const monthsSpanish = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

onMounted(async () => {
  await getHome()
})

watch(
  () => home.value,
  () => {
    let data = []

    for (let i = 1; i <= currentMonth; i++) {
      const month = i < 10 ? `0${i}` : i

      const expense =
        home.value.expenses.find((item) => item._id === year.value + '-' + month)?.total || 0
      const income =
        home.value.incomes.find((item) => item._id === year.value + '-' + month)?.total || 0
      const batches =
        home.value.batches.find((item) => item._id === year.value + '-' + month)?.total || 0

      if (expense === 0 && income === 0 && batches === 0) continue

      data.push({
        name: monthsSpanish[i - 1],
        expense: expense,
        income: income,
        batches: batches
      })
    }

    history.value = data
  }
)
</script>

<template>
  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl"> Estadisticas </span>
  </header>

  <span v-if="processing" class="loading loading-spinner loading-lg mx-auto flex items-center">
  </span>

  <TheTable v-else>
    <template #header>
      <th>Mes</th>
      <th>Facturado</th>
      <th>Lotes</th>
      <th>Gastos</th>
      <th>Ganancia</th>
    </template>
    <template #body>
      <tr v-if="history && !history.length">
        <td colspan="5" class="text-center text-gray-400">No hay datos</td>
      </tr>
      <tr v-for="(item, index) in history" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.name }}
        </td>
        <td>
          <span class="bg-green-100 text-green-600 rounded-lg px-2 py-1">
            ${{ item.income.toLocaleString() }}
          </span>
        </td>
        <td>
          <span class="bg-red-100 text-red-600 rounded-lg px-2 py-1">
            ${{ item.batches.toLocaleString() }}
          </span>
        </td>
        <td>
          <span class="bg-red-100 text-red-600 rounded-lg px-2 py-1">
            ${{ item.expense.toLocaleString() }}
          </span>
        </td>
        <td class="font-bold">
          ${{ (item.income - (item.expense + item.batches)).toLocaleString() }}
        </td>
      </tr>
    </template>
  </TheTable>
</template>
