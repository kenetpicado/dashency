<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Facturación</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  <div class="grid grid-cols-4 gap-4 mb-4">
    <InputForm text="Fecha" name="date" v-model="queryParams.date" type="date" />
    <SelectForm text="Banco" name="bank" v-model="queryParams.bank">
      <option value="">Todos</option>
      <option v-for="item in banks" :value="item" :key="item">
        {{ item }}
      </option>
    </SelectForm>
    <InputForm text="Código o referencia" name="reference" v-model="queryParams.reference" type="search"
      placeholder="Buscar código o referencia" />
    <InputForm text="Cliente" name="client" v-model="queryParams.client" type="search" placeholder="Buscar cliente" />
  </div>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Fecha</th>
      <th>Referencia</th>
      <th>Cliente</th>
      <th>Total</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!billing?.length">
        <td colspan="5" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in billing" :key="index" class="hover:bg-gray-50">
        <td>
          <UserInfo v-if="item.user" :item="item.user" />
        </td>
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>{{ item.bank }}: {{ item.reference }}</td>
        <td>
          {{ item.client }}
        </td>
        <td>
          ${{ item.paid }}
        </td>
        <td>
          <div class="flex gap-4">
            <RouterLink :to="{ name: 'billing.show', params: { id: item.id } }">
              <IconEye size="20" />
            </RouterLink>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>
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
import banks from '@/utils/banks'
import SelectForm from '@/components/Form/SelectForm.vue'

const { getBilling, billing, queryParams } = useBilling()

onMounted(() => {
  getBilling()
})

watchDebounced(queryParams.value, () => getBilling(), { debounce: 500, maxWait: 1000 })
</script>
