<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <span
    class="block text-xs text-gray-400 uppercase tracking-wider font-semibold mt-6 px-2"
  >
    {{ title }}
  </span>
</template>
