<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import { reactive } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'
import useUser from '@/composables/useUser'

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errorStore = useErrorStore()
const { error } = storeToRefs(useErrorStore())
const { register } = useUser()

function onRegister(): void {
  errorStore.clearErrorState()

  if (form.password.length < 8) {
    errorStore.setErrorState({
      name: 'password',
      value: 'La contraseña debe tener al menos 8 caracteres'
    })
    return
  }

  if (!/\d/.test(form.password)) {
    errorStore.setErrorState({
      name: 'password',
      value: 'La contraseña debe tener al menos 1 número'
    })
    return
  }

  if (!/[A-Z]/.test(form.password)) {
    errorStore.setErrorState({
      name: 'password',
      value: 'La contraseña debe tener al menos 1 letra mayúscula'
    })
    return
  }

  if (form.password !== form.password_confirmation) {
    errorStore.setErrorState({
      name: 'password_confirmation',
      value: 'Las contraseñas no coinciden'
    })
    return
  }

  register()
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <h1 class="text-xl font-bold mb-2">Registrarme</h1>
    <div class="text-gray-400">Crear nueva cuenta</div>
  </div>

  <form @submit.prevent="onRegister">
    <InputForm text="Nombre" name="name" v-model="form.name" autofocus required :error="error" />

    <InputForm
      text="Correo"
      name="email"
      v-model="form.email"
      required
      type="email"
      :error="error"
    />

    <InputForm
      text="Contraseña"
      name="password"
      v-model="form.password"
      required
      type="password"
      :error="error"
    />

    <InputForm
      text="Confirmar contraseña"
      name="password_confirmation"
      v-model="form.password_confirmation"
      required
      type="password"
      :error="error"
    />

    <div class="mt-10">
      <BtnPrimary type="submit" class="w-full" :loading="false"> Crear cuenta </BtnPrimary>
    </div>
    <div class="text-center mt-5">
      ¿Ya tienes cuenta?
      <RouterLink :to="{ name: 'login' }" class="text-blue-600"> Inicia sesión </RouterLink>
    </div>
  </form>
</template>
