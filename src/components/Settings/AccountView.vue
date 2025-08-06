<script setup lang="ts">
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { IconEdit, IconTrash } from '@tabler/icons-vue'
import useAccount from '@/composables/useAccount'
import { onMounted } from 'vue'
import type { IAccount } from '@/types'
import TheTable from '@/components/Table/TheTable.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'

const {
  getAccounts,
  accounts,
  storeAccount,
  processing,
  updateAccount,
  form,
  reset,
  openModal,
  destroyAccount
} = useAccount()

onMounted(async () => {
  await getAccounts()
})

const onCancel = () => {
  openModal.value = false
  reset()
}

function onSubmit() {
  if (form.value.id) {
    updateAccount(form.value.id)
  } else {
    storeAccount()
  }
}

function edit(item: IAccount) {
  form.value = { ...item }
  openModal.value = true
}

function confirmDelete(id: string) {
  if (confirm('¿Estás seguro de eliminar esta cuenta?')) {
    destroyAccount(id)
  }
}
</script>

<template>
  <div>
    <header class="flex items-center justify-between mb-6">
      <span class="font-bold text-2xl">Cuentas</span>
      <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
    </header>

    <DialogForm title="Cuenta" :isOpen="openModal">
      <Form @submit="onSubmit" class="flex flex-col gap-4">
        <FieldForm
          text="Tipo"
          name="tipo"
          v-model="form.type"
          rules="required"
          placeholder="ej. BANPRO"
        />

        <FieldForm
          text="Cuenta"
          name="number"
          v-model="form.number"
          rules="required"
          placeholder="ej. 1234567890"
        />

        <FieldForm
          text="Propietario"
          name="holder"
          v-model="form.holder"
          rules="required"
          placeholder="ej. Kenet Picado"
        />

        <FieldForm
          as="select"
          v-if="form.id"
          text="Estado"
          name="estado"
          v-model="form.status"
          rules="required"
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </FieldForm>

        <div class="modal-action">
          <BtnSecondary type="reset" @click="onCancel" id="resetAccount">Cancelar</BtnSecondary>
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
        <th>No.</th>
        <th>Propietario</th>
        <th>Estado</th>
        <th>Acciones</th>
      </template>
      <template #body>
        <tr v-if="processing">
          <td colspan="4" class="text-center">
            <span class="loading-table-data"> </span>
          </td>
        </tr>
        <tr v-else-if="!accounts.length">
          <td colspan="4" class="text-center">No hay paquetes</td>
        </tr>
        <tr v-else v-for="(item, index) in accounts" :key="index" class="hover:bg-gray-50">
          <td>{{ index + 1 }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.holder }}</td>
          <td>
            {{ item.status }}
          </td>
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
