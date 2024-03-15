<script>
// import VeiculoService from '@/service/VeiculoService';
import Enderecos from '@/components/Enderecos.vue';
import Contatos from '@/components/Contatos.vue';
import TabControl from '@/components/TabControl.vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';

export default {

  name: "PessoaCadastro",
  components: {
    TabControl,
    Enderecos,
    Contatos,
  },
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [
        {
          label: 'Cadastros',
          to: '/cadastros/pessoas'
        },
        {
          label: 'Pessoas',
          to: '/cadastros/pessoas'
        },
        {
          label: 'Nova Pessoa',
          to: '#'
        }
      ],
      contatos: [],
      codigoPessoa: null,
      cnpj: null,
      cpf: null,
      status: true,
      tabAtiva: 0,
      tipoPessoa: null,
      statusPessoa: 'Ativo',
      formRegister: {

        tipoCadastro: [
          { name: 'Físico', code: 'F' },
          { name: 'Jurídica', code: 'J' }
        ],
        tipoCadastroValue: { name: 'Físico', code: 'F' },

        nacionalidade: [
          { name: 'Brasileiro(a)', code: 'B' },
          { name: 'Estrangeiro(a)', code: 'E' }
        ],
        nacionalidadeValue: { name: 'Brasileiro(a)', code: 'B' },

        tipoContribuinte: [
          { name: '1 - Contribuinte ICMS', code: 1 },
          { name: '2 - Contribuinte Isento', code: 2 },
          { name: '9 - Não Contribuinte (Pode ou não ter Inscrição Estadual)', code: 3 }
        ],
        tipoContribuinteValue: null,
      },
      frmRegisterpf: {
        attemptSubmit: false,

        //* Pesssoa Fisica */
        estadoCivil: [
          { name: 'Solteiro(a)', code: 1 },
          { name: 'Casado(a)', code: 2 },
          { name: 'Separado(a)', code: 3 },
          { name: 'Divorciado(a)', code: 4 },
          { name: 'Viúvo(a)', code: 4 },
        ],
        estadoCivilValue: null,

        sexo: [
          { name: 'Masculino', code: 1 },
          { name: 'Feminino', code: 2 },
          { name: 'Outro', code: 3 }
        ],
        sexoValue: null,
      },
      frmRegisterpj: {
        attemptSubmit: false,
        loadingCnpj: false,
        loadingValidCNPJ: false,

        /* Pesssoa Juridica */
        razaoSocial: null,
        tipoTributacao: [
          { name: '1 - MEI', code: 1 },
          { name: '2 - Simples Nacional', code: 2 },
          { name: '3 - Lucro Real', code: 3 },
          { name: '3 - Lucro Presumido', code: 4 }
        ],
        tipoTributacaoValue: null
      },
      tipoRenda: [
        { name: 'Salário', code: 1 },
        { name: 'Investimento', code: 2 },
        { name: 'Aluguel', code: 3 },
        { name: 'Dividendo', code: 4 },
        { name: 'Outro(a)', code: 5 }
      ],
      tipoRendaValue: { name: 'Salário', code: 1 },
      situacaoFuncionario: [
        { name: 'Ativo', code: 1 },
        { name: 'Inativo', code: 2 },
      ],
      situacaoFuncionarioValue: { name: 'Ativo', code: 1 },
      funcionarioAtivo: true,
      dataAdmissao: null,
      loading: false
    };
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    // const veiculoService = new VeiculoService();

    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        placa: yup.string()
          .required('Campo obrigatório')
      }),
    });

    const enderecos = [];
    const contatos = [];

    // const [placa] = defineField('placa');
    // const [renavam] = defineField('renavam');
    // const [idTipoVeiculo] = defineField('idTipoVeiculo');
    // const [idMarca] = defineField('idMarca');
    // const [idModelo] = defineField('idModelo');
    // const [idVeiculoCombustivel] = defineField('idVeiculoCombustivel');

    return {
      router,
      toast,
      // veiculoService,
      enderecos,
      contatos,
      handleSubmit,
      errors,
    };
  },

  async mounted() {
    this.isEdicao = true;
    this.titulo = !this.isEdicao ? 'Nova Pessoa' : 'Editar Pessoa';
    this.breadcrumbItems = [
      {
        label: 'Cadastros',
        to: '/cadastros/pessoas'
      },
      {
        label: 'Pessoas',
        to: '/cadastros/pessoas'
      },
      {
        label: this.titulo,
        to: '#'
      }
    ];

    const body = {
      enderecos: this.enderecos,
      contatos: this.contatos
    }

    const endereco = null;

    if (endereco) {
      this.enderecos = [{
        id: endereco.id,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        complemento: endereco.complemento,
        cidade: endereco.cidade,
        uf: endereco.uf,
        codigoIBGE: endereco.codigoIBGE,
      }]
    }

    // this.tipoVeiculos = await this.tipoVeiculoService.getOptions();

    if (this.isEdicao) {
      const id = this.router.currentRoute.value.params.id;
      // const veiculo = await this.veiculoService.get(id);
      // this.id = veiculo.id;
      // this.placa = veiculo.placa;
      // this.renavam = veiculo.renavam;
    }

    this.mountTabs();

    this.onSubmit = this.handleSubmit(async (values) => {
      const data = {
        id: this.id
      };

      try {
        this.loading = true;

        let result = null;
        // if (this.id) {
        //   await this.veiculoService.update(data);
        // }
        // else {
        //   result = await this.veiculoService.create(data);
        // }

        this.toast.add({ severity: 'success', summary: 'Pessoa salva com sucesso', detail: '', life: 3000 });
        setTimeout(() => {

          if (this.isEdicao) {
            this.router.push('/cadastros/pessoas');
          } else {
            this.id = result.id;
            this.isEdicao = true;
            this.router.push(`/cadastros/pessoas/editar/${result.id}`);
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
        { label: 'Dados Principais', icon: 'fa-regular fa-circle-user', blocked: false },
        { label: 'Cliente', icon: 'fa-regular fa-user-tag', blocked: !this.isEdicao },
        { label: 'Funcionário', icon: 'fa-regular fa-id-card-clip', blocked: !this.isEdicao },
        { label: 'Complemento', icon: 'fa-regular fa-address-card', blocked: !this.isEdicao },
      ];
    },
    onAdvancedUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    updateEnderecos: function (endereco) {
      this.enderecos = endereco;
    },
    updateContatos: function (contatos) {
      this.contatos = contatos;
    },
  },
  watch: {

  },
};
</script>

<template>
  <Toast />
  <div class="font-medium text-2xl text-color">Nova Pessoa</div>
  <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="flex flex-column md:flex-row gap-5 mb-5">
        <TabControl :tabs="tabItens" @tab="(tab) => tabAtiva = tab"></TabControl>

        <div class="card flex-1">
          <ScrollTop icon="pi pi-arrow-up" :pt="{
    root: 'w-2rem h-2rem border-round-sm',
    icon: { class: 'text-base' }
  }" />
          <TabMenu v-model:activeIndex="tabAtiva" :model="tabItens" :visible=false style="display: none;" />
          <div v-if="tabAtiva == 0">
            <div class="card flex flex-wrap lg:justify-content-center gap-4 sm:justify-content-start">
              <div class="flex align-items-center">
                <Checkbox v-model="tipoPessoa" inputId="tipoCliente" name="cliente" value="Cheese" />
                <label for="tipoCliente" class="ml-2 pr-4"> Cliente </label>
              </div>
              <div class="flex align-items-center">
                <Checkbox v-model="tipoPessoa" inputId="tipoFuncionario" name="funcionario" value="funcionario" />
                <label for="tipoFuncionario" class="ml-2 pr-4"> Funcionário </label>
              </div>
              <div class="flex align-items-center">
                <Checkbox v-model="tipoPessoa" inputId="tipoFornecedor" name="fornecedor" value="fornecedor" />
                <label for="tipoFornecedor" class="ml-2 pr-4"> Fornecedor </label>
              </div>
            </div>
            <div class="grid formgrid">
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Código</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>
              <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title" for="formRegister.tipoCadastro">Tipo de Cadastro</h6>
                <Dropdown v-model="formRegister.tipoCadastroValue" :options="formRegister.tipoCadastro"
                  optionLabel="name" placeholder="Selecione o Tipo de Pessoa" />
              </div>
            </div>
            <div class="tipo-cadastro" v-if="formRegister.tipoCadastroValue.code == 'F'">
              <form action="#" id="frmPessoaFisica">
                <div class="grid formgrid">
                  <div class="col-12 mb-2 xl:col-6 lg:col-12 lg:mb-2">
                    <h6 class="p-input-title">Nome Completo</h6>
                    <InputText type="text" placeholder="Digite o Nome..."></InputText>
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">CPF</h6>
                    <InputText type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false"></InputText>
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">Data de Nascimento</h6>
                    <InputText type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false"></InputText>
                  </div>
                </div>
                <div class="grid formgrid">
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">RG</h6>
                    <InputText type="text" placeholder="" />
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">Orgão Emissor</h6>
                    <InputText type="text" placeholder="" />
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title" for="nacionalidade">Nacionalidade</h6>
                    <Dropdown v-model="formRegister.nacionalidadeValue" :options="formRegister.nacionalidade"
                      optionLabel="name" placeholder="Selecione..." />
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title" for="estadoCivil">Sexo</h6>
                    <Dropdown v-model="frmRegisterpf.sexoValue" :options="frmRegisterpf.sexo" optionLabel="name"
                      placeholder="Selecione..." />
                  </div>
                </div>
              </form>
            </div>
            <div class="tipo-cadastro" v-if="formRegister.tipoCadastroValue.code == 'J'">
              <form action="#" id="frmPessoaJuridica">
                <div class="grid formgrid">
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">CNPJ</h6>
                    <InputNumber v-model="cnpj" type="text" placeholder="" inputId="withoutgrouping"
                      :useGrouping="false">
                    </InputNumber>
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title">Inscrição Estadual</h6>
                    <InputNumber type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false">
                    </InputNumber>
                  </div>

                </div>
                <div class="grid formgrid">
                  <div class="col-12 mb-2 xl:col-6 lg:col-12 lg:mb-2">
                    <h6 class="p-input-title">Razão Social</h6>
                    <InputText type="text" placeholder=""></InputText>
                  </div>
                  <div class="col-12 mb-2 xl:col-6 lg:col-12 lg:mb-2">
                    <h6 class="p-input-title">Nome Fantasia</h6>
                    <InputText type="text" placeholder="" />
                  </div>
                </div>
                <div class="grid formgrid">
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title" for="tipoCliente">Tipo de Contribuição</h6>
                    <Dropdown v-model="formRegister.tipoContribuinteValue" :options="formRegister.tipoContribuinte"
                      optionLabel="name" placeholder="Selecione o Tipo..." />
                  </div>
                  <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2">
                    <h6 class="p-input-title" for="tipoTributacao">Regime Tributário</h6>
                    <Dropdown v-model="frmRegisterpj.tipoTributacaoValue" :options="frmRegisterpj.tipoTributacao"
                      optionLabel="name" placeholder="Selecione o Tipo..." />
                  </div>
                </div>
                <div class="grid formgrid">
                </div>
              </form>
            </div>
            <Divider />
            <Enderecos :enderecos="enderecos" :updateEnderecos="updateEnderecos" ref="endereco"></Enderecos>
            <Divider />
            <Contatos :contatos="contatos" :updateContatos="updateContatos" ref="contato"></Contatos>
          </div>
          <div v-if="tabAtiva == 1">
            <div class="font-medium text-xl text-color mb-4">Dados Complementares</div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                <h6 class="p-input-title">Nome da Mãe</h6>
                <InputText type="text" placeholder="" />
              </div>
              <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                <h6 class="p-input-title">Nome do Pai</h6>
                <InputText type="text" placeholder="" />
              </div>
            </div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title">Profissão</h6>
                <InputText type="text" placeholder="" />
              </div>
              <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                <h6 class="p-input-title" for="estadoCivil">Estado Cívil</h6>
                <Dropdown v-model="frmRegisterpf.estadoCivilValue" :options="frmRegisterpf.estadoCivil"
                  optionLabel="name" placeholder="Selecione..." />
              </div>

            </div>
            <Divider />
            <div class="font-medium text-xl text-color mb-4">Fontes de Renda</div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2 md:col-12 sm:col-12">
                <h6 class="p-input-title">Tipo de Renda</h6>
                <Dropdown v-model="tipoRendaValue" :options="tipoRenda" optionLabel="name"
                  placeholder="Selecione o Tipo de Renda" />
              </div>
              <div class="col-12 mb-2 xl:col-5 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Local / Empresa / Renda</h6>
                <InputText type="text" v-model="renavam" placeholder="" :class="{ 'p-invalid': errors.renavam }"
                  inputId="withoutgrouping" :useGrouping="false"></InputText>
                <small class="p-primary" id="text-error">{{ errors.renavam || '' }}</small>
              </div>
              <div class="col-12 mb-2 xl:col-4 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Valor Renda R$</h6>
                <div class="p-inputgroup">
                  <InputText type="text" v-model="placa" placeholder="">
                  </InputText>
                  <Button icon="pi pi-plus" label="Incluir" severity="primary" aria-label="Incluir" />
                </div>
              </div>
              <div class="col-12">
                <DataTable :value="registros" class="p-datatable backgroud-color-white mt-4" style="min-height: 100%;"
                  :rows="5" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
                  <template v-if="!loading" #empty>Nenhuma renda cadastrada. </template>

                  <template #loading>
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                  </template>
                  <Column field="tipoRenda" header="Tipo de Renda" bodyClass="text-left" style="min-width: 2rem">

                    <template #body="{ data }">
                      <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
                    </template>
                  </Column>
                  <Column field="descricao" header="Descrição" style="min-width: 12rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="valorRenda" header="Valor da Renda" style="min-width: 4rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 4rem">

                    <template #body="{ data }">
                      <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text
                          rounded
                          @click="showTemplate(data.id, `Deseja realmente excluir o tipo de veiculo ${data.descricao}?`)"></Button>
                    </template>
                  </Column>

                  <template #footer>
                    <h6 class="">Renda total de R$2.500,00</h6>
                  </template>
                </DataTable>
              </div>
            </div>
          </div>
          <div v-if="tabAtiva == 2">
            <div class="font-medium text-xl text-color mb-4">Informações do Funcionário</div>
            <div class="grid formgrid">
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Código</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Nº CTPS</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>
              <div class="col-12 mb-2 xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-6">
                <h6 class="p-input-title" for="estadoCivil">Situação</h6>
                <Dropdown v-model="situacaoFuncionarioValue" :options="situacaoFuncionario" optionLabel="name"
                  placeholder="Selecione..." />
              </div>
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-6">
                <h6 class="p-input-title">Data de Admissão</h6>
                <Calendar v-model="dataAdmissao" sowButtonBar showIcon showButtonBar iconDisplay="input" inputId="dataAdmissao" />
              </div>
            </div>
            <div class="grid formgrid">
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Cargo</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>

              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Salário Fixo R$</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>
              <div class="col-12 mb-2  xl:col-3 lg:col-6 lg:mb-2 md:col-6 sm:col-12">
                <h6 class="p-input-title">Comissão %</h6>
                <InputNumber type="text" placeholder=""></InputNumber>
              </div>
              <div class="col-12 mb-2 xl:col-3 lg:col-6 md:col-6 sm:col-6">
                <h6 class="p-input-title">Vendedor</h6>
                <InputSwitch v-model="funcionarioAtivo" />
              </div>
            </div>
            <Divider />
            <div class="font-medium text-xl text-color mb-4">Histórico do Funcionário</div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 xl:col-12 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Descrição</h6>
                <div class="p-inputgroup">
                  <InputText type="text" v-model="placa" placeholder="">
                  </InputText>
                  <Button icon="pi pi-plus" label="Incluir" severity="primary" aria-label="Incluir" />
                </div>
              </div>
              <div class="col-12">
                <DataTable :value="registros" class="p-datatable backgroud-color-white mt-4" style="min-height: 100%;"
                  :rows="5" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
                  <template v-if="!loading" #empty>Nenhuma renda cadastrada. </template>

                  <template #loading>
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                  </template>
                  <Column field="dataHistorico" header="Data Histórico" bodyClass="text-left" style="min-width: 2rem">

                    <template #body="{ data }">
                      <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
                    </template>
                  </Column>
                  <Column field="descricao" header="Descrição" style="min-width: 12rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 4rem">

                    <template #body="{ data }">
                      <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text
                          rounded
                          @click="showTemplate(data.id, `Deseja realmente excluir o tipo de veiculo ${data.descricao}?`)"></Button>
                    </template>
                  </Column>
                  <template #footer></template>
                </DataTable>
              </div>
            </div>
          </div>
          <div v-if="tabAtiva == 3">
            <div class="font-medium text-xl text-color mb-4">Observações de Venda</div>
            <div class="grid formgrid">
              <div class="col-12 mb-2 xl:col-12 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Descrição</h6>
                <div class="p-inputgroup">
                  <InputText type="text" v-model="placa" placeholder="">
                  </InputText>
                  <Button icon="pi pi-plus" label="Incluir" severity="primary" aria-label="Incluir" />
                </div>
              </div>
              <div class="col-12">
                <DataTable :value="registros" class="p-datatable backgroud-color-white mt-4" style="min-height: 100%;"
                  :rows="5" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
                  <template v-if="!loading" #empty>Nenhuma renda cadastrada. </template>

                  <template #loading>
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                  </template>
                  <Column field="dataHistorico" header="Data Histórico" bodyClass="text-left" style="min-width: 2rem">

                    <template #body="{ data }">
                      <span style="vertical-align: middle" class="image-text">{{ data.id }}</span>
                    </template>
                  </Column>
                  <Column field="descricao" header="Descrição" style="min-width: 12rem">

                    <template #body="{ data }">
                      {{ data.descricao }}
                    </template>
                  </Column>
                  <Column field="Edit" header="" dataType="boolean" bodyClass="text-right" style="min-width: 4rem">

                    <template #body="{ data }">
                      <Button v-tooltip.top="'Excluir'" icon="pi pi-trash" class="p-button-rounded p-button-text" text
                          rounded
                          @click="showTemplate(data.id, `Deseja realmente excluir o tipo de veiculo ${data.descricao}?`)"></Button>
                    </template>
                  </Column>
                  <template #footer></template>
                </DataTable>
              </div>
            </div>
            <Divider/>
              <div class="grid formgrid">
                <div class="col-12 mb-2 xl:col-12 lg:col-12 lg:mb-2 md:col-12">
                <h6 class="p-input-title">Observações Gerais</h6>
                <div class="p-inputgroup">
                  <Textarea v-model="value" rows="5" cols="30" />
                </div>
              </div>
              </div>
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
        <Button label="Salvar" icon="pi pi-save" class="p-button-sucess mr-4" :loading="loading" raised
          @click="submit"></Button>
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
