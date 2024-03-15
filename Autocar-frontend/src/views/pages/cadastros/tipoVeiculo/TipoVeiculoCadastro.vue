<script>
import TipoVeiculoService from '@/service/TipoVeiculoService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "TipoVeiculoCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const tipoVeiculoService = new TipoVeiculoService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        nome: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [nome] = defineField('nome');

    return {
      router,
      toast,
      tipoVeiculoService,
      nome,
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
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo tipo de Veículo' : 'Editar tipo de Veículo'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/cadastros/tipos-veiculos'
      },
      {
        label: 'Tipos de Veículos',
        to: '/cadastros/tipos-veiculos'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const tipoVeiculo = await this.tipoVeiculoService.get(id)

      this.id = tipoVeiculo.id;
      this.nome = tipoVeiculo.nome;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        nome: values.nome,
      }

      try {
        this.loading = true;
        debugger;
        if (this.id) {
          await this.tipoVeiculoService.update(body)
        } else {
          await this.tipoVeiculoService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/cadastros/tipos-veiculos');
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

          <Panel header="Dados Principais" toggleable class="mb-4">

            <div v-if="id">
              <h6 class="p-input-title">CÓDIGO: {{ this.id }}</h6>
            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-6">
                <h6 class="p-input-title">Nome</h6>
                <InputText v-model="nome" :class="{ 'p-invalid': errors.nome }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.nome || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/cadastros/tipos-veiculos'">
            <Button label="Voltar" icon="pi pi-undo" class="p-button-secondary mr-2" raised></Button>
          </router-link>
        </template>
        <template v-slot:end>
          <div class="my-2">
            <Button label="Salvar" icon="pi pi-save" class="p-button-sucess mr-4" :loading="loading" raised @click="submit"></Button>
          </div>
        </template>
      </Toolbar>
    </div>
  </div>
</template>
