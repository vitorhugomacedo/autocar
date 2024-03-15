<script setup>
import { ref } from 'vue';

import AppMenuItem from '../AppMenuItem.vue';

const model = ref([
  {
    label: 'Início',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/superadmin' },
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-plus-circle',
        items: [
          {
            label: 'Empresas', icon: 'pi pi-fw pi-users', to: '/superadmin/cadastros/empresas'
          },
        ]
      },
    ]
  }
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
