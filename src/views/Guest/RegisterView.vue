<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import { ref } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useAuth from '@/composables/useAuth'
import type { IRegisterForm } from '@/types'
import toast from '@/utils/toast'

const defaultValues: IRegisterForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const form = ref<IRegisterForm>({ ...defaultValues })

const { register, processing } = useAuth()
const done = ref<boolean>(false)
const title = ref<string>('Crear nueva cuenta')

function onRegister() {
  if (form.value.password.length < 8) {
    toast.error('La contraseña debe tener al menos 8 caracteres')
    return
  }

  if (!/\d/.test(form.value.password)) {
    toast.error('La contraseña debe tener al menos 1 número')
    return
  }

  if (!/[A-Z]/.test(form.value.password)) {
    toast.error('La contraseña debe tener al menos 1 letra mayúscula')
    return
  }

  if (form.value.password !== form.value.password_confirmation) {
    toast.error('Las contraseñas no coinciden')
    return
  }

  register(form.value).then(() => {
    form.value = defaultValues
    done.value = true
    title.value = '¡Su registro se ha realizado correctamente!'
  })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <h1 class="text-xl font-bold mb-2">
      {{ title }}
    </h1>
  </div>

  <div v-if="done" class="text-base">
    Para activar su cuenta, por favor, contacte a un administrador. Una vez
    aprobado, podrá iniciar sesión.
  </div>

  <form v-else @submit.prevent="onRegister">
    <InputForm text="Nombre" name="name" v-model="form.name" autofocus />

    <InputForm
      text="Correo"
      name="email"
      v-model="form.email"
      required
      type="email"
    />

    <InputForm
      text="Contraseña"
      name="password"
      v-model="form.password"
      required
      type="password"
    />

    <InputForm
      text="Confirmar contraseña"
      name="password_confirmation"
      v-model="form.password_confirmation"
      required
      type="password"
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
