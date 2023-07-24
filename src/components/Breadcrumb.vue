<template>
  <q-breadcrumbs class="q-my-xs">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" style="color: #333333" />
    </template>

    <q-breadcrumbs-el
      v-for="(item, index) in items"
      :to="item.link"
      :label="item.name"
      :key="index"
      class="breadcrumb-active-color"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { BreadcrumbItem } from '~/interfaces/breadcrumbItem.interface';

interface Props {
  items: BreadcrumbItem[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.breadcrumb-active-color {
  color: #003366;
}
</style>
