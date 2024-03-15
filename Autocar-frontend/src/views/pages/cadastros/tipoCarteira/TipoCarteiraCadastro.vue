<script>
import TipoCarteiraService from '@/service/TipoCarteiraService';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {
  name: "TipoCarteiraCadastro",
  components: {
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const tipoCarteiraService = new TipoCarteiraService();

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
      tipoCarteiraService,
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
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      loading: false
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');

    this.titulo = !this.isEdicao ? 'Novo tipo de carteira' : 'Editar tipo de carteira'
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/financeiro/cadastros/tipo-carteira'
      },
      {
        label: 'Tipos de Carteiras',
        to: '/financeiro/cadastros/tipo-carteira'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ]

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;

      const tipoCarteira = await this.tipoCarteiraService.get(id)

      this.id = tipoCarteira.id;
      this.descricao = tipoCarteira.descricao;
    }

    this.onSubmit = this.handleSubmit(async values => {

      const body = {
        id: this.id,
        descricao: values.descricao,
      }

      try {
        this.loading = true;

        if (this.id) {
          await this.tipoCarteiraService.update(body)
        } else {
          await this.tipoCarteiraService.create(body)
        }

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {
          this.router.push('/financeiro/cadastros/tipo-carteira');
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

              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title">Descrição</h6>
                <InputText v-model="descricao" :class="{ 'p-invalid': errors.descricao }" type="text">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.descricao || '' }}</small>
              </div>

            </div>

          </Panel>
        </form>
      </div>

      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/financeiro/cadastros/tipo-carteira'">
            <Button label="Voltar" icon="pi pi-undo" class="p-button-info mr-2" raised></Button>
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
