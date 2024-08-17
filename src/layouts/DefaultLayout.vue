<script setup lang="ts">
import TheSidebar from '@/components/Sidebar/TheSidebar.vue'
import TheHeader from '@/components/Header/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex w-full">
    <TheSidebar />

    <div class="bg-gray-50 w-full">
      <TheHeader />
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
