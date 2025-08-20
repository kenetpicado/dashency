<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl"> Detalles </span>
  </header>

  <IsLoading v-if="processing" />

  <template v-else-if="arching">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div>
        <TheTable table-class="table-fixed">
          <template #body>
            <tr>
              <td class="border-r text-sm text-gray-400">Fecha</td>
              <td>
                <span v-if="arching.createdAt">
                  {{ format(arching.createdAt, { date: 'short', time: 'short' }) }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="border-r text-sm text-gray-400">Realizado por</td>
              <td>{{ arching.user?.name }}</td>
            </tr>
            <tr>
              <td class="border-r text-sm text-gray-400">Fecha del arqueo</td>
              <td>{{ format(arching.date) }}</td>
            </tr>
            <tr>
              <td class="border-r text-sm text-gray-400">Total arqueado</td>
              <td>
                {{ arching.total.toLocaleString('en', CURRENCY_OPTIONS) }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="border-r">RESUMEN</td>
            </tr>
            <tr v-for="item in arching.summary" :key="item.type">
              <td class="border-r text-sm text-gray-400">
                {{ item.type }}
              </td>
              <td>
                {{ item.weight }} lb(s) - {{ item.count }} paquetes -
                {{ item.amount.toLocaleString('en', CURRENCY_OPTIONS) }}
              </td>
            </tr>
          </template>
        </TheTable>
      </div>

      <div>
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
              <td>{{ item.total.toLocaleString('en', CURRENCY_OPTIONS) }}</td>
            </tr>
          </template>
        </TheTable>
      </div>
    </div>

    <TheTable>
      <template #header>
        <th>Creado</th>
        <th>Por</th>
        <th>Cuenta</th>
        <th>Referencia</th>
        <th>Cliente</th>
        <th>Total</th>
        <th>Acciones</th>
      </template>
      <template #body>
        <tr v-if="!arching.billings?.length">
          <td colspan="7" class="text-center">No hay datos que mostrar</td>
        </tr>
        <tr v-else v-for="(item, index) in arching.billings" :key="index" class="hover:bg-gray-50">
          <td>
            <span v-if="item.createdAt">
              {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
            </span>
          </td>
          <td>
            <span v-if="item.user && typeof item.user !== 'string'">
              {{ item.user.name }}
            </span>
          </td>
          <td>
            <span v-if="item.account && typeof item.account !== 'string'">
              {{ item.account.type }}: {{ item.account.number }}
            </span>
          </td>
          <td>
            {{ item.reference }}
          </td>
          <td>
            {{ item.client }}
          </td>
          <td>{{ item.total.toLocaleString('en', CURRENCY_OPTIONS) }}</td>
          <td>
            <RouterLink :to="{ name: 'billing.show', params: { id: item._id } }">
              <IconEye size="25" />
            </RouterLink>
          </td>
        </tr>
      </template>
    </TheTable>
  </template>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import useArching from '@/composables/useArching'
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { format } from '@formkit/tempo'
import { CURRENCY_OPTIONS } from '@/defaults'
import IsLoading from '@/components/IsLoading.vue'
import { IconEye } from '@tabler/icons-vue'

const { getArching, arching, processing } = useArching()

const route = useRoute()

onMounted(() => {
  getArching(route.params.id as string)
})
</script>
