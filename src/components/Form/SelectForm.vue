<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">
        {{ text }}
      </span>
    </div>

    <select class="select select-bordered" v-model="model" :required="required">
      <slot></slot>
    </select>

    <div v-if="errors && errors[name]" class="label">
      <span class="label-text-alt text-red-400">
        {{ errors[name] }}
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
import type { IInputForm } from '@/types'
defineProps<IInputForm>()
const model = defineModel()
</script>
