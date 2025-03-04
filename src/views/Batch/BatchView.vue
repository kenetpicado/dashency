<template>
  <DialogForm title="Editar" :isOpen="openModal" @onClose="openModal = false">
    <div v-if="batch" class="flex flex-col gap-4">
      <InputForm text="Total" name="total" v-model="batch.total" type="number" />
      <InputForm text="Código o referencia" name="code" v-model="batch.code" />
      <SelectForm text="Tipo" name="type" v-model="batch.type">
        <option value="">Selecciona un tipo</option>
        <option v-for="price in prices" :value="price.type" :key="price.id">
          {{ price.type }}
        </option>
      </SelectForm>
      <div class="modal-action">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </div>
  </DialogForm>

  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Lotes</span>
    <RouterLink :to="{ name: 'batches.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <InputForm
      text="Código o referencia"
      name="code"
      v-model="queryParams.code"
      type="search"
      placeholder="Buscar código o referencia"
    />
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Selecciona un tipo</option>
      <option v-for="price in prices" :value="price.type" :key="price.id">{{ price.type }}</option>
    </SelectForm>
  </div>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Tipo</th>
      <th>Referencia</th>
      <th>Paquetes</th>
      <th>Monto</th>
      <th>Fecha</th>
      <th></th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="7">
          <span class="loading loading-spinner mx-auto flex items-center"> </span>
        </td>
      </tr>
      <tr v-else-if="!batches.data.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <template v-else>
        <tr v-for="(item, index) in batches.data" :key="index" class="hover:bg-gray-50">
          <td>
            {{ item.user?.name }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td class="text-gray-500">
            {{ item.code }}
          </td>
          <td>{{ item.packages.length }}</td>
          <td>${{ item.total.toLocaleString() }}</td>
          <td class="text-gray-500">
            {{ getFormattedDate(item.createdAt) }}
          </td>
          <td>
            <div class="flex gap-4 justify-end">
              <RouterLink :to="{ name: 'batches.show', params: { id: item.id } }">
                <IconEye size="20" />
              </RouterLink>
              <button type="button" @click="edit(item)">
                <IconEdit size="20" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </template>
  </TheTable>
  <PaginationComponent :pages="batches.pages" :page="batches.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, ref } from 'vue'
import useBatch from '@/composables/useBatch'
import { IconEdit, IconEye } from '@tabler/icons-vue'
import getFormattedDate from '@/utils/date'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IBatch } from '@/types'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { RouterLink } from 'vue-router'
import toast from '@/utils/toast'
import { watchDebounced } from '@vueuse/core'
import PaginationComponent from '@/components/PaginationComponent.vue'
import usePrice from '@/composables/usePrice'

const { getBatches, batches, processing, updateBatch, queryParams } = useBatch()
const { prices, getPrices } = usePrice()

onMounted(async () => {
  await getBatches()
  getPrices()
})

const batch = ref<IBatch | null>(null)
const openModal = ref(false)

function edit(item: IBatch) {
  batch.value = { ...item }
  openModal.value = true
}

function onSubmit() {
  if (!batch.value) return

  if (!batch.value.type || !batch.value.code || !batch.value.total) {
    return toast.error('Todos los campos son requeridos')
  }

  updateBatch(batch.value, () => {
    openModal.value = false
    batch.value = null
  })
}

watchDebounced(queryParams.value, () => getBatches(), { debounce: 500, maxWait: 1000 })

function getThisPage(selected: number) {
  queryParams.value.page = selected * 1
}
</script>
