<template>
  <q-btn @click="emit('click')" color="primary" no-caps>
    <q-icon size="20px" class="q-pr-xs" name="add"></q-icon>
    <span class="q-pr-xs"> Novo </span>
  </q-btn>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void;
}>();
</script>
