<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 place-items-center bg-gray-100 w-full p-4">
    <div class="w-full max-w-md bg-white rounded-lg py-10 px-6">
      <RouterView />
    </div>
  </div>
</template>
