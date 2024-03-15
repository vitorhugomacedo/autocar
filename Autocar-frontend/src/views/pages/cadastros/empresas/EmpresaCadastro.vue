<script>
import AfiliadoEmpresaService from '@/service/AfiliadoEmpresaService';
import Enderecos from '@/components/Enderecos.vue';
import Contatos from '@/components/Contatos.vue';
import Usuario from '@/components/Usuario.vue';
import valida from '@/service/ValidationService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "ClienteEmpresa",
  components: {
    Enderecos,
    Contatos,
    Usuario
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const afiliadoEmpresaService = new AfiliadoEmpresaService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        razaoSocial: yup.string()
          .required('Campo obrigatório'),
        nomeFantasia: yup.string()
          .required('Campo obrigatório'),
        cnpj: yup.string()
          .required('Campo obrigatório')
          .test('cnpj-validation', 'CNPJ inválido', valida.validaCNPJ),
        inscricaoEstadual: yup.string(),
        responsavel: yup.string(),
      }),
    });

    const enderecos = [];
    const contatos = [];
    const usuario = null;
    const [razaoSocial] = defineField('razaoSocial');
    const [nomeFantasia] = defineField('nomeFantasia');
    const [cnpj] = defineField('cnpj');
    const [inscricaoEstadual] = defineField('inscricaoEstadual');
    const [responsavel] = defineField('responsavel');

    return {
      router,
      toast,
      afiliadoEmpresaService,
      razaoSocial,
      nomeFantasia,
      cnpj,
      inscricaoEstadual,
      responsavel,
      enderecos,
      contatos,
      usuario,
      handleSubmit,
      errors,
    };
  },

  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/superadmin'
      },
      breadcrumbItems: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      enderecoValido: false,
      contatoValido: false,
      usuarioValido: false,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Nova Empresa' : 'Editar Empresa'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/superadmin/cadastros/empresas'
      },
      {
        label: 'Empresas',
        to: '/superadmin/cadastros/empresas'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const empresa = await this.afiliadoEmpresaService.get(id)

      this.id = empresa.id;
      this.razaoSocial = empresa.razaoSocial;
      this.nomeFantasia = empresa.nomeFantasia;
      this.cnpj = empresa.cnpj;
      this.responsavel = empresa.responsavel ?? '';

      const endereco = empresa.enderecos[0];

      if (endereco) {
        this.enderecos = [{
          id: endereco.id,
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          bairro: endereco.bairro,
          complemento: endereco.complemento,
          cidade: endereco.cidade,
          uf: endereco.uf,
          codigoIBGE: endereco.codigoIBGE,
        }]
      }
    }

    this.onSubmit = this.handleSubmit(async values => {

      if (!this.enderecoValido || !this.contatoValido || !this.usuarioValido) return;

      const body = {
        id: this.id,
        razaoSocial: values.razaoSocial,
        nomeFantasia: values.nomeFantasia,
        cnpj: values.cnpj,
        inscricaoEstadual: values.inscricaoEstadual,
        responsavel: values.responsavel,
        enderecos: this.enderecos,
        contatos: this.contatos,
        usuario: this.usuario
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.afiliadoEmpresaService.update(body)
        } else {
          await this.afiliadoEmpresaService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/superadmin/cadastros/empresas');
        }, 400);

      } catch (e) {
        this.toast.add({ severity: 'error', summary: e.message, detail: '', life: 3000 });
        this.loading = false;
      }

    });
  },

  methods: {
    updateEnderecos: function (endereco) {
      this.enderecos = endereco;
    },
    updateContatos: function (contatos) {
      this.contatos = contatos;
    },
    updateUsuario: function (usuario) {
      this.usuario = usuario;
    },
    submit: async function () {
      this.enderecoValido = await this.$refs.endereco.validate();
      this.contatoValido = await this.$refs.contato.validate();
      this.usuarioValido = this.id != 0 ? true : await this.$refs.usuario.validate();

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

          <Panel header="Dados Principais" toggleable class="mb-4">

            <div v-if="id">
              <h6 class="p-input-title">CÓDIGO: {{ this.id }}</h6>
            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title"><span class="p-error">*</span>CNPJ</h6>
                <InputMasked v-model="cnpj" :class="{ 'p-invalid': errors.cnpj }" mask="99.999.999/9999-99">
                </InputMasked>
                <small class="p-error" id="text-error">{{ errors.cnpj || '' }}</small>
              </div>

              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title">Inscrição Estadual</h6>
                <InputText v-model="inscricaoEstadual" :class="{ 'p-invalid': errors.inscricaoEstadual }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.inscricaoEstadual || '' }}</small>
              </div>

            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                <h6 class="p-input-title"><span class="p-error">*</span>Razão Social</h6>
                <InputText v-model="razaoSocial" :class="{ 'p-invalid': errors.razaoSocial }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.razaoSocial || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                <h6 class="p-input-title"><span class="p-error">*</span>Nome Fantasia</h6>
                <InputText v-model="nomeFantasia" :class="{ 'p-invalid': errors.nomeFantasia }" type="text" />
                <small class="p-error" id="text-error">{{ errors.nomeFantasia || '' }}</small>
              </div>

            </div>

          </Panel>

          <Enderecos :enderecos="enderecos" :updateEnderecos="updateEnderecos" ref="endereco"></Enderecos>
          <Contatos :contatos="contatos" :updateContatos="updateContatos" ref="contato"></Contatos>
          <Usuario v-if="id == 0" :usuario="usuario" :updateUsuario="updateUsuario" ref="usuario"></Usuario>

        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/superadmin/cadastros/empresas'">
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
