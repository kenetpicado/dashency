<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'

const stats = [
  {
    title: 'Usuarios',
    value: '5'
  },
  {
    title: 'Ingresos',
    value: '$ 5,000'
  },
  {
    title: 'Usuarios',
    value: '5'
  },
  {
    title: 'Ingresos',
    value: '$ 5,000'
  },
  {
    title: 'Ingresos',
    value: '$ 5,000'
  }
]
</script>

<template>
  <main class="grid grid-cols-4 xl:grid-cols-6 gap-4">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>
</template>
