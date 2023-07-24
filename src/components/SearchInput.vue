<template>
  <div class="row">
    <div class="col-12 flex no-wrap">
      <q-input
        v-model="text"
        class="flex-1 default-search-input"
        placeholder="Pesquisar"
        bg-color="white"
        outlined
        dense
        type="search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        @click="emit('search', text)"
        class="search-button"
        square
        color="primary"
        no-caps
        >Pesquisar</q-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (event: 'search', value: string): void;
}>();

const text = ref('');
</script>

<style scoped>
.search-button {
  border-radius: 0 20px 20px 0;
}
</style>
