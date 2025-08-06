<script setup lang="ts">
import usePrice from '@/composables/usePrice'
import { onMounted, ref } from 'vue'
import toast from '@/utils/toast'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { IconEdit, IconTrash } from '@tabler/icons-vue'
import type { IPrice } from '@/types'
import { Form } from 'vee-validate'
import FieldForm from '@/components/Form/FieldForm.vue'

const {
  getPrices,
  prices,
  storePrice,
  processing,
  updatePrice,
  form,
  destroyPrice,
  reset,
  openModal
} = usePrice()

onMounted(async () => {
  await getPrices()
})

function onSubmit() {
  const exist = prices.value.find((price) => price.type === form.value.type)

  if (exist && exist.id !== form.value.id) {
    toast.error('Ya existe un precio con este tipo')
    return
  }

  if (form.value.id) {
    updatePrice(form.value.id)
  } else {
    storePrice()
  }
}

function resetValues() {
  openModal.value = false
  reset()
}

function edit(item: IPrice) {
  form.value = { ...item }
  openModal.value = true
}

function confirmDelete(id: string) {
  if (confirm('¿Estás seguro de eliminar este precio?')) {
    destroyPrice(id)
  }
}
</script>

<template>
  <div class="mb-6">
    <header class="flex items-center justify-between mb-6">
      <span class="font-bold text-2xl">Precios</span>
      <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
    </header>

    <DialogForm title="Precio" :isOpen="openModal">
      <Form @submit="onSubmit" class="flex flex-col gap-4">
        <FieldForm
          text="Tipo"
          name="tipo"
          v-model="form.type"
          rules="required"
          placeholder="ej. Aereo"
        />

        <FieldForm
          text="Monto $"
          name="valor"
          v-model="form.value"
          type="number"
          rules="required|min_value:0"
          placeholder="ej. 3"
        />

        <div class="modal-action">
          <BtnSecondary type="reset" @click="resetValues" id="resetPrice">Cancelar</BtnSecondary>
          <BtnPrimary type="submit" :loading="processing">
            {{ form.id ? 'Actualizar' : 'Guardar' }}
          </BtnPrimary>
        </div>
      </Form>
    </DialogForm>

    <TheTable>
      <template #header>
        <th>#</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Acciones</th>
      </template>
      <template #body>
        <tr v-if="processing">
          <td colspan="4" class="text-center">
            <span class="loading-table-data"> </span>
          </td>
        </tr>
        <tr v-else-if="!prices.length">
          <td colspan="4" class="text-center">No hay paquetes</td>
        </tr>
        <tr v-else v-for="(item, index) in prices" :key="index" class="hover:bg-gray-50">
          <td>{{ index + 1 }}</td>
          <td>{{ item.type }}</td>
          <td>${{ item.value }}</td>
          <td>
            <div class="flex items-center gap-4">
              <button type="button" @click="edit(item)">
                <IconEdit size="25" />
              </button>
              <button type="button" @click="confirmDelete(item.id)">
                <IconTrash size="25" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </TheTable>
  </div>
</template>
