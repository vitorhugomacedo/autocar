<script>
import GrupoContabilService from '@/service/GrupoContabilService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "GrupoContabilCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const grupoContabilService = new GrupoContabilService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        descricao: yup.string()
          .required('Campo obrigatório'),
        tipo: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [descricao] = defineField('descricao');
    const [tipo] = defineField('tipo');

    return {
      router,
      toast,
      grupoContabilService,
      descricao,
      tipo,
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
      tipos: [{
        opcao: "RECEITA",
        id: "R"
      },
      {
        opcao: "DESPESA",
        id: "D"
      }],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo grupo contabil' : 'Editar grupo contabil'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/financeiro/cadastros/grupo-contabil'
      },
      {
        label: 'Grupo contábeis',
        to: '/financeiro/cadastros/grupo-contabil'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const grupoContabil = await this.grupoContabilService.get(id)

      this.id = grupoContabil.id;
      this.descricao = grupoContabil.descricao;
      this.tipo = grupoContabil.tipo;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        descricao: values.descricao,
        tipo: values.tipo,
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.grupoContabilService.update(body)
        } else {
          await this.grupoContabilService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/financeiro/cadastros/grupo-contabil');
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
                <h6 class="p-input-title">Tipo de Classificação</h6>
                <Dropdown v-model="tipo" editable :options="tipos" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione o Tipo de Classificação" class="w-full" :class="{ 'p-invalid': errors.tipo }"/>
                <small class="p-error" id="text-error">{{ errors.tipo || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/financeiro/cadastros/grupo-contabil'">
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
