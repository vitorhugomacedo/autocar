<script>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
  props: ["contatos", "updateContatos"],
  name: "Contatos",
  setup() {
    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        tipoContato: yup.object()
          .required('Campo obrigatório'),
        valor: yup.string()
          .required('Campo obrigatório'),
        responsavel: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [tipoContato] = defineField('tipoContato');
    const [valor] = defineField('valor');
    const [responsavel] = defineField('responsavel');

    return {
      tipoContato,
      valor,
      responsavel,
      handleSubmit,
      errors,
    };
  },

  data() {
    return {
      tiposContatos: [
        { name: 'Celular', code: 0 },
        { name: 'Telefone', code: 1 },
        { name: 'E-mail', code: 2 },
        { name: 'WhatsApp', code: 3 }],
        tipoContato: { name: 'Celular', code: 0 },
      listaContatos: [],
      onSubmit: null,
    }
  },

  mounted() {
    this.onSubmit = this.handleSubmit(async values => { 
      this.listaContatos.push({
        id: 0,
        tipoContato: values.tipoContato.code,
        valor: values.valor,
        responsavel: values.responsavel,
      });

      this.tipoContato = null;
      this.valor = null;
      this.responsavel = null;
     });

    this.listaContatos = this.contatos
  },

  methods: {
    adicionarContato: function () {
      this.onSubmit()
      this.updateContatos(this.listaContatos);
    },
    validate: async function () {
      this.valid = true
      await this.onSubmit()

      return this.valid;
    }
  }
}
</script>

<template>
  <Panel header="Contatos" toggleable class="mb-4">

    <div class="grid formgrid">
      <div class="col-12 mb-2 lg:col-3">
        <h6 class="p-input-title">Tipo de contato</h6>
        <Dropdown v-model="tipoContato" :options="tiposContatos" optionLabel="name" :class="{ 'p-invalid': errors.tipoContato }"/>
        <small class="p-error" id="text-error">{{ errors.tipoContato || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-3">
        <h6 class="p-input-title">Contato</h6>
        <InputMasked v-model="valor" mask="(99) 99999-9999" :class="{ 'p-invalid': errors.valor }"></InputMasked>
        <small class="p-error" id="text-error">{{ errors.valor || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-5">
        <h6 class="p-input-title">Responsável</h6>
        <InputText type="text" v-model="responsavel" :class="{ 'p-invalid': errors.responsavel }"></InputText>
        <small class="p-error" id="text-error">{{ errors.responsavel || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-1" style="display: flex; align-items: end;">
        <Button icon="pi pi-plus" @click="adicionarContato"></Button>
      </div>
    </div>

    <DataTable :value="listaContatos" class="p-datatable backgroud-color-white mt-4" :rows="5" dataKey="id"
      :rowHover="true" filterDisplay="menu" responsiveLayout="scroll"
      :globalFilterFields="['name', 'typeclient.name', 'representative.name', 'balance', 'status']">
      <template v-if="!loading" #empty>Nenhuma contato cadastrado. </template>
      <Column field="id" header="Cód." bodyClass="text-left" style="min-width: 6rem">
        <template #body="{ data }">
          <span style="vertical-align: middle">{{ data.id }}</span>
        </template>
      </Column>
      <Column field="tipoContato" header="Tipo de Contato" style="min-width: 6rem">
        <template #body="{ data }">
          {{ data.tipoContato }}
        </template>
      </Column>
      <Column field="valor" header="Número / E-mail" style="min-width: 6rem">
        <template #body="{ data }">
          {{ data.valor }}
        </template>
      </Column>
      <Column field="responsavel" header="Responsável" bodyClass="text-left" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.responsavel }}
        </template>
      </Column>
      <Column field="Edit" header="" dataType="boolean" bodyClass="text-center" style="min-width: 4rem">
        <template #body="{ data }">
          <div>
            <router-link :to="`/superadmin/cadastros/empresas/editar/${data.id}`">
              <Button icon="pi pi-user-edit" class="p-button-rounded p-button-text" text rounded></Button>
            </router-link>
          </div>
        </template>
      </Column>
      <template #footer> </template>
    </DataTable>
  </Panel>
</template>
