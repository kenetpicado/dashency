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
    class="border border-edo-950 h-12 inline-flex gap-2 px-2 items-center justify-center min-w-28 bg-white rounded-xl text-edo-950 hover:bg-edo-50 outline-none transition duration-300 ease-in-out"
  >
    <LoadingAnimation v-if="loading" />
    <slot />
  </button>
</template>
