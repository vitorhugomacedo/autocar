<script>
import AfiliadoEmpresaService from '@/service/AfiliadoEmpresaService';
import Filtros from '@/components/Filtros.vue'

export default {
  name: "EmpresasCadastro",
  components: {
    Filtros
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/superadmin'
      },
      breadcrumbItems: [{
        label: 'Cadastros',
        to: '/superadmin/cadastros/empresas'
      },
      {
        label: 'Empresas',
        to: '/superadmin/cadastros/empresas'
      }],
      afiliadoEmpresaService: null,
      empresas: [],
      loading: true
    }
  },
  async beforeMount() {
    this.loading = true;

    this.afiliadoEmpresaService = new AfiliadoEmpresaService();
    this.empresas = await this.afiliadoEmpresaService.getAll();

    this.loading = false;
  },
}

</script>

<template>
  <div class="font-medium text-2xl text-color">Empresas</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:end>
            <div class="my-2">
              <router-link :to="'/superadmin/cadastros/empresas/novo'">
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

        <DataTable :value="empresas" :paginator="true" class="p-datatable backgroud-color-white" :rows="5" dataKey="id" :rowHover="true"
          filterDisplay="menu" :loading="loading" responsiveLayout="scroll"
          :globalFilterFields="['name', 'typeclient.name', 'representative.name', 'balance', 'status']">
          <template v-if="!loading" #empty>Nenhuma empresa encontrada. </template>
          <template #loading>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </template>
          <Column field="id" header="Cód." bodyClass="text-right" style="min-width: 6rem">
            <template #body="{ data }">
              <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
            </template>
          </Column>
          <Column field="razaoSocial" header="Razão Social" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.razaoSocial }}
            </template>
          </Column>
          <Column field="nomeFantasia" header="Nome Fantasia" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.nomeFantasia }}
            </template>
          </Column>
          <Column field="cnpj" header="CNPJ" bodyClass="text-left" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.cnpj }}
            </template>
          </Column>
          <Column field="inscricaoEstadual" header="Inscrição Estadual" bodyClass="text-left" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.inscricaoEstadual }}
            </template>
          </Column>
          <Column field="inscricaoMunicipal" header="Inscrição Municipal" bodyClass="text-left" style="min-width: 6rem">
            <template #body="{ data }">
              {{ data.inscricaoMunicipal }}
            </template>
          </Column>
          <Column field="ativo" header="Status" dataType="boolean" bodyClass="text-center" style="min-width: 4rem">
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
                <router-link :to="`/superadmin/cadastros/empresas/editar/${data.id}`">
                  <Button icon="pi pi-user-edit" class="p-button-rounded p-button-text" text rounded></Button>
                </router-link>
              </div>
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
