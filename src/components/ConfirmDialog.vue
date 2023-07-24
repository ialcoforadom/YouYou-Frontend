<template>
  <q-dialog :model-value="open" persistent>
    <q-card class="dialog-card">
      <q-card-section class="flex">
        <q-space />
        <div class="default-title">{{ title }}</div>
        <q-space />
        <q-btn @click="closeDialog" size="12px" flat round icon="close" />
      </q-card-section>
      <q-card-section class="text-center q-mb-sm">
        <div>{{ message }}</div>
      </q-card-section>

      <q-card-section class="flex gap-2 justify-center">
        <q-btn
          :label="cancelButtonLabel"
          @click="closeDialog"
          color="grey"
          no-caps
        />
        <q-btn
          :label="confirmButtonLabel"
          @click="confirm"
          color="text-white"
          style="background-color: #cc0000"
          no-caps
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  cancelButtonLabel: 'Cancelar',
  confirmButtonLabel: 'Confirmar',
  message: 'Você tem certeza?',
  title: 'Confirmar',
});

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void;
  (event: 'confirm'): void;
}>();

function closeDialog(): void {
  emit('update:open', false);
}

function confirm() {
  emit('confirm');
  closeDialog();
}
</script>

<style scoped>
.dialog-card {
  width: 500px;
}
</style>
