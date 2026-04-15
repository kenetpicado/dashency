<template>
  <tr v-for="item in 6" :key="item" class="animate-pulse">
    <td v-for="i in columns" :key="i" class="py-5">
      <div class="skeleton h-3 w-16 bg-gray-100 rounded"></div>
    </td>
  </tr>
</template>

<script setup lang="ts">
interface Props {
  columns: number
}

defineProps<Props>()
</script>
