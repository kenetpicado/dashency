<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Form
      @submit="updateProfile"
      v-if="auth"
      class="flex flex-col gap-4 bg-white p-6 rounded-xl border"
    >
      <h1 class="font-bold text-lg">Datos personales</h1>

      <div class="flex-1 mb-8 flex flex-col gap-4">
        <FieldForm
          text="Nombre"
          name="nombre"
          v-model="form.name"
          placeholder="ej. Kenet Picado"
          rules="required"
        />

        <FieldForm
          text="Correo"
          name="correo"
          v-model="form.email"
          placeholder="ej. correo@gmail.com"
          rules="required|email"
        />
      </div>

      <div class="w-full flex justify-end">
        <BtnPrimary type="submit" :loading="processing">Actualizar</BtnPrimary>
      </div>
    </Form>

    <div class="bg-white p-6 rounded-xl border flex flex-col">
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
        <div class="mb-6">No estas conectado a ninguna cuenta de Gmail</div>
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
          <BtnSecondary
            type="button"
            @click="confirmDestroyCredential"
            :loading="processingCredential"
          >
            Desconectar
          </BtnSecondary>
        </div>
      </template>
    </div>

    <UpdatePasswordForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import useGoogle from '@/composables/useGoogle'
import useCredential from '@/composables/useCredential'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import useProfile from '@/composables/useProfile'
import UpdatePasswordForm from '@/components/UpdatePasswordForm.vue'

const { getProfile, auth, processing, updateProfile, form } = useProfile()
const { authRoute, getAuthRoute, processing: processingGoogle } = useGoogle()

const {
  credential,
  getCredential,
  destroyCredential,
  processing: processingCredential
} = useCredential()

onMounted(async () => {
  await getProfile()
  await getCredential()
  await getAuthRoute()
})

function confirmDestroyCredential() {
  if (confirm('Seguro que desea desconectar la cuenta?')) {
    destroyCredential()
  }
}
</script>
