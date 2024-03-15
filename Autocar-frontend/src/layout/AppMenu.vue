<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
  {
    label: 'Início',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
    ]
  },
  {
      label: 'Cadastros',
      icon: 'pi pi-fw pi-plus-circle',
      items: [
        { label: 'Pessoas', icon: 'pi pi-fw pi-users', to: '/cadastros/pessoas' },
        { label: 'Veículos', icon: 'pi pi-car', to: '/cadastros/veiculos' },
        {
          label: 'Gerais',
          icon: 'pi pi-fw pi-search-plus',
          items: [
            { label: 'Tipo de Veículo', icon: 'fa-regular fa-square-plus', to: '/cadastros/tipos-veiculos' },
            { label: 'Marca', icon: 'fa-regular fa-tag', to: '/cadastros/marcas' },
            { label: 'Modelo', icon: 'fa-regular fa-bookmark', to: '/cadastros/modelos' },
            { label: 'Itens Adicionais', icon: 'fa-regular fa-file-circle-plus', to: '/cadastros/itens-adicionais' },
            { label: 'Combustível', icon: 'fa-regular fa-gas-pump', to: '/cadastros/combustiveis' }
          ]
        }
      ]
  },
  {
    label: 'Operações',
        icon: 'pi pi-fw pi-sync',
        items: [
          {
            label: 'Teste-Drive',
            icon: 'fa-regular fa-steering-wheel'
          }
        ]
  },
  {
    label: 'Financeiro',
    icon: 'pi pi-fw pi-chart-line',
    items: [
      { label: 'Extrato', icon: 'pi pi-fw pi-home' },
      {
        label: 'Lançamentos',
        icon: 'pi pi-fw pi-chart-pie',
        items: [
          { label: 'Contas a Pagar', icon: 'pi pi-fw pi-bookmark' },
          { label: 'Contas a Receber', icon: 'pi pi-fw pi-bookmark' },
          { label: 'Transferencia', icon: 'pi pi-fw pi-bookmark' }
        ]
      },
      {
        label: 'Gerais',
        icon: 'pi pi-fw pi-search-plus',
        items: [
          { label: 'Tipo de Carteira', icon: 'pi pi-fw pi-tag', to: '/financeiro/cadastros/tipo-carteira' },
          { label: 'Carteira', icon: 'pi pi-fw pi-bookmark', to: '/financeiro/cadastros/carteira' },
          { label: 'Grupo Contábil', icon: 'pi pi-fw pi-bookmark', to: '/financeiro/cadastros/grupo-contabil' },
          { label: 'Conta Contábil', icon: 'pi pi-fw pi-bookmark', to: '/financeiro/cadastros/conta-contabil' },
        ]
      }
    ]
  },
  {
    label: 'Relatórios',
    icon: 'pi pi-fw pi-chart-line',
    items: [
      {
        label: 'Faturamento Mensal',
        icon: 'pi pi-fw pi-chart-pie',
        items: [
          { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
          { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        ]
      },
      {
        label: 'Relatório de Rotatividade',
        icon: 'pi pi-fw pi-chart-line',
        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
      }
    ]
  },
  {
    label: 'Configurações',
    icon: 'fa fa-user-pen',
    items: [
      {
        label: 'Usuários',
        icon: 'fa-regular fa-user-pen',
        to: '/configuracoes/usuarios'
      },
      {
        label: 'Perfil de Usuário',
        icon: 'fa-regular fa-users-medical',
        to: '/configuracoes/perfil-usuario'
      }
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
