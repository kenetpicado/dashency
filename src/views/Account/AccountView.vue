<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Cuentas</span>
    <BtnPrimary @click="openModal = true"> Nueva </BtnPrimary>
  </header>

  <DialogForm title="Precio" :isOpen="openModal" @onClose="resetValues">
    <form @submit.prevent="onSubmit()">
      <InputForm text="Tipo (Banco)" name="type" v-model="form.type" />

      <InputForm text="Cuenta" name="number" v-model="form.number" />

      <InputForm text="Propietario" name="holder" v-model="form.holder" />

      <SelectForm v-if="form.id" text="Estado" name="status" v-model="form.status">
        <option value="ACTIVO">Activo</option>
        <option value="INACTIVO">Inactivo</option>
      </SelectForm>

      <div class="flex justify-end gap-4">
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
      <th>Cuenta</th>
      <th>Propietario</th>
      <th>Estado</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!accounts.length">
        <td colspan="5" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in accounts" :key="index" class="hover:bg-gray-50">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.number }}
        </td>
        <td>
          {{ item.holder }}
        </td>
        <td>
          <span class="bg-edo-50 px-2 py-1 rounded-lg">{{ item.status }}</span>
        </td>
        <td>
          <div class="flex gap-4">
            <button type="button" @click="edit(item)">
              <IconEdit size="20" />
            </button>
            <!-- <button v-if="item.id" type="button" @click="destroy(item.id)">
              <IconTrash size="20" />
            </button> -->
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
import SelectForm from '@/components/Form/SelectForm.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useAccount from '@/composables/useAccount'
import type { IAccount } from '@/types'
import toast from '@/utils/toast'
import { IconEdit, IconTrash } from '@tabler/icons-vue'
import { onMounted, ref } from 'vue'

const { getAccounts, accounts, storeAccount, processing, updateAccount, destroyAccount } = useAccount()

const openModal = ref<boolean>(false)
const isEdit = ref<boolean>(false)

onMounted(() => {
  getAccounts()
})

const form = ref<IAccount>({
  id: '',
  type: '',
  number: '',
  holder: '',
  status: ''
})

const resetValues = () => {
  openModal.value = false
  isEdit.value = false

  form.value = {
    id: '',
    type: '',
    number: '',
    holder: '',
    status: ''
  }
}

function onSubmit() {
  if (!form.value.type) {
    toast.error('El tipo es requerido')
    return
  }

  if (!form.value.number) {
    toast.error('La cuenta es requerida')
    return
  }

  if (!form.value.holder) {
    toast.error('El propietario es requerido')
    return
  }

  if (isEdit.value) {
    updateAccount(form.value, () => resetValues())
  } else {
    storeAccount(form.value, () => resetValues())
  }
}

function edit(item: IAccount) {
  form.value = { ...item }
  isEdit.value = true
  openModal.value = true
}

function destroy(id: string) {
  if (confirm('¿Estás seguro de eliminar esta cuenta?')) {
    destroyAccount(id)
  }
}
</script>
