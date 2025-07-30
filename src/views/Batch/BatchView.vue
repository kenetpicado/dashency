<template>
  <DialogForm title="Editar" :isOpen="openModal" @onClose="openModal = false">
    <Form @submit="onSubmit" v-if="batch" class="flex flex-col gap-4">
      <FieldForm
        text="Total"
        name="total"
        v-model="batch.total"
        type="number"
        rules="required|numeric|min_value:1"
      />

      <FieldForm
        text="Código o referencia"
        name="referencia"
        v-model="batch.code"
        rules="required"
      />

      <FieldForm as="select" text="Tipo" name="tipo" v-model="batch.type" rules="required">
        <option value="">Selecciona un tipo</option>
        <option v-for="price in prices" :value="price.type" :key="price.id">
          {{ price.type }}
        </option>
      </FieldForm>

      <div class="modal-action">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </Form>
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
      <th>Creado</th>
      <th>Por</th>
      <th>Tipo</th>
      <th>Referencia</th>
      <th>Paquetes</th>
      <th>Monto</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="7">
          <span class="loading-table-data"> </span>
        </td>
      </tr>
      <tr v-else-if="!batches.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <template v-else>
        <tr v-for="(item, index) in batches" :key="index" class="hover:bg-gray-50">
          <td>
            <span v-if="item.createdAt">
              {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
            </span>
          </td>
          <td>
            {{ item.user?.name }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.code }}
          </td>
          <td>
            {{ item.packages.length }}
          </td>
          <td>$ {{ item.total.toLocaleString() }}</td>
          <td>
            <div class="flex gap-4 items-center">
              <RouterLink :to="{ name: 'batches.show', params: { id: item.id } }">
                <IconEye size="25" />
              </RouterLink>
              <button type="button" @click="edit(item)">
                <IconEdit size="25" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, ref, watch } from 'vue'
import useBatch from '@/composables/useBatch'
import { IconEdit, IconEye } from '@tabler/icons-vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IBatch } from '@/types'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { RouterLink } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import usePrice from '@/composables/usePrice'
import { format } from '@formkit/tempo'
import { Form } from 'vee-validate'
import FieldForm from '@/components/Form/FieldForm.vue'
import ThePaginate from '@/components/ThePaginate.vue'

const { getBatches, batches, processing, updateBatch, queryParams, meta } = useBatch()
const { prices, getPrices } = usePrice()

onMounted(async () => {
  await getBatches()
  await getPrices()
})

const batch = ref<IBatch>()
const openModal = ref(false)

function edit(item: IBatch) {
  batch.value = { ...item }
  openModal.value = true
}

function onSubmit() {
  if (!batch.value) return

  updateBatch(batch.value, () => {
    openModal.value = false
    batch.value = undefined
  })
}

watchDebounced(
  queryParams.value,
  () => {
    meta.value.page = 1
    getBatches()
  },
  { debounce: 500, maxWait: 1000 }
)

watch(() => meta.value.page, getBatches)
</script>
