<script setup lang="ts">
import { Form } from 'vee-validate'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import usePassword from '@/composables/usePassword'

const { updatePassword, form, processing } = usePassword()
</script>

<template>
  <div>
    <Form @submit="updatePassword" class="flex flex-col bg-white p-5 rounded-xl border gap-4">
      <h2 class="font-bold">Contraseña</h2>

      <div class="mb-4 flex flex-col gap-4">
        <FieldForm
          text="Contraseña actual"
          name="currentPassword"
          v-model="form.currentPassword"
          placeholder="********"
          rules="required"
          type="password"
        />

        <FieldForm
          text="Nueva contraseña"
          name="password"
          v-model="form.password"
          placeholder="********"
          rules="required|min:8|password"
          type="password"
        />

        <FieldForm
          text="Confirmar nueva contraseña"
          name="confirmPassword"
          v-model="form.confirmPassword"
          placeholder="********"
          rules="required|confirmed:@password"
          type="password"
        />
      </div>

      <div class="w-full flex justify-end">
        <button id="passwordForm" type="reset"></button>
        <BtnPrimary type="submit" :loading="processing">Actualizar</BtnPrimary>
      </div>
    </Form>
  </div>
</template>
