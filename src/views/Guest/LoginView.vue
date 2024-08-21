<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import { ref, onMounted } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useAuth from '@/composables/useAuth.js'
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'
import type { ILoginForm } from '@/types'

const { login, processing } = useAuth()
const { error } = storeToRefs(useErrorStore())

const form = ref<ILoginForm>({
  email: 'ke@gmail.com',
  password: 'kenetpicado'
})

onMounted(() => useErrorStore().clearErrorState())
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <h1 class="text-xl font-bold">Inicia sesión</h1>
  </div>

  <form @submit.prevent="login(form)">
    <InputForm
      text="Correo"
      name="email"
      v-model="form.email"
      autofocus
      required
      type="email"
      autocomplete="on"
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

    <div class="mt-10">
      <BtnPrimary type="submit" class="w-full" :loading="processing">
        Ingresar
      </BtnPrimary>
    </div>
    <div class="text-center mt-5">
      ¿No tienes cuenta?
      <RouterLink :to="{ name: 'register' }" class="text-blue-600">
        Registrarme
      </RouterLink>
    </div>
  </form>
</template>
