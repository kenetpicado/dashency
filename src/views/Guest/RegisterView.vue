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
  password: ''
}

const form = ref<IRegisterForm>({ ...defaultValues })
const showPassword = ref<boolean>(false)

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

  register(form.value, () => {
    form.value = defaultValues
    done.value = true
    title.value = '¡Su registro se ha realizado correctamente!'
  })
}

const logo = import.meta.env.VITE_APP_LOGO || ''
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-4">
    <img :src="logo" alt="" class="w-auto h-[2rem] mb-8 mx-auto" />
    <h1 class="text-base font-bold mb-2">
      {{ title }}
    </h1>
  </div>

  <div v-if="done" class="text-base">
    Para activar su cuenta, por favor, contacte a un administrador. Una vez aprobado, podrá iniciar
    sesión.
  </div>

  <form v-else @submit.prevent="onRegister">
    <div class="flex flex-col gap-4">
      <InputForm text="Nombre" name="name" v-model="form.name" autofocus />

      <InputForm text="Correo" name="email" v-model="form.email" required type="email" />

      <InputForm
        text="Contraseña"
        name="password"
        v-model="form.password"
        required
        :type="showPassword ? 'text' : 'password'"
      />

      <div class="form-control w-full">
        <label class="label cursor-pointer">
          <div class="flex gap-2 items-center">
            <input type="checkbox" v-model="showPassword" class="checkbox" />
            <span class="label-text">Mostrar contraseña</span>
          </div>
        </label>
      </div>
    </div>

    <div class="mt-10">
      <BtnPrimary type="submit" class="w-full" :loading="processing"> Crear cuenta </BtnPrimary>
    </div>
  </form>
  <div class="text-center my-5">
    ¿Ya tienes cuenta?
    <RouterLink :to="{ name: 'login' }" class="text-neutral"> Inicia sesión </RouterLink>
  </div>
</template>
