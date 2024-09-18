<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import { ref } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useAuth from '@/composables/useAuth.js'
import type { ILoginForm } from '@/types'

const { login, processing } = useAuth()

const form = ref<ILoginForm>({
  email: '',
  password: ''
})
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <h1 class="text-xl font-bold">Inicia sesión</h1>
  </div>

  <form @submit.prevent="login(form)">
    <InputForm text="Correo" name="email" v-model="form.email" autofocus required type="email" autocomplete="on" />
    <InputForm text="Contraseña" name="password" v-model="form.password" required type="password" />

    <div class="mt-10">
      <BtnPrimary type="submit" class="w-full" :loading="processing"> Ingresar </BtnPrimary>
    </div>
    <div class="text-center mt-5">
      ¿No tienes cuenta?
      <RouterLink :to="{ name: 'register' }" class="text-edo-950"> Registrarme </RouterLink>
    </div>
  </form>
</template>
