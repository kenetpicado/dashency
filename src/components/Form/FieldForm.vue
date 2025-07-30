<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

defineProps<{
  text?: string
  name: string
  type?: string
  placeholder?: string
  autofocus?: boolean
  rules?: string
  as?: string
}>()

const model = defineModel()
</script>

<template>
  <div class="form-control w-full">
    <div v-if="text" class="label">
      <span class="label-text">
        {{ text }}
      </span>
    </div>

    <Field
      :id="name"
      :as="as || 'input'"
      :type="type"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :name="name"
      :rules="rules"
      class="input input-bordered w-full"
      v-model="model"
    >
      <slot />
    </Field>

    <ErrorMessage :name="name" class="text-sm text-red-600 mt-2" />
  </div>
</template>
