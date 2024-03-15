<script>
import UrlService from '@/service/UrlService';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import Filtros from '@/components/Filtros.vue'

export default {
  name: "UsuarioConfiguracao",
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
        label: 'Configurações',
        to: '/configuracoes/usuario-configuracao'
      },
      {
        label: 'Configuração de Usuário',
        to: '/configuracoes/usuario-configuracao'
      }],
      registros: [],
      nomeUsuario: null,
      emailUsuario: null,
      telefoneUsuario: null,
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
      });
    },

    searchRecords: async function () {
      this.loading = true;

      var usuarioLogado = JSON.parse(localStorage.getItem('auth'));

      this.nomeUsuario = usuarioLogado.nome;
      this.emailUsuario = usuarioLogado.login;

      this.loading = false;
    },

    buildFilters: async function () {
      this.filters = []
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
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Sucesso', detail: 'Imagem alterada com sucesso!', life: 3000 });
    },
  }
}

</script>

<template>
  <div class="font-medium text-2xl text-color">Configuração de Usuário</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Panel header="Dados de Cadastro">
          <div class="grid">
            <div class="col-12 lg:col-2">
              <div class="text-900 font-medium text-xl mb-3">Foto de Perfil</div>
              <img src="/layout/images/andre.jpg"
                class="w-3rem sm:w-8rem flex-shrink-0 mr-3 shadow-2 min-w-3rem"
                style="border-radius: 10px; min-width: 80px; min-height: 80px;" alt="product">
              <div class="font-small text-700 mt-4">Tamanho máximo de 1MB.</div>
              <Toast />
              <FileUpload class="mt-2" showUploadButton
                invalidFileSizeMessage="Tamanho de Imagem não pode ser maior que o permitido." mode="basic" name="demo[]"
                url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true"
                chooseLabel="Selecione..." />
            </div>
            <div class="col-12 lg:col-10">
              <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6">
                  <h6 class="p-input-title">Nome Completo</h6>
                  <InputText type="text" v-model="nomeUsuario" />
                  <small class="p-error" id="text-error"></small>
                </div>

                <div class="field mb-4 col-12 md:col-4">
                  <h6 class="p-input-title">Telefone</h6>
                  <InputText type="text" />
                  <small class="p-error" id="text-error"></small>
                </div>
                
              </div>
              <div class="grid formgrid p-fluid">
                  <div class="field mb-4 col-12 md:col-6">
                    <h6 class="p-input-title">E-mail</h6>
                    <InputText type="text" v-model="emailUsuario"  disabled />
                    <small class="p-error" id="text-error"></small>
                  </div>
                </div>
                <div class="col-12 flex justify-content-end">
                  <button class="p-button p-component w-auto mt-3" type="button" aria-label="Gravar" data-pc-name="button"
                    data-pc-section="root" data-pd-ripple="true">

                    <span class="p-button-label" data-pc-section="label">Salvar Alterações</span>

                    <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink"
                      data-pc-name="ripple" data-pc-section="root"></span>
                  </button>
                </div>
            </div>
          </div>
        </Panel>
        <Panel header="Alteração de Senha" class="mt-6">
          <div class="col-12 lg:col-12">
            <div class="grid formgrid p-fluid">
              <div class="field mb-4 col-12 md:col-4">
                <h6 class="p-input-title">Senha Atual</h6>
                <InputText type="text" />
                <small class="p-error" id="text-error"></small>
              </div>
              <div class="field mb-4 col-12 md:col-4">
                <h6 class="p-input-title">Nova Senha</h6>
                <InputText type="text" />
                <small class="p-error" id="text-error"></small>
              </div>
              <div class="field mb-4 col-12 md:col-4">
                <h6 class="p-input-title">Confirmar Nova Senha</h6>
                <InputText type="text" />
                <small class="p-error" id="text-error"></small>
              </div>
              <div class="col-12 flex justify-content-end">
                <button class="p-button p-component w-auto mt-3" type="button" aria-label="Gravar" data-pc-name="button"
                  data-pc-section="root" data-pd-ripple="true">

                  <span class="p-button-label" data-pc-section="label">Salvar Nova Senha</span>

                  <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink"
                    data-pc-name="ripple" data-pc-section="root"></span>
                </button>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
    <Toast />
  </div>
</template>
