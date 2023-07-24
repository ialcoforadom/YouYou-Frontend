<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  background-color: white;
  padding: 14px;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
