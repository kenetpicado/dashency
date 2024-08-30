<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Facturación</span>
    <RouterLink :to="{ name: 'billing.create' }">
      <BtnPrimary> Nueva </BtnPrimary>
    </RouterLink>
  </header>

  Lista de facturacion
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
</script>
