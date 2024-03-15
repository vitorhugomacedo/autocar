<script>
import PerfilUsuarioService from '@/service/PerfilUsuarioService';
import PerfilUsuarioModuloService from '@/service/PerfilUsuarioModuloService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "UsuariosPerfilCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const perfilUsuarioService = new PerfilUsuarioService();
    const perfilUsuarioModuloService = new PerfilUsuarioModuloService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        descricao: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [descricao] = defineField('descricao');

    return {
      router,
      toast,
      perfilUsuarioService,
      perfilUsuarioModuloService,
      descricao,
      handleSubmit,
      errors,
    };
  },

  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [],
      modulos: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      usuarioAtivo: true,
      colunas: [
        { field: 'consultar', header: 'Consultar' },
        { field: 'cadastrar', header: 'Cadastrar' },
        { field: 'editar', header: 'Editar' },
        { field: 'excluir', header: 'Excluir' }
      ],
      visible: false,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo Perfil de Usuário' : 'Editar Perfil de Usuário'
    this.breadcrumbItems = [
      {
        label: 'Configurações',
        to: '/configuracoes/usuarios'
      },
      {
        label: 'Usuários',
        to: 'Perfil de Usuário'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const perfilUsuario = await this.perfilUsuarioService.get(id)

      this.id = perfilUsuario.id;
      this.descricao = perfilUsuario.descricao;
    }

    this.modulos = await this.perfilUsuarioModuloService.getAll(this.id);

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        descricao: values.descricao,
      }

      try {
        this.loading = true;

        let perfil = null;

        if (this.id) {
          perfil = await this.perfilUsuarioService.update(body)
        } else {
          perfil = await this.perfilUsuarioService.create(body)
        }

        await this.perfilUsuarioModuloService.save({
          idPerfil: perfil.id,
          modulos: this.modulos.map(x => ({
            id: x.id,
            idModulo: x.idModulo,
            cadastrar: x.cadastrar ?? false,
            consultar: x.consultar ?? false,
            editar: x.editar ?? false,
            excluir: x.excluir ?? false,
          }))
        })

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/configuracoes/perfil-usuario');
        }, 400);

      } catch (e) {
        this.toast.add({ severity: 'error', summary: e.message, detail: '', life: 3000 });
        this.loading = false;
      }

    });
  },

  methods: {
    submit: async function () {
      if(this.descricao.toUpperCase() === 'ADMINISTRADOR')
        this.visible = true;
      else
        this.onSubmit();
    },
    getStatusLabel(status) {
      return status ? 'sucess' : 'danger'
    }
  },
};

</script>

<template>
  <Toast />
  <div class="font-medium text-2xl text-color">{{ titulo }}</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <form>

          <Dialog v-model:visible="visible" header="Confirmação" :style="{ width: '25rem' }">
            <span class="p-text-secondary text-align-center block mb-2 pt-2">Não é permitido gravar outro perfil
              <br> com o nome ADMINISTRADOR.</span>
            <div class="flex justify-content-end gap-2">
              <Button type="button" label="Ok" @click="visible = false"></Button>
            </div>
          </Dialog>
          <Panel header="Dados Principais" class="mb-4">

            <div v-if="id">
              <h6 class="p-input-title">CÓDIGO: {{ this.id }}</h6>
            </div>

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Nome do Perfil</h6>
                <InputText v-model="descricao" :class="{ 'p-invalid': errors.descricao }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.descricao || '' }}</small>
              </div>
            </div>

          </Panel>
        </form>

        <DataTable :value="modulos" editMode="cell" :pt="{
    table: { style: 'min-width: 50rem' },
    column: {
      bodycell: ({ state }) => ({
        class: [{ 'pt-0 pb-0': state['d_editing'] }]
      })
    }
  }">
          <ScrollTop icon="pi pi-arrow-up" :pt="{
    root: 'w-2rem h-2rem secondary-color border-round-sm',
    icon: {
      class: 'text-base'
    }
  }" />
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="text-large text-700">Módulos do Sistema</span>
            </div>
          </template>
          <Column field="id" header="Cód." style="width: 8%">
            <template #body="{ data }">
              {{ data.idModulo }}
            </template>
          </Column>
          <Column field="nome" header="Nome do Módulo" style="width: 20%">
            <template #body="{ data }">
              {{ data.grupo }} - {{ data.nome }}
            </template>
          </Column>
          <Column v-for="col of colunas" :key="col.field" :field="col.field" :header="col.header" style="width: 18%">
            <template #body="{ data, field }">
              <ToggleButton :class="getStatusLabel(data[field])" v-model="data[field]" onLabel="HABILITADO"
                offLabel="BLOQUEADO" onIcon="pi pi-check-circle" offIcon="pi pi-times-circle" class="w-10rem"
                aria-label="" />
            </template>
          </Column>
          <template #footer></template>
        </DataTable>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/configuracoes/perfil-usuario'">
            <Button label="Voltar" icon="pi pi-undo" class="p-button-secondary mr-2" raised></Button>
          </router-link>
        </template>
        <template v-slot:end>
          <div class="my-2">
            <Button label="Salvar" icon="pi pi-save" class="p-button-sucess mr-4" :loading="loading" raised
              @click="submit"></Button>
          </div>
        </template>
      </Toolbar>
    </div>
  </div>
</template>
