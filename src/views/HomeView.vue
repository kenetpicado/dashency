<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { onMounted } from 'vue'
import useAuth from '@/composables/useAuth'
import useHome from '@/composables/useHome'
import Chart, { type ChartItem } from 'chart.js/auto'
import getFormattedDate from '@/utils/date'

const { getProfile } = useAuth()
const { getHome, home } = useHome()

const arrayDays = Array.from({ length: 31 }, (_, i) => i + 1)

const getDay = (day: number) => {
  const date = new Date()
  date.setDate(day)
  return getFormattedDate(date, 'YYYY-MM-DD')
}

onMounted(async () => {
  await getProfile()
  await getHome()

  const cx = document.getElementById('chart')

  if (cx) {
    new Chart(cx as ChartItem, {
      type: 'line',
      data: {
        labels: arrayDays,
        datasets: [
          {
            label: 'Ingresos',
            data: arrayDays.map(
              (day) => home.value.incomes.find((r) => r.day === getDay(day))?.total || 0
            ),
            fill: 'start'
          },
          {
            label: 'Gastos',
            data: arrayDays.map(
              (day) => home.value.expenses.find((r) => r.day === getDay(day))?.total || 0
            ),
            fill: 'start'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
            borderWidth: 2
          },
          point: {
            radius: 3
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl"> Estadísticas mensuales </span>
  </header>

  <main v-if="home.stats.length" class="grid grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
    <StatCard
      v-for="(stat, index) in home.stats"
      :stat="{ ...stat, value: `$ ${stat.value.toLocaleString()}` }"
      :key="index"
    />
  </main>

  <div class="bg-white p-4 border rounded-lg w-[97%] min-h-[30rem]">
    <canvas id="chart"></canvas>
  </div>
</template>
