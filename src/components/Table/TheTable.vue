<script setup lang="ts"></script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg border">
    <table class="table">
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
