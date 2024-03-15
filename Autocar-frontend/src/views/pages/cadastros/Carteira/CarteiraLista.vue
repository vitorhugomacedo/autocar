<script>
import CarteiraService from '@/service/CarteiraService';
import TipoCarteiraService from '@/service/TipoCarteiraService';
import UrlService from '@/service/UrlService';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import Filtros from '@/components/Filtros.vue'

export default {
  name: "CarteiraLista",
  components: {
    Filtros
  },
  setup() {
    const confirm = useConfirm();
    const toast = useToast();
    const urlService = new UrlService();
    const tipoCarteiraService = new TipoCarteiraService();

    return {
      confirm,
      toast,
      urlService,
      tipoCarteiraService
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
        to: '/financeiro/cadastros/carteira'
      },
      {
        label: 'Carteiras',
        to: '/financeiro/cadastros/carteira'
      }],
      filters: [],
      carteiraService: null,
      registros: [],
      loading: true
    }
  },
  async beforeMount() {
    this.searchRecords();
    this.buildFilters();
  },
  methods: {
    showTemplate: function (id, message) {
      this.confirm.require({
        group: 'templating',
        header: 'Confirmação',
        message: message,
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectClass: 'p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Excluir',
        accept: async () => {
          await this.carteiraService.delete({ id })

          const index = this.registros.findIndex(x => x.id == id);
          if (index > -1) {
            this.registros.splice(index, 1);
          }

          this.toast.add({ severity: 'success', summary: 'Registro excluído com sucesso', detail: '', life: 3000 });
        },
      });
    },

    searchRecords: async function () {

      this.loading = true;

      this.carteiraService = new CarteiraService();
      this.registros = await this.carteiraService.getAll(this.urlService.getQueryParamsObject());

      this.loading = false;
    },

    buildFilters: async function () {
      const tipoCarteiras = await this.tipoCarteiraService.getOptions();

      this.filters = [
        { field: 'Descricão', property: 'descricao', type: 'text' },
        { field: 'Tipo de Carteira', property: 'idTipoCarteira', type: 'multiselect', options: tipoCarteiras }
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
  <div class="font-medium text-2xl text-color">Carteiras</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:end>
            <div class="my-2">
              <router-link :to="'/financeiro/cadastros/carteira/novo'">
                <Button label="Novo" icon="pi pi-plus" class="p-button-primary mr-2"></Button>
              </router-link>
            </div>
          </template>
        </Toolbar>

        <ConfirmDialog group="templating">
          <template #message="slotProps">
            <div class="flex flex-column align-items-center w-full gap-3 surface-border">
              <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
              <p>{{ slotProps.message.message }}</p>
            </div>
          </template>
        </ConfirmDialog>

        <DataTable :value="registros.data" paginator lazy :first="(registros.currentPage - 1) * registros.pageSize"
          :rows="registros.pageSize" :totalRecords="registros.count" class="p-datatable backgroud-color-white"
          dataKey="id" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
          <template v-if="!loading" #empty>Nenhuma carteira encontrada. </template>
          <template #header>
              <Filtros :filters="filters" :updateFilter="updateFilter" />
          </template>
          <template #loading>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </template>
          <Column field="id" header="Cód." bodyClass="text-left" style="min-width: 2rem">
            <template #body="{ data }">
              <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
            </template>
          </Column>
          <Column field="descricao" header="Descrição" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.descricao }}
            </template>
          </Column>
          <Column field="tipoCarteira" header="Tipo de Carteira" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.tipoCarteira.descricao }}
            </template>
          </Column>
          <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 4rem">
            <template #body="{ data }">
              <div v-if="data.editavel">
                <router-link :to="`/financeiro/cadastros/carteira/editar/${data.id}`">
                  <Button v-tooltip.top="'Editar'" icon="pi pi-user-edit" class="p-button-rounded p-button-text" text
                    rounded></Button>
                </router-link>

                <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text rounded
                  @click="showTemplate(data.id, `Deseja realmente excluir a carteira ${data.descricao}?`)"></Button>
              </div>
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
    <Toast />
  </div>
</template>
