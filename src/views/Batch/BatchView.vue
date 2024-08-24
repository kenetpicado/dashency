<template>
  <DialogForm title="Editar" :isOpen="openModal" @onClose="openModal = false">
    <template v-if="batch">
      <InputForm text="Total" name="total" v-model="batch.total" type="number" />
      <SelectForm text="Tipo de lote" name="type" v-model="batch.type">
        <option value="">Selecciona un tipo</option>
        <option value="AEREO">AEREO</option>
        <option value="MARITIMO">MARITIMO</option>
      </SelectForm>
      <div class="flex justify-end gap-4">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </template>
  </DialogForm>

  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Lotes</span>
    <RouterLink :to="{ name: 'batches.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </header>

  <TheTable>
    <template #header>
      <th>Fecha</th>
      <th>Tipo</th>
      <th>Creado por</th>
      <th>Total</th>
      <th>Cantidad de items</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!batches?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in batches" :key="index" class="hover:bg-gray-50">
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.user?.name }}
        </td>
        <td>
          <span class="bg-red-50 text-red-600 px-3 py-1 rounded-lg">${{ item.total }}</span>
        </td>
        <td>{{ item.packages.length }}</td>
        <td>
          <button type="button" @click="edit(item)">
            <IconEdit size="20" />
          </button>
        </td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, ref } from 'vue'
import useBatch from '@/composables/useBatch'
import { IconEdit } from '@tabler/icons-vue'
import getFormattedDate from '@/utils/date'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IBatch } from '@/types'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'

const { getBatches, batches, processing, updateBatch } = useBatch()

onMounted(() => getBatches())

const batch = ref<IBatch | null>(null)
const openModal = ref(false)

function edit(item: IBatch) {
  batch.value = item
  openModal.value = true
}

function onSubmit() {
  if (!batch.value) return
  updateBatch(batch.value, () => {
    openModal.value = false
    batch.value = null
  })
}

</script>
