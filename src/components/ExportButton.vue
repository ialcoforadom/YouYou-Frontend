<template>
  <q-btn :loading="loading" @click="emit('click')" color="primary" no-caps>
    <q-icon size="18px" class="q-pr-xs" name="o_download"></q-icon>
    <span class="q-pr-xs"> Exportar </span>
  </q-btn>
</template>
<script setup lang="ts">
interface Props {
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (event: 'click'): void;
}>();
</script>
