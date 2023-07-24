<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="header">
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-icon size="30px" name="o_account_circle" />

        <q-toolbar-title class="logged-user-name">
          {{ userStore.name }}
        </q-toolbar-title>
        <div class="widgets">
          <UserMenu :nometeste="userStore.userName" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="240"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-white menu-default-bg-color"
    >
      <div>
        <SideMenu />
      </div>
    </q-drawer>

    <q-page-container class="default-bg-color" style="font-weight: 300">
      <Suspense>
        <div>
          <q-card class="q-ma-md q-pa-md default-card-bg-color shadow-4">
            <router-view />
          </q-card>
        </div>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UserMenu from 'src/components/UserMenu.vue';
import SideMenu from 'src/components/SideMenu.vue';
import { useUserStore } from 'src/stores/userStore';

const userStore = useUserStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style lang="scss" scoped>
.body--light {
  .q-drawer {
    background: $grayBackgroundSecondary;
  }
  .q-header {
    background: $grayBackgroundSecondary;
  }
  .q-header .q-toolbar {
    color: $primary;
  }
}
.body--dark .q-header {
  background: $dark;
}

.widgets {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header {
  background-color: #fcfcfc;
}
.logged-user-name {
  font-size: 1rem;
  font-weight: 500;
}
</style>
