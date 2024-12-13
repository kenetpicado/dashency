<script setup lang="ts">
import { onMounted } from 'vue'
import useHome from '@/composables/useHome'
import getFormattedDate from '@/utils/date'

const { getHome, home, processing } = useHome()

onMounted(async () => {
  await getHome()
})
</script>

<template>
  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">
      Estadisticas de este mes
    </span>
  </header>

  <span v-if="processing" class="loading loading-spinner loading-lg mx-auto flex items-center">
  </span>
  <main
    v-else-if="home.stats.length"
    class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4"
  >
    <div v-for="(stat, index) in home.stats" class="stats shadow" :key="index">
      <div class="stat">
        <div class="stat-title">
          {{ stat.title }}
        </div>
        <div class="stat-value">C$ {{ stat.value.toLocaleString() }}</div>
      </div>
    </div>
  </main>
</template>
