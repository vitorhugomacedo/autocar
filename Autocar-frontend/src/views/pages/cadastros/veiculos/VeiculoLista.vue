<script>
import VeiculoService from '@/service/VeiculoService';
import UrlService from '@/service/UrlService';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import Filtros from '@/components/Filtros.vue'

export default {
  name: "VeiculoLista",
  components: {
    Filtros
  },
  setup() {
    const confirm = useConfirm();
    const toast = useToast();
    const urlService = new UrlService();

    return {
      confirm,
      toast,
      urlService
    };
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [{
        label: 'Cadastros',
        to: '/cadastros/veiculos'
      },
      {
        label: 'Veículos',
        to: '/cadastros/veiculos'
      }],
      filters: [],
      registros: [],
      layout: 'list',
      loading: false,
      formatacaoService: null
    }
  },
  beforeMount() {
    this.searchRecords()
    this.buildFilters()
  },
  methods: {

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    searchRecords: async function () {
      this.loading = true;

      this.veiculoService = new VeiculoService();
      this.registros = await this.veiculoService.getAll(this.urlService.getQueryParamsObject());

      this.loading = false;
    },

    buildFilters: async function () {
      //const tipoVeiculos = await this.tipoVeiculoService.getOptions();

      this.filters = [
        { field: 'Placa', property: 'placa', type: 'text' },
        //{ field: 'Tipo de Veículo', property: 'idTipoVeiculo', type: 'multiselect', options: tipoVeiculos }
      ]
    },

    updateFilter: function (filter) {
      this.urlService.clearQueryParams()

      for (var prop in filter) {
        if (filter.hasOwnProperty(prop)) {
          this.urlService.setParam(prop, filter[prop]);
        }
      }
      this.searchRecords()
    },

    changePage: async function (pagination) {
      this.urlService.setParam('page', pagination.page + 1);
      this.searchRecords()
    },
  }
}

</script>

<template>
  <div class="font-medium text-2xl text-color">Veículos</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:end>
            <div class="my-2">
              <router-link :to="'/cadastros/veiculos/novo'">
                <Button label="Novo" icon="pi pi-plus" class="p-button-primary mr-2"></Button>
              </router-link>
            </div>
          </template>
        </Toolbar>

        <DataView :value="registros.data" paginator lazy :first="(registros.currentPage - 1) * registros.pageSize"
          :rows="registros.pageSize" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="registros.count"
          :layout="layout" :loading="loading">

          <template v-if="!loading" #empty style="">
            <div class="col-12">Nenhum veículo encontrado. </div>
          </template>

          <template #loading>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </template>

          <template #header>
            <Filtros :filters="filters" :updateFilter="updateFilter" />
          </template>

          <template #list="body">
            <div class="col-12 p-3" style="background-color: var(--surface-hover)">
              <div class="flex flex-column md:flex-row sm:flex sm:align-items-center p-3 gap-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }"
                style="background-color: var(--surface-card); border-radius: 10px;">
                <div class="md:w-10rem relative">
                  <img class="block xl:block mx-auto border-round w-full md:w-10rem sm:w-full"
                    :src="'https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2020/03/car-01-300x219.jpg'"
                    :alt="''" />
                  <Tag :value="'Disponível'" :severity="'success'" class="absolute" style="left: 4px; top: 4px"></Tag>
                </div>
                <div
                  class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4 p-1">
                  <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2 mt-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">CARROS > MITSUBISHI > LANCER</span>
                      <div class="text-lg font-medium text-900 mt-2">MITSUBISHI LANCER EVO 1.6 BRANCO 2012</div>
                      <div class="flex flex-wrap gap-3" style="padding: 1rem 1rem 1rem 0;">
                        <Tag style="background: var(--surface-section); color: var(--surface-0)">
                          <div class="flex align-items-center gap-2 px-1">
                            <img class="list-features-icon" decoding="async"
                              src="https://dreamsrent-wp.dreamstechnologies.com/wp-content/themes/dreamsrent/assets/images/car-parts-01.svg"
                              alt="Icon">
                            <span class="text-base text-color-secondary">Manual</span>
                          </div>
                        </Tag>
                        <Tag style="background: var(--surface-section); color: var(--surface-0)">
                          <div class="flex align-items-center gap-2 px-1">
                            <img class="list-features-icon" decoding="async"
                              src="https://dreamsrent-wp.dreamstechnologies.com/wp-content/themes/dreamsrent/assets/images/car-parts-02.svg"
                              alt="Icon">
                            <span class="text-base text-color-secondary">220.000 KM</span>
                          </div>
                        </Tag>
                        <Tag style="background: var(--surface-section); color: var(--surface-0)">
                          <div class="flex align-items-center gap-2 px-1">
                            <img class="list-features-icon" decoding="async"
                              src="https://dreamsrent-wp.dreamstechnologies.com/wp-content/themes/dreamsrent/assets/images/car-parts-03.svg"
                              alt="Icon">
                            <span class="text-base text-color-secondary">Gasolina</span>
                          </div>
                        </Tag>
                        <Tag style="background: var(--surface-section); color: var(--surface-0)">
                          <div class="flex align-items-center gap-2 px-1">
                            <img class="list-features-icon" decoding="async"
                              src="https://dreamsrent-wp.dreamstechnologies.com/wp-content/themes/dreamsrent/assets/images/car-parts-04.svg"
                              alt="Icon">
                            <span class="text-base text-color-secondary">Hidráulica</span>
                          </div>
                        </Tag>
                        <Tag style="background: var(--surface-section); color: var(--surface-0)">
                          <div class="flex align-items-center gap-2 px-1">
                            <img class="list-features-icon" decoding="async"
                              src="https://dreamsrent-wp.dreamstechnologies.com/wp-content/themes/dreamsrent/assets/images/car-parts-05.svg"
                              alt="Icon">
                            <span class="text-base text-color-secondary">1.6</span>
                          </div>
                        </Tag>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">R$ 24.999,90</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-eye" label="Visualizar"
                        class="p-button-secondary flex-auto md:flex-initial white-space-nowrap"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-nogutter">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-6 p-2">
                <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                  <div class="surface-50 flex justify-content-center border-round p-3">
                    <div class="relative mx-auto">
                      <img class="border-round w-full"
                        :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name"
                        style="max-width: 300px" />
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute"
                        style="left: 4px; top: 4px"></Tag>
                    </div>
                  </div>
                  <div class="pt-4">
                    <div class="flex flex-row justify-content-between align-items-start gap-2">
                      <div>
                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium text-900 mt-1">{{ item.name }}</div>
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                          style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-column gap-4 mt-4">
                      <span class="text-2xl font-semibold text-900">${{ item.price }}</span>
                      <div class="flex gap-2">
                        <Button icon="pi pi-shopping-cart" label="Buy Now"
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                          class="flex-auto white-space-nowrap"></Button>
                        <Button icon="pi pi-heart" outlined></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>Total de {{ registros.count }} {{ registros.count > 1 ? 'registros encontrados' : 'registro encontrado' }}.</template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-features-icon {
  margin-right: 5px;
  line-height: 0;
  width: 20px;
}
</style>