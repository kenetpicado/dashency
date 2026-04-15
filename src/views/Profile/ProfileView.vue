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

const { getProfile, auth, processing, updateProfile, form } = useProfile()

onMounted(async () => {
  await getProfile()
})
</script>
