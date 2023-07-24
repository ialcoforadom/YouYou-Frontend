<template>
  <div class="row items-center justify-evenly">
    <q-img :src="logo" style="width: 180px; margin: 1rem" />
  </div>
  <div
    v-for="(menuItem, fatherIndex) in menuItems"
    :key="menuItem.title"
    style="font-weight: 500"
  >
    <q-expansion-item
      v-if="menuItem.subItems"
      :icon="menuItem.icon"
      :label="menuItem.title"
      :class="{ active: activeIndex === fatherIndex }"
      class="father-item"
      expand-icon-class="text-white"
      expand
    >
      <q-item
        v-for="item in menuItem.subItems"
        @click="setActiveIndex(fatherIndex)"
        :key="item.title"
        :to="item.link"
        class="child-item"
        active-class="active"
        clickable
      >
        <q-item-section class="q-pl-sm">
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-item
      v-else
      :to="menuItem.link"
      @click="setActiveIndex(fatherIndex)"
      exact
      clickable
      class="father-item"
      active-class="active"
    >
      <q-item-section v-if="menuItem.icon" avatar>
        <q-icon :name="menuItem.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ menuItem.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logo from '../assets/youyou.png';

interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  subItems?: MenuSubItem[];
}

interface MenuSubItem {
  title: string;
  link?: string;
  icon?: string;
}

const activeIndex = ref(0);

const menuItems: MenuItem[] = [
  {
    title: 'Tela inicial',
    icon: 'o_home',
    link: '/',
  },
  {
    title: 'Trello',
    icon: 'o_home',
    link: '/trello',
  },
  {
    title: 'Cadastros',
    icon: 'o_settings',
    link: '/management',
    subItems: [{ title: 'Dispositivos', link: '/management/devices' }],
  },
  {
    title: 'Usuários',
    icon: 'o_person',
    link: '/users',
    subItems: [
      { title: 'Operadores', link: '/user/operator' },
      { title: 'Coordenadores', link: '/user/coordinator' },
      { title: 'Designers', link: '/user/designer' },
      { title: 'Editores', link: '/user/editor' },
      { title: 'Clientes', link: '/user/client' },
    ],
  },
];

function setActiveIndex(index: number): void {
  activeIndex.value = index;
}
</script>
<style lang="scss" scoped>
.father-item {
  position: relative;
}
.father-item.active {
  position: relative;
  background-image: linear-gradient(to right, #eba29b, #ba807b);
}
.father-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: white;
  transition: all 0.4s;
  transform: translateX(-150%);
}
.father-item.active::before {
  transform: translateX(0);
}
.child-item {
  background-color: #eba29b;
}
.child-item.active {
  color: white;
  font-weight: 800;
  background-image: linear-gradient(to right, #eba29b, #ba807b);
}
</style>
