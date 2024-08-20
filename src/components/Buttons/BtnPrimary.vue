<script setup lang="ts">
import type { IButton } from '@/types'
import LoadingAnimation from './LoadingAnimation.vue'

defineProps<IButton>()
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled || loading"
    :class="[disabled || loading ? 'opacity-55 cursor-not-allowed' : '']"
    class="border border-blue-500 h-12 inline-flex items-center justify-center min-w-28 bg-blue-500 rounded-lg text-white hover:bg-blue-600 outline-none transition duration-300 ease-in-out"
  >
    <LoadingAnimation v-if="loading" />
    <slot />
  </button>
</template>
