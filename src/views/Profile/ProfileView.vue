<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div>
      <Form
        @submit="updateProfile"
        v-if="auth"
        class="flex flex-col gap-4 bg-white p-5 rounded-xl border"
      >
        <h2 class="font-bold">Datos personales</h2>

        <div class="mb-4 flex flex-col gap-4">
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
    </div>

    <div v-if="auth?.role && ['ADMINISTRADOR', 'ROOT'].includes(auth.role)">
      <div class="bg-white p-5 rounded-lg border flex flex-col">
        <div
          v-if="authRoute && !credential && !processingCredential && !processingGoogle"
          class="flex-1 text-center flex flex-col items-center justify-center my-4"
        >
          <img src="/gmail.png" alt="Gmail logo" class="mx-auto h-10 mb-4" />
          <div class="mb-6">No estas conectado a tu cuenta de Gmail</div>
          <a :href="authRoute" class="btn btn-neutral"> Haz click aquí para conectar </a>
        </div>

        <template v-else-if="credential">
          <div class="flex items-start gap-4 mb-6">
            <div class="avatar online">
              <div class="w-16 rounded-full">
                <img
                  :src="credential.picture"
                  alt="Profile picture"
                  onerror="this.src='https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671159.jpg'"
                />
              </div>
            </div>
            <div class="truncate">
              <h1 class="font-bold mb-1 text-lg uppercase tracking-wide truncate">
                {{ credential.email }}
              </h1>
              <div class="text-gray-400 truncate">Rte.: {{ credential.from_email }}</div>
            </div>
          </div>

          <div class="text-gray-400">
            <ul class="list-disc list-inside space-y-2">
              <li>Conectado desde el {{ format(credential.createdAt) }}</li>
              <li>Ultima actualización del token: {{ format(credential.updatedAt) }}</li>
            </ul>
          </div>

          <div class="flex justify-end mt-8">
            <button
              type="button"
              @click="confirmDestroyCredential"
              :loading="processingCredential"
              class="btn btn-neutral"
            >
              Desconectar
            </button>
          </div>
        </template>

        <SkeletonGmail v-else />
      </div>
    </div>

    <UpdatePasswordForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'
import useProfile from '@/composables/useProfile'
import UpdatePasswordForm from '@/components/UpdatePasswordForm.vue'
import { format } from '@formkit/tempo'
import useGoogle from '@/composables/useGoogle'
import useCredential from '@/composables/useCredential'
import SkeletonGmail from './Partials/SkeletonGmail.vue'

const { authRoute, getAuthRoute, processing: processingGoogle } = useGoogle()
const { getProfile, auth, processing, updateProfile, form } = useProfile()
const {
  credential,
  getCredential,
  destroyCredential,
  processing: processingCredential
} = useCredential()

onMounted(async () => {
  await getProfile()

  if (auth.value && ['ADMINISTRADOR', 'ROOT'].includes(auth.value.role)) {
    await getCredential()
    await getAuthRoute()
  }
})

function confirmDestroyCredential() {
  const result = confirm('Seguro que desea desconectar la cuenta?')
  if (result && credential.value) {
    destroyCredential(credential.value.id)
  }
}
</script>
