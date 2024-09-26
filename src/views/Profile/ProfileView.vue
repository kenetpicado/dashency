<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-if="auth" class="flex flex-col bg-white p-8 rounded-xl border">
      <div class="flex-1">
        <h4 class="mb-6 text-xl font-bold">Datos personales</h4>
        <div class="w-full mb-4 text-gray-400">
          Registrado el {{ getFormattedDate(auth.createdAt) }}
        </div>
        <InputForm text="Nombre" name="name" v-model="profile.name" placeholder="Nombre completo" />
        <InputForm text="Correo" name="email" v-model="profile.email" placeholder="Correo electrónico" />
      </div>
      <div class="w-full flex justify-end">
        <BtnPrimary @click="onSubmit" :loading="processing">Guardar</BtnPrimary>
      </div>
    </div>
    <form @submit.prevent="onSubmitPassword" class="bg-white p-8 rounded-xl border flex flex-col">
      <div class="flex-1">
        <h4 class="mb-6 text-xl font-bold">Actualizar contraseña</h4>
        <div v-if="auth" class="w-full mb-4 text-gray-400">
          Actualizada por última vez el {{ getFormattedDate(auth.passwordUpdatedAt) }}
        </div>
        <InputForm text="Contraseña" name="current_password" v-model="formPasword.current_password"
          placeholder="Ingrese su contraseña actual" :type="showPassword ? 'text' : 'password'" required />
        <InputForm text="Nueva contraseña" name="password" v-model="formPasword.password"
          placeholder="Ingrese la nueva contraseña" :type="showPassword ? 'text' : 'password'" required />
        <InputForm text="Confirmar contraseña" name="password" v-model="formPasword.password_confirmation"
          placeholder="Confirmar la nueva contraseña" :type="showPassword ? 'text' : 'password'" required />
        <div class="w-full mb-4">
          <label class="flex items-center mb-1 text-gray-500 gap-3">
            <input type="checkbox" name="showPassword"
              class="h-5 w-5 border-gray-300 rounded-md block transition duration-300 ease-in-out"
              v-model="showPassword" />
            Mostrar contraseña
          </label>
        </div>
      </div>
      <div class="w-full flex justify-end">
        <BtnPrimary type="submit" :loading="processing">Guardar</BtnPrimary>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useAuth from '@/composables/useAuth'
import getFormattedDate from '@/utils/date'
import toast from '@/utils/toast'

const { getProfile, auth, processing, updateProfile, updatePassword } = useAuth()

onMounted(() => getProfile())

const profile = ref({
  name: '',
  email: ''
})

const formPasword = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const showPassword = ref<boolean>(false)

function onSubmit() {
  updateProfile({ name: profile.value.name, email: profile.value.email })
}

function onSubmitPassword() {
  if (!formPasword.value.current_password) {
    toast.error('Ingrese su contraseña actual')
    return
  }

  if (formPasword.value.password.length < 8) {
    toast.error('La contraseña debe tener al menos 8 caracteres')
    return
  }

  if (!/[A-Z]/.test(formPasword.value.password)) {
    toast.error('La contraseña debe tener al menos una mayúscula')
    return
  }

  if (!/[0-9]/.test(formPasword.value.password)) {
    toast.error('La contraseña debe tener al menos un número')
    return
  }

  if (formPasword.value.password !== formPasword.value.password_confirmation) {
    toast.error('Las confirmacion de contraseña no coincide')
    return
  }

  updatePassword(formPasword.value)
}

watch(
  () => auth.value,
  (value) => {
    if (value) {
      profile.value.name = value.name
      profile.value.email = value.email
    }
  }
)
</script>
