<script>
import UsuarioEmpresaService from '@/service/UsuarioEmpresaService';
import PerfilUsuarioService from '@/service/PerfilUsuarioService';
import UrlService from '@/service/UrlService';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import Filtros from '@/components/Filtros.vue'

export default {
  name: "UsuarioLista",
  components: {
    Filtros
  },
  setup() {
    const confirm = useConfirm();
    const toast = useToast();
    const urlService = new UrlService();
    const perfilUsuarioService = new PerfilUsuarioService();

    return {
      confirm,
      toast,
      urlService,
      perfilUsuarioService
    };
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [{
        label: 'Configurações',
        to: '/configuracoes/usuarios'
      },
      {
        label: 'Usuários',
        to: '/configuracoes/usuarios'
      }],
      filters: [],
      usuarioEmpresaService: null,
      registros: [],
      visible: false,
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
          await this.usuarioEmpresaService.delete({ id })

          const index = this.registros.data.findIndex(x => x.id == id);
          if (index > -1) {
            this.registros.data.splice(index, 1);
          }

          this.toast.add({ severity: 'success', summary: 'Registro excluído com sucesso', detail: '', life: 3000 });
        },
      });
    },

    searchRecords: async function () {

      this.loading = true;

      this.usuarioEmpresaService = new UsuarioEmpresaService();
      this.registros = await this.usuarioEmpresaService.getAll(this.urlService.getQueryParamsObject());
      this.loading = false;
    },

    buildFilters: async function () {
      const perfilUsuarios = await this.perfilUsuarioService.getOptions();

      this.filters = [
        { field: 'Nome', property: 'nome', type: 'text' },
        { field: 'Email', property: 'email', type: 'text' },
        { field: 'Perfil', property: 'idPerfilUsuario', type: 'multiselect', options: perfilUsuarios }
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
  <div class="font-medium text-2xl text-color">Usuários</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:end>
            <div class="my-2">
              <router-link :to="'/configuracoes/usuarios/novo'">
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
        <Dialog v-model:visible="visible" header="Confirmação" :style="{ width: '25rem' }">
            <span class="p-text-secondary text-align-center block mb-2 pt-2">Não é permitido Editar ou Excluir<br> o usuário ADMINISTRADOR.</span>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Ok" @click="visible = false"></Button>
            </div>
        </Dialog>

        <DataTable :value="registros.data" paginator lazy :first="(registros.currentPage - 1) * registros.pageSize"
          :rows="registros.pageSize" :totalRecords="registros.count" class="p-datatable backgroud-color-white"
          dataKey="id" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
          <template v-if="!loading" #empty>Nenhum usuário encontrado. </template>
          <template #header>
              <Filtros :filters="filters" :updateFilter="updateFilter" />
          </template>
          <template #loading>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </template>
          <Column field="id" header="Cód." bodyClass="text-left" style="min-width: 3rem">
            <template #body="{ data }">
              <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
            </template>
          </Column>
          <Column field="nome" header="Nome" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.nome }}
            </template>
          </Column>
          <Column field="email" header="E-mail" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
          </Column>
          <Column field="perfil" header="Perfil" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.perfilUsuario.descricao }}
            </template>
          </Column>
          <Column field="Ativo" header="Status" dataType="boolean" bodyClass="text-left"
            style="min-width: 1rem; width: 1rem;">
            <template #body="{ data }">
              <div v-if="data.ativo">
                <Tag class="mr-2 ml-2" style="width: 3rem" severity="success" value="Ativo"></Tag>
              </div>
              <div v-if="!data.ativo">
                <Tag class="mr-2 ml-2" style="width: 3rem" severity="danger" value="Inativo"></Tag>
              </div>
            </template>
          </Column>
          <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 10rem">
            <template #body="{ data }">
              <router-link :to="`/configuracoes/usuarios/editar/${data.id}`">
                <Button v-if="data.perfilUsuario.descricao !== 'ADMINISTRADOR'" v-tooltip.top="'Editar'" icon="pi pi-user-edit" class="p-button-rounded p-button-text mr-4" text
                  rounded></Button>
              </router-link>

              <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text rounded
                @click="data.perfilUsuario.descricao === 'ADMINISTRADOR' ? visible = true :  showTemplate(data.id, `Deseja realmente excluir o usuário ${data.perfilUsuario.descricao}?`)"></Button>
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
    <Toast />
  </div>
</template>
