<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import { reactive, ref, onMounted } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'
import useAuth from '@/composables/useAuth'
import type { IRegisterForm } from '@/types'

const defaultValues = <IRegisterForm>{
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const form = ref<IRegisterForm>({...defaultValues})

const errorStore = useErrorStore()
const { error } = storeToRefs(useErrorStore())
const { register, processing } = useAuth()
const statusMessage = ref<string>("")
const title = ref<string>("Crear nueva cuenta")

async function onRegister(): void {
  errorStore.clearErrorState()

  if (form.value.password.length < 8) {
    errorStore.setErrorState({
      field: 'password',
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
    return
  }

  if (!/\d/.test(form.value.password)) {
    errorStore.setErrorState({
      field: 'password',
      message: 'La contraseña debe tener al menos 1 número'
    })
    return
  }

  if (!/[A-Z]/.test(form.value.password)) {
    errorStore.setErrorState({
      field: 'password',
      message: 'La contraseña debe tener al menos 1 letra mayúscula'
    })
    return
  }

  if (form.value.password !== form.value.password_confirmation) {
    errorStore.setErrorState({
      field: 'password_confirmation',
      message: 'Las contraseñas no coinciden'
    })
    return
  }

  const done = await register(form.value)

  if (done) {
    form.value = defaultValues
    title.value = "¡Su registro se ha realizado correctamente!"
    statusMessage.value = "Para activar su cuenta, por favor, contacte a un administrador. Una vez aprobado, podrá iniciar sesión."
  } else {
    statusMessage.value = ""
  }
}

onMounted(() => errorStore.clearErrorState())
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <h1 class="text-xl font-bold mb-2">
      {{ title }}
    </h1>
  </div>

  <div v-if="statusMessage" class="bg-blue-50 text-blue-600 p-4 rounded-lg text-base">
    {{ statusMessage }}
  </div>

  <form v-else @submit.prevent="onRegister">
    <InputForm
      text="Nombre"
      name="name"
      v-model="form.name"
      autofocus
      required
      :error="error"
    />

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
      <BtnPrimary type="submit" class="w-full" :loading="processing">
        Crear cuenta
      </BtnPrimary>
    </div>
  </form>
    <div class="text-center mt-5">
    ¿Ya tienes cuenta?
    <RouterLink :to="{ name: 'login' }" class="text-blue-600">
      Inicia sesión
    </RouterLink>
  </div>
</template>
