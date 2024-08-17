<script setup lang="ts"></script>

<template>
  <div class="w-full bg-white border rounded-lg">
    <div class="overflow-hidden rounded-lg">
      <table class="w-full border-collapse text-left">
        <thead class="bg-gray-50">
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t">
          <slot name="body" />
        </tbody>
      </table>
    </div>
    <slot name="paginator" />
  </div>
</template>

<style scoped></style>
