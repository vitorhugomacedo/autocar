<script>
import ItemAdicionalService from '@/service/ItemAdicionalService';
import TipoVeiculoService from '@/service/TipoVeiculoService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "ItemAdicionalCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const itemAdicionalService = new ItemAdicionalService();
    const tipoVeiculoService = new TipoVeiculoService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        nome: yup.string()
          .required('Campo obrigatório'),
        idTipoVeiculo: yup.number()
          .required('Campo obrigatório'),
      }),
    });

    const [nome] = defineField('nome');
    const [idTipoVeiculo] = defineField('idTipoVeiculo');

    return {
      router,
      toast,
      itemAdicionalService,
      tipoVeiculoService,
      nome,
      idTipoVeiculo,
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
      tipoVeiculos: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo item adicional' : 'Editar item adicional'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/cadastros/itens-adicionais'
      },
      {
        label: 'Itens Adicionais',
        to: '/cadastros/itens-adicionais'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    this.tipoVeiculos = await this.tipoVeiculoService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const itemAdicional = await this.itemAdicionalService.get(id)

      this.id = itemAdicional.id;
      this.nome = itemAdicional.nome;
      this.idTipoVeiculo = itemAdicional.tipoVeiculo.id;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        nome: values.nome,
        idTipoVeiculo: values.idTipoVeiculo,
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.itemAdicionalService.update(body)
        } else {
          await this.itemAdicionalService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/cadastros/itens-adicionais');
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

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-6">
                <h6 class="p-input-title">Tipo de Veículo</h6>
                <Dropdown v-model="idTipoVeiculo" editable :options="tipoVeiculos" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione o tipo de veículo" class="w-full" :class="{ 'p-invalid': errors.idTipoVeiculo }" />
                <small class="p-error" id="text-error">{{ errors.idTipoVeiculo || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/cadastros/itens-adicionais'">
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
