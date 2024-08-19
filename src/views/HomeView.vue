<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { onMounted } from 'vue'
import useAuth from '@/composables/useAuth.ts'

const { getProfile, auth } = useAuth()

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

onMounted(() => {
  getProfile()
})
</script>

<template>
  <main class="grid grid-cols-4 xl:grid-cols-5 gap-4">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>
  <pre>{{ auth }}</pre>
</template>
