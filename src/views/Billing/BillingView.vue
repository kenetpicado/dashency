<template>
  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Facturación</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <SelectForm text="Banco" name="bank" v-model="queryParams.account">
      <option value="">Todos</option>
      <option v-for="item in accounts" :value="item.id" :key="item.id">
        {{ item.type }} - {{ item.number }}
      </option>
    </SelectForm>
    <InputForm
      text="Código o referencia"
      name="reference"
      v-model="queryParams.reference"
      type="search"
      placeholder="Buscar código o referencia"
    />
    <InputForm
      text="Cliente"
      name="client"
      v-model="queryParams.client"
      type="search"
      placeholder="Buscar cliente"
    />
  </div>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Referencia</th>
      <th>Cliente</th>
      <th>Total</th>
      <th>Fecha</th>
      <th></th>
    </template>
    <template #body>
      <tr v-if="!billing.data.length">
        <td colspan="6" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in billing.data" :key="index" class="hover:bg-gray-50">
        <td>
          <UserInfo v-if="item.user && typeof item.user !== 'string'" :item="item.user" />
        </td>
        <td>
          <span v-if="item.account && typeof item.account !== 'string'">
            {{ item.account.type }}: {{ item.account.number }}
          </span>
          <div class="text-gray-400 text-sm">
            {{ item.reference }}
          </div>
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>${{ item.total }}</td>
        <td class="text-gray-500">
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          <div class="flex gap-4 justify-end">
            <RouterLink :to="{ name: 'billing.show', params: { id: item.id } }">
              <IconEye size="20" />
            </RouterLink>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>
  <PaginationComponent :pages="billing.pages" :page="billing.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useBilling from '@/composables/useBilling'
import { onMounted } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import getFormattedDate from '@/utils/date'
import { IconEye } from '@tabler/icons-vue'
import UserInfo from '@/components/UserInfo.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { watchDebounced } from '@vueuse/core'
import SelectForm from '@/components/Form/SelectForm.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import useAccount from '@/composables/useAccount'

const { getBilling, billing, queryParams } = useBilling()
const { accounts, getAccounts } = useAccount()

onMounted(() => {
  getBilling()
  getAccounts()
})

watchDebounced(queryParams.value, () => getBilling(), { debounce: 500, maxWait: 1000 })

function getThisPage(selected: number) {
  queryParams.value.page = selected * 1
}
</script>
