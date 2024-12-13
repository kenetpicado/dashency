<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Precios</span>
    <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
  </header>

  <DialogForm title="Precio" :isOpen="openModal">
    <form @submit.prevent="onSubmit()" class="flex flex-col gap-4">
      <InputForm text="Tipo" name="type" v-model="form.type" />
      <InputForm text="Precio" name="value" v-model="form.value" type="number" />
      <div class="modal-action">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing">
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <TheTable>
    <template #header>
      <th>#</th>
      <th>Tipo</th>
      <th>Valor</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!prices.length">
        <td colspan="4" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in prices" :key="index" class="hover:bg-gray-50">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>${{ item.value.toLocaleString() }}</td>
        <td>
          <div class="flex gap-4">
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
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import TheTable from '@/components/Table/TheTable.vue'
import usePrice from '@/composables/usePrice'
import type { IPrice } from '@/types'
import toast from '@/utils/toast'
import { IconEdit } from '@tabler/icons-vue'
import { onMounted, ref } from 'vue'

const { getPrices, prices, storePrice, processing, updatePrice } = usePrice()

const openModal = ref<boolean>(false)
const isEdit = ref<boolean>(false)

onMounted(() => {
  getPrices()
})

const form = ref<IPrice>({
  id: '',
  type: '',
  value: 0
})

const resetValues = () => {
  openModal.value = false
  isEdit.value = false

  form.value = {
    id: '',
    type: '',
    value: 0
  }
}

function onSubmit() {
  if (!form.value.type) {
    toast.error('El tipo es requerido')
    return
  }

  form.value.type = form.value.type.trim().toLocaleUpperCase()

  const exist = prices.value.find((price) => price.type === form.value.type)

  if (exist && exist.id !== form.value.id) {
    toast.error('Ya existe un precio con este tipo')
    return
  }

  if (form.value.value < 1) {
    toast.error('El precio debe ser mayor a 0')
    return
  }

  if (isEdit.value) {
    updatePrice(form.value, () => resetValues())
  } else {
    storePrice(form.value, () => resetValues())
  }
}

function edit(item: IPrice) {
  form.value = { ...item }
  isEdit.value = true
  openModal.value = true
}
</script>
