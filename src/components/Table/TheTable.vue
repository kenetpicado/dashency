<script setup lang="ts">
defineProps<{
  tableClass?: string
}>()
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg border">
    <table class="table" :class="tableClass">
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
  <slot name="paginator" />
</template>
