<template>
  <DialogForm title="Editar" :isOpen="openModal" @onClose="openModal = false">
    <template v-if="batch">
      <InputForm text="Total" name="total" v-model="batch.total" type="number" />
      <InputForm text="Código o referencia" name="code" v-model="batch.code" />
      <SelectForm text="Tipo" name="type" v-model="batch.type">
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

  <div class="grid grid-cols-4 gap-4 mb-4">
    <InputForm text="Código o referencia" name="code" v-model="queryParams.code" type="search" />
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Selecciona un tipo</option>
      <option value="AEREO">AEREO</option>
      <option value="MARITIMO">MARITIMO</option>
    </SelectForm>
  </div>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Fecha</th>
      <th>Tipo</th>
      <th>Código o referencia</th>
      <th>Paquetes</th>
      <th>Total</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!batches?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in batches" :key="index" class="hover:bg-gray-50">
        <td>
          <UserInfo v-if="item.user" :item="item.user" />
        </td>
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          {{ item.type == 'MARITIMO' ? '🚢' : '✈️' }}
        </td>
        <td>
          {{ item.code }}
        </td>
        <td>{{ item.packages.length }}</td>
        <td>
          ${{ item.total }}
        </td>
        <td>
          <div class="flex gap-4">
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
  </TheTable>
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
import UserInfo from '@/components/UserInfo.vue'
import toast from '@/utils/toast'
import { watchDebounced } from '@vueuse/core'

const { getBatches, batches, processing, updateBatch, queryParams } = useBatch()

onMounted(() => getBatches())

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

watchDebounced(queryParams.value, () => getBatches(), { debounce: 700, maxWait: 1000 })
</script>
