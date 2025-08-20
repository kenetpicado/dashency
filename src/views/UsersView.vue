<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted } from 'vue'
import useUser from '@/composables/useUser'
import { IconEdit } from '@tabler/icons-vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IUser } from '@/types'
import { useTimeAgo } from '@vueuse/core'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'

const { updateUser, processing, form, openModal, getUsers, users } = useUser()

const roles = ['ADMINISTRADOR', 'CAJERO']
const status = ['REGISTRADO', 'ACTIVO', 'INACTIVO']

onMounted(async () => {
  await getUsers()
})

function editUser(item: IUser) {
  form.value.id = item._id
  form.value.role = item.role
  form.value.status = item.status
  openModal.value = true
}
</script>

<template>
  <DialogForm title="Editar" :isOpen="openModal">
    <Form @submit="updateUser" class="flex flex-col gap-4">
      <FieldForm as="select" text="Rol" name="rol" v-model="form.role" rules="required">
        <option value="">Seleccionar rol</option>
        <option v-for="item in roles" :value="item" :key="item">
          {{ item }}
        </option>
      </FieldForm>
      <FieldForm as="select" text="Estado" name="estado" v-model="form.status" rules="required">
        <option value="">Seleccionar estado</option>
        <option v-for="item in status" :value="item" :key="item">
          {{ item }}
        </option>
      </FieldForm>
      <div class="modal-action">
        <BtnSecondary type="reset" id="resetUser" @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </Form>
  </DialogForm>

  <header class="flex items-center justify-between mb-6">
    <span class="font-bold text-2xl">Usuarios</span>
  </header>

  <TheTable>
    <template #header>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Rol</th>
      <th>Estado</th>
      <th>Última actividad</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="7">
          <span class="loading loading-spinner mx-auto flex items-center"> </span>
        </td>
      </tr>
      <tr v-else-if="!users.length">
        <td colspan="7" class="text-center">No hay usuarios registrados</td>
      </tr>
      <tr v-else v-for="(item, index) in users" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.email }}
        </td>
        <td>
          {{ item.role }}
        </td>
        <td>
          {{ item.status }}
        </td>
        <td>
          <span v-if="item.lastActivity">
            {{ useTimeAgo(item.lastActivity) }}
          </span>
        </td>
        <td>
          <button type="button" @click="editUser(item)">
            <IconEdit size="25" />
          </button>
        </td>
      </tr>
    </template>
  </TheTable>
</template>
