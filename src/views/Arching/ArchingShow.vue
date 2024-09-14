<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">
      Detalles del arqueo
      <label v-if="arching"> : {{ getBaseDate(arching.date) }} </label>
    </span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <h5 class="text-lg font-bold mb-2">Estadísticas</h5>

  <main class="grid grid-cols-4 gap-2 mb-4">
    <StatCard v-for="(stat, index) in summary" :stat="stat" :key="index" />
  </main>

  <h5 class="text-lg font-bold mb-2">Transferencias</h5>

  <main class="grid grid-cols-4 gap-2 mb-4">
    <StatCard v-for="(stat, index) in summaryBanks" :stat="stat" :key="index" />
  </main>

  <div class="mb-4 bg-white p-4 rounded-xl border">
    <!-- <div class="mb-2">Creado por:</div> -->
    <UserInfo v-if="arching?.user" :item="arching.user" />
  </div>

  <h5 class="text-lg font-bold mb-2">Facturas</h5>

  <TheTable>
    <template #header>
      <th>Fecha</th>
      <th>Referencia</th>
      <th>Cliente</th>
      <th>Total</th>
    </template>
    <template #body>
      <tr v-if="!arching?.billings?.length">
        <td colspan="6" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in arching?.billings" :key="index" class="hover:bg-gray-50">
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>{{ item.bank }}: {{ item.reference }}</td>
        <td>
          {{ item.client }}
        </td>
        <td>${{ item.total }}</td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import StatCard from '@/components/StatCard.vue'
import TheTable from '@/components/Table/TheTable.vue'
import UserInfo from '@/components/UserInfo.vue'
import useArching from '@/composables/useArching'
import getFormattedDate, { getBaseDate } from '@/utils/date'
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const { getArching, arching } = useArching()

const route = useRoute()

onMounted(() => {
  getArching(route.params.id as string)
})

const summary = computed(() => {
  if (!arching.value?.summary) return []

  return arching.value.summary.map((item) => ({
    title: item.type + ' (' + item.weight + ' lbs)',
    value: '$ ' + item.amount
  }))
})

const summaryBanks = computed(() => {
  if (!arching.value?.summaryBanks) return []

  return arching.value.summaryBanks.map((item) => ({
    title: item.bank + ' (' + item.references.length + ')',
    value: '$ ' + item.total
  }))
})
</script>
