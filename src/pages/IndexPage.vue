<template>
  <q-page class="row items-center justify-evenly">
    {{ t('failed') }}
    <example-component
      title="Example component"
      active
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
