<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, ref } from 'vue'
import useUser from '@/composables/useUser'
import { IconEdit, IconCircleX } from '@tabler/icons-vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import type { IUser } from '@/types'

const { getUsers, users } = useUser()
const openModal = ref(false)
const user = ref<IUser>()
const { updateUser, processing } = useUser()

const roles = ['USUARIO', 'ADMINISTRADOR']
const status = ['REGISTRADO', 'ACTIVO', 'INACTIVO']

onMounted(() => {
  getUsers()
})

function editUser(item: IUser) {
  user.value = { ...item }
  openModal.value = true
}

async function onSubmit(data: IUser) {
  await updateUser(data)
  openModal.value = false
  user.value = undefined
}
</script>

<template>
  <DialogForm title="Editar" :isOpen="openModal" @onClose="openModal = false">
    <template v-if="user">
      <SelectForm text="Rol" name="role" v-model="user.role">
        <option v-for="item in roles" :value="item" :key="item">
          {{ item }}
        </option>
      </SelectForm>
      <SelectForm text="Estado" name="status" v-model="user.status">
        <option v-for="item in status" :value="item" :key="item">
          {{ item }}
        </option>
      </SelectForm>
      <div class="flex justify-end gap-4">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit(user)" :loading="processing"
          >Guardar</BtnPrimary
        >
      </div>
    </template>
  </DialogForm>

  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Usuarios</span>
    <BtnPrimary> Nuevo </BtnPrimary>
  </header>

  <TheTable>
    <template #header>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Rol</th>
      <th>Estado</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-for="(item, index) in users" :key="index" class="hover:bg-gray-50">
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
          <button type="button" @click="editUser(item)">
            <IconEdit size="20" />
          </button>
        </td>
      </tr>
    </template>
  </TheTable>
</template>
