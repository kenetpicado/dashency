<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div v-if="auth" class="flex flex-col bg-white p-6 rounded-xl border">
      <h4 class="mb-6 text-xl font-bold">Datos personales</h4>
      <div class="flex-1 mb-8 flex flex-col gap-4">
        <InputForm text="Nombre" name="name" v-model="profile.name" placeholder="Nombre completo" />
        <InputForm
          text="Correo"
          name="email"
          v-model="profile.email"
          placeholder="Correo electrónico"
        />
      </div>
      <div class="w-full flex justify-end">
        <BtnPrimary @click="onSubmit" :loading="processing">Guardar</BtnPrimary>
      </div>
    </div>

    <form
      @submit.prevent="updateFromEmail"
      v-if="auth?.role && ['ADMINISTRADOR', 'ROOT'].includes(auth.role)"
      class="bg-white p-6 rounded-xl border flex flex-col"
    >
      <span
        v-if="processingCredential || processingGoogle"
        class="flex-1 loading loading-spinner text-gray-300 mx-auto flex items-center"
      >
      </span>

      <div
        v-else-if="authRoute && !credential"
        class="flex-1 text-center flex flex-col items-center justify-center"
      >
        <img src="/gmail.png" alt="Gmail logo" class="mx-auto h-10 mb-4" />
        <div class="mb-6">No estas conectado a tu cuenta de Gmail</div>
        <a :href="authRoute" class="btn btn-neutral"> Haz click aquí para conectar </a>
      </div>

      <template v-else-if="credential">
        <div class="flex-1 mb-8">
          <div class="flex-1 flex flex-col items-center mb-6 justify-center h-full">
            <img
              :src="credential.picture"
              alt="Profile picture"
              onerror="this.src='https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'"
              class="h-20 w-20 rounded-full mb-4"
            />
            <div class="mb-4">
              Conectado a: <span class="font-bold">{{ credential.email }}</span>
            </div>
            <div class="text-gray-400">Remitente: {{ credential.from_email }}</div>
          </div>
        </div>

        <div class="w-full flex justify-end gap-4">
          <button type="button" @click="confirmDestroyCredential" :loading="processing" class="btn">
            Desconectar
          </button>
        </div>
      </template>
    </form>

    <form
      v-if="false"
      @submit.prevent="onSubmitPassword"
      class="bg-white p-6 rounded-xl border flex flex-col"
    >
      <div class="flex-1">
        <h4 class="mb-6 text-xl font-bold">Actualizar contraseña</h4>
        <InputForm
          text="Contraseña"
          name="current_password"
          v-model="formPasword.current_password"
          placeholder="Ingrese su contraseña actual"
          :type="showPassword ? 'text' : 'password'"
          required
        />
        <InputForm
          text="Nueva contraseña"
          name="password"
          v-model="formPasword.password"
          placeholder="Ingrese la nueva contraseña"
          :type="showPassword ? 'text' : 'password'"
          required
        />
        <InputForm
          text="Confirmar contraseña"
          name="password"
          v-model="formPasword.password_confirmation"
          placeholder="Confirmar la nueva contraseña"
          :type="showPassword ? 'text' : 'password'"
          required
        />
        <div class="w-full mb-4">
          <label class="flex items-center mb-1 text-gray-500 gap-3">
            <input
              type="checkbox"
              name="showPassword"
              class="h-5 w-5 border-gray-300 rounded-md block transition duration-300 ease-in-out"
              v-model="showPassword"
            />
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
import { onMounted, ref } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useAuth from '@/composables/useAuth'
import toast from '@/utils/toast'
import useGoogle from '@/composables/useGoogle'
import useCredential from '@/composables/useCredential'

const { getProfile, auth, processing, updateProfile, updatePassword } = useAuth()
const { authRoute, getAuthRoute, processing: processingGoogle } = useGoogle()
const {
  credential,
  getCredential,
  updateCredential,
  destroyCredential,
  processing: processingCredential
} = useCredential()

onMounted(async () => {
  await getProfile()

  if (auth.value) {
    profile.value.name = auth.value.name
    profile.value.email = auth.value.email
  }

  if (auth.value && ['ADMINISTRADOR', 'ROOT'].includes(auth.value.role)) {
    getAuthRoute()
    await getCredential()
    formCredential.value.from_email = credential.value?.from_email || ''
  }
})

const profile = ref({
  name: '',
  email: ''
})

const formCredential = ref({
  from_email: ''
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

function updateFromEmail() {
  if (credential.value) updateCredential(credential.value.id, formCredential.value)
}

function confirmDestroyCredential() {
  const result = confirm('Seguro que desea desconectar la cuenta?')
  if (result && credential.value) {
    destroyCredential(credential.value.id)
  }
}
</script>
