<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
// import ClienteService from '@/service/ClienteService';
import formatacaoService from '@/service/FormatacaoService';
import Filtros from '@/components/Filtros.vue'

// onBeforeMount(() => {
//   productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
//   customerService.getCustomersLarge().then((data) => {
//     clientes.value = data;
//     loading1.value = false;
//     clientes.value.forEach((customer) => (customer.date = new Date(customer.date)));
//   });
//   customerService.getCustomersLarge().then((data) => (customer2.value = data));
//   customerService.getCustomersMedium().then((data) => (customer3.value = data));
//   loading2.value = false;
// });

export default {
  name: "PessoasLista",
  components: {
    Filtros
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [{
        label: 'Cadastros',
        to: '/cadastros/pessoas'
      },
      {
        label: 'Pessoas',
        to: '/cadastros/pessoas'
      }],
      filters: [],
      // clienteService: null,
      // clientes: [],
      loading1: null,
      filters1: null,
      loading: true,
      formatacaoService: null
    }
  },
  async beforeMount() {

    this.formatacaoService = formatacaoService;
    this.loading = true;
    // this.clienteService = new ClienteService();
    // this.clientes = await this.clienteService.getAll();

    this.loading = false;
  },
  methods: {

  }
}

</script>

<template>
  <div class="font-medium text-2xl text-color">Pessoas</div>
  <Breadcrumb :title="breadcrumbTitle" :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <Button label="Exportar" raised outlined icon="pi pi-upload" class="p-button-help mr-4"
              @click="exportCSV($event)" />
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Importar" chooseLabel="Importar"
              class="p-button-info" />
          </template>
          <template v-slot:end>
            <div class="my-2">
              <router-link :to="'/cadastros/pessoas/novo'">
                <Button label="Novo" icon="pi pi-plus" class="p-button-primary mr-2"></Button>
              </router-link>
            </div>
          </template>
        </Toolbar>

        <Filtros>
          <template #container>
            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                <h6 class="p-input-title">Nome Completo</h6>
                <InputText type="text" placeholder="Digite o Nome..."></InputText>
              </div>
              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title">CPF</h6>
                <InputText type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false"></InputText>
              </div>
              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title">Data de Nascimento</h6>
                <InputText type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false"></InputText>
              </div>
            </div>
          </template>
        </Filtros>
      
        <DataTable :value="pessoas" :paginator="true" sortMode="multiple"
          class="p-datatable backgroud-color-white" :rows="5" dataKey="id" :rowHover="true"
          filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
          <template v-if="!loading" #empty>Nenhuma pessoa encontrada.</template>
          <template #loading> 
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </template>
          <Column field="idPessoa" header="Cód." bodyClass="text-right" style="min-width: 6rem">
            <template #body="{ data }">
              <span style="vertical-align: middle" class="image-text">{{ data.idPessoa }}</span>
            </template>
          </Column>
          <Column field="Nome" header="Nome / Razão Social" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.pessoa.razaoSocial }}
            </template>
          </Column>
          <Column field="Documento" header="CPF / CNPJ" bodyClass="text-left" style="min-width: 8rem">
            <template #body="{ data }">
              <!-- {{ formatacaoService.formatarDocumento(data.pessoa.documento) }} -->
            </template>
          </Column>
          <Column header="Tipo" filterField="typeclient" :showFilterMatchModes="false"
            :filterMenuStyle="{ width: '6rem' }" style="min-width: 6rem">
            <template #body="{ data }">
              <span style="vertical-align: middle" class="image-text">{{ data.tipo == 0 ? "Físico" : "Jurídico" }}</span>
            </template>
          </Column>
          <!-- <Column field="Email" header="E-Mail" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
          </Column> -->
          <!-- <Column field="Telefone" header="Contato" bodyClass="text-left" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.contato }}
            </template>
          </Column> -->
          <Column field="Ativo" header="Status" dataType="boolean" bodyClass="text-left" style="min-width: 4rem">
            <template #body="{ data }">
              <div v-if="data.ativo">
                <Tag class="mr-2 ml-2" style="width: 3rem" severity="success" value="Ativo"></Tag>
              </div>
              <div v-if="!data.ativo">
                <Tag class="mr-2 ml-2" style="width: 3rem" severity="danger" value="Inativo"></Tag>
              </div>
            </template>
          </Column>
          <Column field="Edit" header="" dataType="boolean" bodyClass="text-center" style="min-width: 4rem">
            <template #body="{ data }">
              <div>
                <Button icon="pi pi-user-edit" class="p-button-rounded p-button-text" text rounded />
              </div>
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
