<template>
  <div class="flex items-center cursor-pointer q-px-sm" style="gap: 5px">
    <div style="font-size: 15px; font-weight: 500">{{ nometeste }}</div>
    <div>|</div>
    <q-icon size="16px" name="keyboard_arrow_down"></q-icon>
    <q-menu fit>
      <q-list style="min-width: 100px">
        <q-item dense clickable v-close-popup>
          <q-item-section class="text-center">Minha conta </q-item-section>
        </q-item>
        <q-item dense clickable v-close-popup>
          <q-item-section class="text-center" @click="logout"
            >Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from 'src/services/AuthService';

const router = useRouter();

interface Props {
  nometeste: string;
}

const props = withDefaults(defineProps<Props>(), {
  nometeste: '',
});

async function logout() {
  try {
    await AuthService.logout();
    router.push('/login');
  } catch (error) {
    console.error(error);
  }
}
</script>
