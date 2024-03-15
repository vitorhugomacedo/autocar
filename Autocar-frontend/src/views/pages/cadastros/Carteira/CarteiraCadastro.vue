<script>
import CarteiraService from '@/service/CarteiraService';
import TipoCarteiraService from '@/service/TipoCarteiraService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "CarteiraCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const carteiraService = new CarteiraService();
    const tipoCarteiraService = new TipoCarteiraService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        descricao: yup.string()
          .required('Campo obrigatório'),
        saldoInicial: yup.number()
          .required('Campo obrigatório'),
        periodoInicial: yup.string()
          .required('Campo obrigatório'),
        periodoFinal: yup.string()
          .required('Campo obrigatório'),
        idTipoCarteira: yup.number()
          .required('Campo obrigatório'),
      }),
    });

    const [descricao] = defineField('descricao');
    const [saldoInicial] = defineField('saldoInicial');
    const [periodoInicial] = defineField('periodoInicial');
    const [periodoFinal] = defineField('periodoFinal');
    const [idTipoCarteira] = defineField('idTipoCarteira');

    return {
      router,
      toast,
      tipoCarteiraService,
      carteiraService,
      descricao,
      saldoInicial,
      periodoInicial,
      periodoFinal,
      idTipoCarteira,
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
      tipoCarteiras: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Nova carteira' : 'Editar carteira'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/financeiro/cadastros/carteira'
      },
      {
        label: 'Carteiras',
        to: '/financeiro/cadastros/carteira'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    this.tipoCarteiras = await this.tipoCarteiraService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const carteira = await this.carteiraService.get(id)

      this.id = carteira.id;
      this.descricao = carteira.descricao;
      this.saldoInicial = carteira.saldoInicial;
      this.periodoInicial = carteira.periodoInicial;
      this.periodoFinal = carteira.periodoFinal;
      this.idTipoCarteira = carteira.tipoCarteira.id;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        descricao: values.descricao,
        saldoInicial: values.saldoInicial,
        periodoInicial: values.periodoInicial,
        periodoFinal: values.periodoFinal,
        idTipoCarteira: values.idTipoCarteira
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.carteiraService.update(body)
        } else {
          await this.carteiraService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/financeiro/cadastros/carteira');
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
                <h6 class="p-input-title">Descrição</h6>
                <InputText v-model="descricao" :class="{ 'p-invalid': errors.descricao }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.descricao || '' }}</small>
              </div>

            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-6">
                <h6 class="p-input-title">Tipo de Carteira</h6>
                <Dropdown v-model="idTipoCarteira" editable :options="tipoCarteiras" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione o Tipo de Carteira" class="w-full" :class="{ 'p-invalid': errors.idTipoCarteira }"/>
                <small class="p-error" id="text-error">{{ errors.idTipoCarteira || '' }}</small>
              </div>

            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-3">
                <h6 class="p-input-title">Período Inicial</h6>
                <Calendar v-model="periodoInicial" showIcon :showOnFocus="false" />
                <small class="p-error" id="text-error">{{ errors.periodoInicial || '' }}</small>
              </div>

              <div class="col-12 mb-2 lg:col-3">
                <h6 class="p-input-title">Período Final</h6>
                <Calendar v-model="periodoFinal" showIcon :showOnFocus="false" />
                <small class="p-error" id="text-error">{{ errors.periodoFinal || '' }}</small>
              </div>

            </div>

            <div class="grid formgrid">

              <div class="col-12 mb-2 lg:col-3">
                <h6 class="p-input-title">Saldo Inicial</h6>
                <InputNumber v-model="saldoInicial" inputId="minmaxfraction" :minFractionDigits="2"
                  :maxFractionDigits="2" />
                <small class="p-error" id="text-error">{{ errors.saldoInicial || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/financeiro/cadastros/carteira'">
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
