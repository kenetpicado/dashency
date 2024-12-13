<script setup lang="ts">
import type { IButton } from '@/types'
import LoadingAnimation from './LoadingAnimation.vue'

defineProps<IButton>()
</script>

<template>
  <button :type="type ?? 'button'" :disabled="disabled || loading" class="btn min-w-[7rem]">
    <LoadingAnimation v-if="loading" />
    <slot />
  </button>
</template>
