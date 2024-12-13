<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 place-items-center w-full">
    <div class="w-full max-w-md bg-white rounded-lg px-6 py-0">
      <RouterView />
    </div>
  </div>
</template>
