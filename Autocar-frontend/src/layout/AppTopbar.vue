<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  // return `layout/images/${layoutConfig.darkTheme.value ? 'unicar-svg-white' : 'unicar-svg-black'}.svg`;
  return `layout/images/${layoutConfig.darkTheme.value ? 'LOGO-AUTOCAR-BRANCA' : 'LOGO-AUTOCAR-PRETA'}.png`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const onProfileClick = () => {
  topbarMenuActive.value = false;
  router.push('/configuracoes/usuario-configuracao');
};
const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push('/documentation');
};
const exitClick = () => {
  topbarMenuActive.value = false;
  localStorage.removeItem('auth')
  router.push('/login');
};
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/dashboard" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button v-ripple @click="onProfileClick()"
        class="relative overflow-hidden w-full p-link flex align-items-end justify-content-end text-color border-noround" style="border-radius: 20px !important;">
        <span class="inline-flex flex-column mr-3 mb-1">
          <span style="color: var(--text-color);" class="font-medium text-1xl text-900">Andre Rodrigues</span>
          <span class="text-sm text-color-secondary">Administrador(a)</span>
        </span>
        <div class="p-avatar p-component p-avatar-image p-avatar-circle p-avatar-lg border-1 surface-border"
          data-pc-name="avatar" data-pc-section="root">
          <!-- <img src="/layout/images/andre.jpg" data-pc-section="image" /> -->
          <Avatar image="layout/images/andre.jpg" shape="circle" />
        </div>
      </button>
      <button @click="onSettingsClick()" class="p-link layout-topbar-button mr-2">
        <i class="pi pi-cog"></i>
        <span>Configurações</span>
      </button>
      <button @click="exitClick()" class="p-link layout-topbar-button">
        <i class="pi pi-sign-out"></i>
        <span>Sair</span>
      </button>
    </div>
</div></template>

<style lang="scss" scoped></style>
