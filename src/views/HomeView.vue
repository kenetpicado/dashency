<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { onMounted } from 'vue'
import useAuth from '@/composables/useAuth'
import { useStorage } from '@vueuse/core'
import useHome from '@/composables/useHome'

const { getProfile } = useAuth()
const selected = useStorage('selected', 'home')
const { getHome, home } = useHome()

onMounted(() => {
  selected.value = 'home'
  getProfile()
  getHome()
})
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl"> Estadísticas mensuales </span>
  </header>
  <main v-if="home.stats.length" class="grid grid-cols-4 xl:grid-cols-5 gap-4">
    <StatCard v-for="(stat, index) in home.stats" :stat="stat" :key="index" />
  </main>
</template>
