<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { onMounted } from 'vue'
import useAuth from '@/composables/useAuth'
import { useStorage } from '@vueuse/core'
import useHome from '@/composables/useHome'
import ApexCharts from 'apexcharts'

const { getProfile } = useAuth()
const selected = useStorage('selected', 'home')
const { getHome, home } = useHome()

const arrayDays = Array.from({ length: 31 }, (_, i) => i + 1)

onMounted(async () => {
  selected.value = 'home'
  getProfile()
  await getHome()

  var chart = new ApexCharts(document.getElementById("chart"), {
    chart: {
      type: 'area',
      height: 650,
      width: '98%',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      }
    },
    colors: ['#dc2626', '#0C1B6E'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [{
      name: 'Gastos',
      data: arrayDays.map((day) => home.value.expenses.find((r) => r.day === day)?.total || 0),
    }, {
      name: 'Ingresos',
      data: arrayDays.map((day) => home.value.incomes.find((r) => r.day === day)?.total || 0),
    }],
    xaxis: {
      categories: arrayDays,
    },
    yaxis: {
      labels: {
        formatter: function (value: string) {
          return "$ " + value.toLocaleString();
        }
      }
    }
  });

  chart.render();
})

</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl"> Estadísticas mensuales </span>
  </header>

  <main v-if="home.stats.length" class="grid grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
    <StatCard v-for="(stat, index) in home.stats" :stat="{ ...stat, value: `$ ${stat.value.toLocaleString()}` }"
      :key="index" />
  </main>

  <div class="bg-white p-4 border rounded-lg">
    <div id="chart"></div>
  </div>
</template>
