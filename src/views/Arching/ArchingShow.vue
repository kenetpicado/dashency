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

  <div class="mb-4 bg-white p-4 rounded-xl border">
    <UserInfo v-if="arching?.user" :item="arching.user" />
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <h5 class="text-lg font-bold mb-2">Resumen</h5>
      <TheTable>
        <template #header>
          <th>Tipos</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th>Monto</th>
        </template>
        <template #body>
          <tr v-if="!arching?.summary?.length">
            <td colspan="4" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr v-for="(item, index) in arching?.summary" :key="index" class="hover:bg-gray-50">
            <td>
              {{ item.type }}
            </td>
            <td>{{ item.weight }} lbs</td>
            <td>
              {{ item.count }}
            </td>
            <td>${{ item.amount }}</td>
          </tr>
        </template>
      </TheTable>
    </div>

    <div>
      <h5 class="text-lg font-bold mb-2">Transferencias</h5>
      <TheTable>
        <template #header>
          <th>Cuenta</th>
          <th>Referencias</th>
          <th>Monto</th>
        </template>
        <template #body>
          <tr v-if="!arching?.accountSummary?.length">
            <td colspan="4" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr
            v-for="(item, index) in arching?.accountSummary"
            :key="index"
            class="hover:bg-gray-50"
          >
            <td>
              {{ item.account_key }}
            </td>
            <td>{{ item.references.length }}</td>
            <td>${{ item.total }}</td>
          </tr>
        </template>
      </TheTable>
    </div>
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
        <td>
          <div v-if="item.account && typeof item.account !== 'string'">
            {{ item.account.type }}: {{ item.account.number }}
          </div>
          <div class="text-gray-400 text-sm">
            {{ item.reference }}
          </div>
        </td>
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
import TheTable from '@/components/Table/TheTable.vue'
import UserInfo from '@/components/UserInfo.vue'
import useArching from '@/composables/useArching'
import getFormattedDate, { getBaseDate } from '@/utils/date'
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const { getArching, arching } = useArching()

const route = useRoute()

onMounted(() => {
  getArching(route.params.id as string)
})
</script>
