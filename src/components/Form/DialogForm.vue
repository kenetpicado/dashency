<script setup lang="ts">
defineProps<{
  title: string
  isOpen: boolean
}>()
</script>

<template>
  <dialog class="modal modal-bottom sm:modal-middle" :class="{ 'modal-open': isOpen }">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-0">
        <slot></slot>
      </p>
    </div>
  </dialog>
</template>
