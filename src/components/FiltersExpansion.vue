<template>
  <q-list dense bordered class="rounded-borders">
    <q-expansion-item
      dense
      header-class="bg-white text-grey-8"
      icon="filter_list"
      label="Filtros"
    >
      <q-card class="bg-white">
        <div class="q-px-sm">
          <q-separator />
        </div>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script setup lang="ts"></script>
