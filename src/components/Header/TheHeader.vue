<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { auth } = storeToRefs(useAuthStore())
</script>

<template>
  <header class="bg-white border-b">
    <div class="w-full mx-auto h-20 py-4 px-6 flex justify-between items-center">
      <section></section>
      <section v-if="auth" class="text-right">
        <div>{{ auth.name }}</div>
        <div class="text-sm text-gray-400">
          {{ auth.role }}
        </div>
      </section>
    </div>
  </header>
</template>
