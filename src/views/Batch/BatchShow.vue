<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles</span>
  </header>

  <main class="grid grid-cols-4 xl:grid-cols-5 gap-2 mb-8">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>

  <div v-if="batch?.user" class="bg-white p-4 rounded-xl mb-8">
    <span class="font-bold">
      {{ batch.user.name }} - {{ batch.user.role }}
    </span>
    <div class="mb-5">
      {{ batch.user.email }}
    </div>
    <div class="text-gray-400">
      Registrado el {{ getFormattedDate(batch.createdAt) }}
    </div>
  </div>

  <PackageTable :packages="batch?.packages" />
</template>

<script setup lang="ts">
import StatCard from '@/components/StatCard.vue';
import PackageTable from '@/components/Table/PackageTable.vue'
import useBatch from '@/composables/useBatch'
import getFormattedDate from '@/utils/date';
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
])
</script>
