<script setup lang="ts">
import TheSidebar from '@/components/Sidebar/TheSidebar.vue'
import TheHeader from '@/components/Header/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="sidebar" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content bg-gray-50 w-full min-h-screen">
      <TheHeader />
      <main class="p-5">
        <RouterView />
      </main>
    </div>

    <div class="drawer-side z-40">
      <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
      <TheSidebar />
    </div>
  </div>
</template>
