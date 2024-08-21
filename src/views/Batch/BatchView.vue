<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Lotes</span>
    <RouterLink :to="{ name: 'batches.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
</script>
