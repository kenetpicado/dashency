<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, ref } from 'vue'
import useUser from '@/composables/useUser'
import { IconEdit } from '@tabler/icons-vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import type { IUser } from '@/types'
import getFormattedDate from '@/utils/date'
import UserInfo from '@/components/UserInfo.vue'
import { useTimeAgo } from '@vueuse/core'

const { getUsers, users } = useUser()
const openModal = ref(false)
const user = ref<IUser>()
const { updateUser, processing } = useUser()

const roles = ['ADMINISTRADOR', 'CAJERO']
const status = ['REGISTRADO', 'ACTIVO', 'INACTIVO']

onMounted(async () => {
  await getUsers()
})

function editUser(item: IUser) {
  user.value = { ...item }
  openModal.value = true
}

function onSubmit() {
  if (user.value)
    updateUser(user.value, () => {
      openModal.value = false
      user.value = undefined
    })
}
</script>

<template>
  <DialogForm title="Editar" :isOpen="openModal">
    <form v-if="user" @submit.prevent="onSubmit()" class="flex flex-col gap-4">
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
      <div class="modal-action">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Usuarios</span>
  </header>

  <TheTable>
    <template #header>
      <th>Nombre</th>
      <th>Rol</th>
      <th>Estado</th>
      <th>Registrado</th>
      <th>Última actividad</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="6">
          <span class="loading loading-spinner mx-auto flex items-center"> </span>
        </td>
      </tr>
      <tr v-for="(item, index) in users" :key="index" class="hover:bg-gray-50">
        <td>
          <UserInfo :item="item" />
        </td>
        <td>
          {{ item.role }}
        </td>
        <td>
          {{ item.status }}
        </td>
        <td>
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          <span v-if="item.lastActivity">
            {{ useTimeAgo(item.lastActivity) }}
          </span>
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
