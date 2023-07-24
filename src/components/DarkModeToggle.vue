<template>
  <div>
    <q-btn
      round
      color="primary"
      :icon="iconName"
      @click="handleChange"
      size="sm"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const iconName = computed(() => {
  return $q.dark.isActive ? 'dark_mode' : 'light_mode';
});

function handleChange() {
  const darkModeIsActive = !$q.dark.isActive;

  $q.dark.set(darkModeIsActive);
  $q.localStorage.set('darkMode', darkModeIsActive);
}

onMounted(() => {
  const darkModeIsActive = Boolean($q.localStorage.getItem('darkMode'));
  if (darkModeIsActive) {
    $q.dark.set(darkModeIsActive);
  }
});
</script>
