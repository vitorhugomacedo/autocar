<script>
import UsuarioEmpresaService from '@/service/UsuarioEmpresaService';
import PerfilUsuarioService from '@/service/PerfilUsuarioService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "UsuariosCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const usuarioEmpresaService = new UsuarioEmpresaService();
    const perfilUsuarioService = new PerfilUsuarioService();
    
    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        nome: yup.string()
          .required('Campo obrigatório'),
        email: yup.string()
          .required('Campo obrigatório'),
        idPerfilUsuario: yup.number()
          .required('Campo obrigatório'),
        ativo: yup.bool(),
      }),
    });

    const [nome] = defineField('nome');
    const [email] = defineField('email');
    const [idPerfilUsuario] = defineField('idPerfilUsuario');
    const [ativo] = defineField('ativo');

    return {
      router,
      toast,
      usuarioEmpresaService,
      perfilUsuarioService,
      nome,
      email,
      idPerfilUsuario,
      ativo,
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
      titulo: "",
      isEdicao: false,
      perfisUsuarios: [],
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo Usuário' : 'Editar Usuário'
    this.breadcrumbItems = [
      {
        label: 'Configurações',
        to: '/configuracoes/usuarios'
      },
      {
        label: 'Usuários',
        to: '/configuracoes/usuarios'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    this.perfisUsuarios = await this.perfilUsuarioService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const usuario = await this.usuarioEmpresaService.get(id)

      this.id = usuario.id;
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.idPerfilUsuario = usuario.perfilUsuario.id;
      this.ativo = usuario.ativo;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        nome: values.nome,
        email: values.email,
        idPerfilUsuario: values.idPerfilUsuario,
        ativo: values.ativo,
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.usuarioEmpresaService.update(body)
        } else {
          await this.usuarioEmpresaService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/configuracoes/usuarios');
        }, 400);

      } catch (e) {
        this.toast.add({ severity: 'error', summary: e.message, detail: '', life: 3000 });
        this.loading = false;
      }

    });
  },

  methods: {
    submit: async function () {
      this.onSubmit();
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

          <Panel header="Dados Principais" class="mb-4">

            <div v-if="id">
              <h6 class="p-input-title">CÓDIGO: {{ this.id }}</h6>
            </div>

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Nome</h6>
                <InputText v-model="nome" :class="{ 'p-invalid': errors.nome }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.nome || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">E-mail</h6>
                <InputText v-model="email" :class="{ 'p-invalid': errors.email }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.email || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-3">
                <h6 class="p-input-title">Perfil de Usuário</h6>
                <Dropdown v-model="idPerfilUsuario" editable :options="perfisUsuarios" optionLabel="opcao"
                  optionValue="id" placeholder="Selecione o perfil do usuário" class="w-full"
                  :class="{ 'p-invalid': errors.idPerfilUsuario }" />
                <small class="p-error" id="text-error">{{ errors.idPerfilUsuario || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-1">
                <h6 class="p-input-title">Ativo</h6>
                <InputSwitch v-model="ativo" />
              </div>
            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/configuracoes/usuarios'">
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
