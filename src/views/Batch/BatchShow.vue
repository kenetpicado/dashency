<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles</span>
  </header>

  <main class="grid grid-cols-4 xl:grid-cols-5 gap-2 mb-4">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>

  <div class="mb-4 bg-white p-4 rounded-xl border">
    <UserInfo v-if="batch?.user" :item="batch.user" />
  </div>

  <div v-if="batch?.packages" class="grid grid-cols-2 xl:grid-cols-3 gap-4">
    <PackageCard v-for="(item, index) in batch?.packages" :item="item" :key="index" :showIcon="false" />
  </div>
</template>

<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import useBatch from '@/composables/useBatch'
import getFormattedDate from '@/utils/date'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PackageCard from '@/components/PackageCard.vue'
import UserInfo from '@/components/UserInfo.vue'
import type { IStatCard } from '@/types'

const route = useRoute()
const { getBatch, batch } = useBatch()

onMounted(() => getBatch(route.params.id as string))

const stats = computed(() => [
  {
    title: 'Tipo',
    value: batch.value?.type || ''
  },
  {
    title: 'Total',
    value: '$ ' + batch.value?.total || ''
  },
  {
    title: 'Paquetes',
    value: batch.value?.packages.length || '0'
  },
  {
    title: 'Código o referencia',
    value: batch.value?.code || ''
  },
  {
    title: 'Creado',
    value: getFormattedDate(batch.value?.createdAt) || ''
  }
] as IStatCard[])
</script>
