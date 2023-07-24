<template>
  <label v-if="label" :class="labelColor" class="label">{{ label }}:</label>
  <slot></slot>

  <div v-if="hasErrors" class="flex column q-mt-xs">
    <span v-for="(error, i) in errors" :key="i" class="text-negative">
      {{ error.$message }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ErrorObject } from '@vuelidate/core';
interface Props {
  label?: string;
  errors?: ErrorObject[];
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  errors: () => [],
});

const hasErrors = computed(() => {
  return props.errors.length;
});

const labelColor = computed(() => {
  return `text-${hasErrors.value ? 'negative' : 'grey-10'}`;
});
</script>
<style scoped lang="scss">
.label {
  transition: 0.1s all;
}
</style>
