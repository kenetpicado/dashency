<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles de la factura</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <h5 class="text-lg font-bold mb-2">Estadísticas</h5>

  <main class="grid grid-cols-4 gap-2 mb-4">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>

  <h5 class="text-lg font-bold mb-2">Resumen</h5>

  <main class="grid grid-cols-4 gap-2 mb-4">
    <StatCard v-for="(stat, index) in summaryStat" :stat="stat" :key="index" />
  </main>

  <div class="mb-4 bg-white p-4 rounded-xl border">
    <div class="text-lg mb-4">
      Cliente: <strong>{{ bill?.client }}</strong>
    </div>
    <div class="mb-2">Facturado por:</div>
    <UserInfo v-if="bill?.user" :item="bill.user" />
  </div>

  <h5 class="text-lg font-bold mb-2">Paquetes</h5>

  <div v-if="bill?.packages" class="grid grid-cols-2 xl:grid-cols-3 gap-4">
    <PackageCard
      v-for="(item, index) in bill?.packages"
      :item="item"
      :key="index"
      :showIcon="false"
    />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useBilling from '@/composables/useBilling'
import { computed, onMounted } from 'vue'
import getFormattedDate from '@/utils/date'
import { IconPackage, IconCurrencyDollar, IconDatabaseDollar } from '@tabler/icons-vue'
import UserInfo from '@/components/UserInfo.vue'
import StatCard from '@/components/StatCard.vue'
import PackageCard from '@/components/PackageCard.vue'
import type { IStatCard } from '@/types'

const { getBill, bill } = useBilling()

const route = useRoute()

onMounted(() => {
  getBill(route.params.id as string)
})

const stats = computed(
  () =>
    [
      {
        title: 'Paquetes',
        value: bill.value?.packages?.length || '0',
        icon: IconPackage
      },
      {
        title: bill.value?.bank,
        value: bill.value?.reference || '',
        icon: IconDatabaseDollar
      },
      {
        title: 'Facturado',
        value: '$ ' + bill.value?.total || '0',
        icon: IconCurrencyDollar
      },
      {
        title: 'Creado',
        value: getFormattedDate(bill.value?.createdAt) || ''
      }
    ] as IStatCard[]
)

const summaryStat = computed(() => {
  if (!bill.value?.summary) return []

  return bill.value.summary.map((item) => ({
    title: item.type + ' (' + item.count + ')',
    value: '$ ' + item.amount
  }))
})
</script>
