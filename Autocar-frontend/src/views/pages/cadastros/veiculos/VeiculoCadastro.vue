<script>
import VeiculoService from '@/service/VeiculoService';
import TipoVeiculoService from '@/service/TipoVeiculoService';
import MarcaService from '@/service/MarcaService';
import ModeloService from '@/service/ModeloService';
import CombustivelService from '@/service/VeiculoCombustivelService';
import TabControl from '@/components/TabControl.vue';
import VeiculoItemAdicionalCadastro from '@/components/VeiculoItemAdicionalCadastro.vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {

  name: "VeiculoCadastro",
  components: {
    TabControl,
    VeiculoItemAdicionalCadastro
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [],
      tabAtiva: 0,
      tabItens: [],
      titulo: "",
      isEdicao: false,
      id: 0,
      onSubmit: null,
      tipoVeiculos: [],
      marcas: [],
      modelos: [],
      combustiveis: [],
      loading: false
    };
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const veiculoService = new VeiculoService();
    const tipoVeiculoService = new TipoVeiculoService();
    const marcaService = new MarcaService();
    const modeloService = new ModeloService();
    const combustvelService = new CombustivelService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        placa: yup.string()
          .required('Campo obrigatório'),
        renavam: yup.string()
          .required('Campo obrigatório'),
        idTipoVeiculo: yup.string()
          .required('Campo obrigatório'),
        idMarca: yup.string()
          .required('Campo obrigatório'),
        idModelo: yup.string()
          .required('Campo obrigatório'),
        idVeiculoCombustivel: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [placa] = defineField('placa');
    const [renavam] = defineField('renavam');
    const [idTipoVeiculo] = defineField('idTipoVeiculo');
    const [idMarca] = defineField('idMarca');
    const [idModelo] = defineField('idModelo');
    const [idVeiculoCombustivel] = defineField('idVeiculoCombustivel');

    return {
      router,
      toast,
      veiculoService,
      tipoVeiculoService,
      marcaService,
      modeloService,
      combustvelService,
      placa,
      renavam,
      idTipoVeiculo,
      idMarca,
      idModelo,
      idVeiculoCombustivel,
      handleSubmit,
      errors,
    };
  },

  async mounted() {
    this.isEdicao = this.router.currentRoute.value.fullPath.includes('editar');
    this.titulo = !this.isEdicao ? 'Novo Veículo' : 'Editar Veículo';
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/cadastros/veiculos'
      },
      {
        label: 'Veículos',
        to: '/cadastros/veiculos'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ];

    this.tipoVeiculos = await this.tipoVeiculoService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;
      const veiculo = await this.veiculoService.get(id);
      this.id = veiculo.id;
      this.placa = veiculo.placa;
      this.renavam = veiculo.renavam;
    }

    this.mountTabs();

    this.onSubmit = this.handleSubmit(async (values) => {
      const data = {
        id: this.id,
        placa: values.placa,
        renavam: values.renavam,
        idTipoVeiculo: values.idTipoVeiculo,
        idMarca: values.idMarca,
        idModelo: values.idModelo,
        idVeiculoCombustivel: values.idVeiculoCombustivel,
      };

      try {
        this.loading = true;

        let result = null;
        if (this.id) {
          await this.veiculoService.update(data);
        }
        else {
          result = await this.veiculoService.create(data);
        }

        this.toast.add({ severity: 'success', summary: 'Veículo salvo com sucesso', detail: '', life: 3000 });
        setTimeout(() => {

          if (this.isEdicao) {
            this.router.push('/cadastros/veiculos');
          } else {
            this.id = result.id;
            this.isEdicao = true;
            this.router.push(`/cadastros/veiculos/editar/${result.id}`);
            this.mountTabs();
          }
        }, 400);

        this.loading = false;
      }
      catch (e) {
        this.toast.add({ severity: 'error', summary: e.message, detail: '', life: 3000 });
        this.loading = false;
      }
    });
  },
  computed: {},
  methods: {
    submit: async function () {
      this.onSubmit();
    },

    mountTabs: function () {
      this.tabItens = [
        { label: 'Dados Iniciais', icon: 'pi pi-car', blocked: false },
        { label: 'Consignação', icon: 'pi pi-sync', blocked: !this.isEdicao },
        { label: 'Itens Adicionais', icon: 'pi pi-list', blocked: !this.isEdicao },
        { label: 'Despesas / Débitos', icon: 'pi pi-dollar', blocked: !this.isEdicao },
        { label: 'Anexos', icon: 'pi pi-file', blocked: !this.isEdicao },
        { label: 'Checklist', icon: 'pi pi-check-circle', blocked: !this.isEdicao },
      ];
    },
    onAdvancedUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
  },
  watch: {
    idTipoVeiculo: async function () {
      this.marcas = await this.marcaService.getOptions({ idTipoVeiculo: this.idTipoVeiculo });
      this.combustiveis = await this.combustvelService.getOptions({ idTipoVeiculo: this.idTipoVeiculo });
    },
    idMarca: async function () {
      this.modelos = await this.modeloService.getOptions({ idMarca: this.idMarca });
    }
  },
};
</script>

<template>
  <Toast />
  <div class="font-medium text-2xl text-color">Novo Veículo</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="flex flex-column md:flex-row gap-5 mb-5">
        <TabControl :tabs="tabItens" @tab="(tab) => tabAtiva = tab"></TabControl>

        <div class="card flex-1">
          <TabMenu v-model:activeIndex="tabAtiva" :model="tabItens" :visible=false style="display: none;" />
          <div v-if="tabAtiva == 0">

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-3 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Placa <small style="color: #ff7200;">*</small></h6>
                <InputText type="text" v-model="placa" placeholder="" :class="{ 'p-invalid': errors.placa }">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.placa || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-3 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Renavan <small style="color: #ff7200;">*</small></h6>
                <InputText type="text" v-model="renavam" placeholder="" :class="{ 'p-invalid': errors.renavam }"
                  inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
            </div>

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-8 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Descrição <small style="color: #ff7200;">*</small></h6>
                <InputText type="text" v-model="placa" placeholder="" :class="{ 'p-invalid': errors.placa }">
                </InputText>
                <small class="p-error" id="text-error">{{ errors.placa || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Tipo de Veículo <small style="color: #ff7200;">*</small></h6>
                <Dropdown v-model="idTipoVeiculo" editable :options="tipoVeiculos" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione o tipo de veículo" class="w-full"
                  :class="{ 'p-invalid': errors.idTipoVeiculo }" />
                <small class="p-error" id="text-error">{{ errors.idTipoVeiculo || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Marca <small style="color: #ff7200;">*</small></h6>
                <Dropdown v-model="idMarca" editable :options="marcas" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione a marca" class="w-full" :class="{ 'p-invalid': errors.idMarca }" />
                <small class="p-error" id="text-error">{{ errors.idMarca || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Modelo <small style="color: #ff7200;">*</small></h6>
                <Dropdown v-model="idModelo" editable :options="modelos" optionLabel="opcao" optionValue="id"
                  placeholder="Selecione o modelo" class="w-full" :class="{ 'p-invalid': errors.idModelo }" />
                <small class="p-error" id="text-error">{{ errors.idModelo || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4">
                <h6 class="p-input-title">Combustível <small style="color: #ff7200;">*</small></h6>
                <Dropdown v-model="idVeiculoCombustivel" editable :options="combustiveis" optionLabel="opcao"
                  optionValue="id" placeholder="Selecione tipo de combustível" class="w-full"
                  :class="{ 'p-invalid': errors.idVeiculoCombustivel }" />
                <small class="p-error" id="text-error">{{ errors.idVeiculoCombustivel || '' }}</small>
              </div>
            </div>
            <div class="grid formgrid">

            </div>

            <!-- 
            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-8 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Descrição do Veículo <small style="color: #ff7200;">*</small></h6>
                <InputText type="text" v-model="descricao" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-2 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Ano Fabricação</h6>
                <InputText type="text" v-model="anoFabricacao" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-2 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Ano Modelo</h6>
                <InputText type="text" v-model="anoModelo" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
            </div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-8 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Descrição do Veículo <small style="color: #ff7200;">*</small></h6>
                <InputText type="text" v-model="descricao" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-2 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Ano Fabricação</h6>
                <InputText type="text" v-model="anoFabricacao" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-2 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Ano Modelo</h6>
                <InputText type="text" v-model="anoModelo" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
            </div>

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Valor Compra R$</h6>
                <InputText type="text" v-model="valorCompra" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Margem de Lucro %</h6>
                <InputText type="text" v-model="lucroPercentual" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Lucro em R$</h6>
                <InputText type="text" v-model="lucroLiquido" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
            </div>

            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Valor Venda R$</h6>
                <InputText type="text" v-model="valorVenda" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Valor Troca R$</h6>
                <InputText type="text" v-model="valorTroca" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 lg:col-4 lg:mb-2 md:col-6">
                <h6 class="p-input-title">Despesas Totais R$</h6>
                <InputText type="text" v-model="despesasTotais" placeholder="" :class="{ 'p-invalid': errors.renavam }" inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
            </div> -->
          </div>

          <div v-if="tabAtiva == 1">
            <p>1</p>
          </div>
          <KeepAlive>
            <VeiculoItemAdicionalCadastro v-if="tabAtiva == 2" :idVeiculo="id"></VeiculoItemAdicionalCadastro>
          </KeepAlive>
          <div v-if="tabAtiva == 3">
            <div class="grid formgrid">
              <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2 md:col-12 sm:col-12">
                <h6 class="p-input-title">Código</h6>
                <div class="p-inputgroup">
                  <InputText type="text" v-model="placa" placeholder="" :class="{ 'p-invalid': errors.placa }">
                  </InputText>
                  <Button icon="pi pi-search" severity="primary" aria-label="Buscar" />
                </div>
              </div>
              <div class="col-12 mb-2 xl:col-5 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Descrição</h6>
                <InputText type="text" v-model="renavam" placeholder="" :class="{ 'p-invalid': errors.renavam }"
                  inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-error" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 xl:col-4 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Valor Despesa R$</h6>
                <div class="p-inputgroup">
                  <InputText type="text" v-model="placa" placeholder="" :class="{ 'p-invalid': errors.placa }">
                  </InputText>
                  <Button icon="pi pi-plus" label="Incluir" severity="primary" aria-label="Incluir" />
                </div>
              </div>
              <div class="col-12">
                <DataTable :value="registros" class="p-datatable backgroud-color-white mt-4" style="min-height: 100%;"
                  :rows="5" dataKey="id" :rowHover="true" filterDisplay="menu" :loading="loading"
                  responsiveLayout="scroll">
                  <template v-if="!loading" #empty>Nenhuma despesa cadastrada. </template>

                  <template #loading>
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                  </template>
                  <Column field="id" header="Cód." bodyClass="text-left" style="min-width: 2rem">

                    <template #body="{ data }">
                      <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
                    </template>
                  </Column>
                  <Column field="descricao" header="Descrição" style="min-width: 12rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="descricao" header="Valor da Despesa" style="min-width: 4rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 4rem">

                    <template #body="{ data }">
                      <div v-if="data.editavel">
                        <router-link :to="`/cadastros/tipos-veiculos/editar/${data.id}`">
                          <Button v-tooltip.top="'Editar'" icon="pi pi-user-edit" class="p-button-rounded p-button-text"
                            text rounded></Button>
                        </router-link>

                        <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text
                          rounded
                          @click="showTemplate(data.id, `Deseja realmente excluir o tipo de veiculo ${data.descricao}?`)"></Button>
                      </div>
                    </template>
                  </Column>

                  <template #footer> </template>
                </DataTable>
              </div>
            </div>
          </div>
          <div v-if="tabAtiva == 4">
  
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toolbar>

    <template v-slot:start>
      <router-link :to="'/cadastros/veiculos'">
        <Button label="Voltar" icon="pi pi-undo" class="p-button-secondary mr-2"></Button>
      </router-link>
    </template>

    <template v-slot:end>
      <div class="my-2">
        <Button label="Salvar" icon="pi pi-save" class="p-button-sucess mr-4" :loading="loading" raised @click="submit"></Button>
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.dock-demo>.dock-window {
  width: 100%;
  height: 450px;
  position: relative;
  background-image: url("https://primefaces.org/cdn/primevue/images/dock/window.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

.dock-demo>.p-dock {
  z-index: 1000;
}
</style>
