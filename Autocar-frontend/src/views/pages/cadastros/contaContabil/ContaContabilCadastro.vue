<script>
import ContaContabilService from '@/service/ContaContabilService';
import GrupoContabilService from '@/service/GrupoContabilService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "ContaContabilCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const contaContabilService = new ContaContabilService();
    const grupoContabilService = new GrupoContabilService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        descricao: yup.string()
          .required('Campo obrigatório'),
        idGrupoContabil: yup.number()
          .required('Campo obrigatório'),
      }),
    });

    const [descricao] = defineField('descricao');
    const [idGrupoContabil] = defineField('idGrupoContabil');

    return {
      router,
      toast,
      contaContabilService,
      grupoContabilService,
      descricao,
      idGrupoContabil,
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
      gruposContabeis: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Nova conta contabil' : 'Editar conta contabil'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/financeiro/cadastros/conta-contabil'
      },
      {
        label: 'Conta contábeis',
        to: '/financeiro/cadastros/conta-contabil'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    this.gruposContabeis = await this.grupoContabilService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const contaContabil = await this.contaContabilService.get(id)

      this.id = contaContabil.id;
      this.descricao = contaContabil.descricao;
      this.idGrupoContabil = contaContabil.grupoContabil.id;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        descricao: values.descricao,
        idGrupoContabil: values.idGrupoContabil,
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.contaContabilService.update(body)
        } else {
          await this.contaContabilService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/financeiro/cadastros/conta-contabil');
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
                <h6 class="p-input-title">Grupo Contábil</h6>
                <Dropdown v-model="idGrupoContabil" editable :options="gruposContabeis" optionLabel="opcao"
                  optionValue="id" placeholder="Selecione o Grupo Contábil" class="w-full" :class="{ 'p-invalid': errors.idGrupoContabil }"/>
                <small class="p-error" id="text-error">{{ errors.idGrupoContabil || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/financeiro/cadastros/conta-contabil'">
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
