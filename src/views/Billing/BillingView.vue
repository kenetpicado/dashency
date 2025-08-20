<template>
  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Facturación</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <FieldForm text="Desde" name="desde" v-model="from" type="date" />

    <FieldForm text="Hasta" name="hasta" v-model="to" type="date" />

    <FieldForm as="select" text="Cuenta" name="cuenta" v-model="queryParams.account">
      <option value="">Todas</option>
      <option v-for="item in accounts" :value="item.id" :key="item.id">
        {{ item.type }} - {{ item.number }}
      </option>
    </FieldForm>

    <FieldForm
      text="Referencia"
      name="reference"
      v-model="queryParams.reference"
      type="search"
      placeholder="Buscar referencia"
    />

    <FieldForm
      text="Cliente"
      name="client"
      v-model="queryParams.client"
      type="search"
      placeholder="Buscar cliente"
    />
  </div>

  <main class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Facturado</div>
        <div class="stat-value">
          {{ meta.sumTotal?.toLocaleString('en', CURRENCY_OPTIONS) }}
        </div>
      </div>
    </div>
  </main>

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
      <tr v-if="processing">
        <td colspan="7" class="text-center">
          <span class="loading-table-data"> </span>
        </td>
      </tr>
      <tr v-else-if="!billing.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-else v-for="(item, index) in billing" :key="index" class="hover:bg-gray-50">
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
          <RouterLink :to="{ name: 'billing.show', params: { id: item.id } }">
            <IconEye size="25" />
          </RouterLink>
        </td>
      </tr>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useBilling from '@/composables/useBilling'
import { onMounted, ref, watch } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import { format, monthStart, dayEnd, dayStart } from '@formkit/tempo'
import { IconEye } from '@tabler/icons-vue'
import { watchDebounced } from '@vueuse/core'
import useAccount from '@/composables/useAccount'
import ThePaginate from '@/components/ThePaginate.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import { CURRENCY_OPTIONS } from '@/defaults'

const { getBilling, billing, queryParams, meta, processing } = useBilling()
const { accounts, getAccounts } = useAccount()

const START_OF_MONTH = monthStart(new Date())
const from = ref(format(START_OF_MONTH, 'YYYY-MM-DD'))
const to = ref('')

onMounted(() => {
  processing.value = true
  queryParams.value.from = dayStart(START_OF_MONTH)

  getAccounts()
})

watchDebounced(
  queryParams.value,
  () => {
    meta.value.page = 1
    getBilling()
  },
  { debounce: 500, maxWait: 1000 }
)

watch(
  () => [from.value, to.value],
  ([from, to]) => {
    if (from) {
      queryParams.value.from = dayStart(from).toISOString()
    } else {
      queryParams.value.from = ''
    }

    if (to) {
      queryParams.value.to = dayEnd(to).toISOString()
    } else {
      queryParams.value.to = ''
    }
  }
)

watch(
  () => meta.value.page,
  () => {
    getBilling()
  }
)
</script>
