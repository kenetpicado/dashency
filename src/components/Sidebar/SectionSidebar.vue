<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <span class="menu-title mt-2">
    {{ title }}
  </span>
</template>
