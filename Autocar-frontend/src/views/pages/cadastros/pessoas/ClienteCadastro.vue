<!-- <script>
import { ref, onMounted } from 'vue';
import NodeService from '@/service/NodeService';
import { stringifyQuery } from 'vue-router';
import { useRouter } from 'vue-router';

const treeSelectNodes = ref(null);
const nodeService = new NodeService();
const router = useRouter();

onMounted(() => {
  nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});

export default {
  name: "ClienteCadastro",
  data() {
    return {
      breadcrumbHome: {
        icon: 'pi pi-home',
        to: '/'
      },
      breadcrumbItems: [
        {
          label: 'Cadastros',
          to: '/cadastros/clientes'
        },
        {
          label: 'Clientes',
          to: '/cadastros/clientes'
        },
        {
          label: 'Novo Cliente',
          to: '#'
        }
      ],
      codigoPessoa: null,
      cnpj: null,
      cpf: null,
      status: true,
      statusCliente: 'Ativo',
      formRegister: {

        tipoCadastro: [
          { name: 'Físico', code: 'F' },
          { name: 'Jurídico', code: 'J' }
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
      loading: false
    };
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    formInput: function (value) {
      // Define um padrão para estrutura de cada input do formulário
      this.value = value !== undefined ? value : "";
    },
    openNew: function () {
      router.push('/cadastros/pessoas/cadastro');
    },
  },
  watch: {
    "formRegister.tipoCadastroValue": function (val) {
    }
  }
};
</script>
<template>
  <div class="font-medium text-2xl text-color">Novo Cliente</div>
  <Breadcrumb :title="breadcrumbTitle" :home="breadcrumbHome" :model="breadcrumbItems" />
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <Panel header="Dados Principais" toggleable>
          <div class="grid formgrid">
            <div class="col-6 mb-2 lg:col-2 lg:mb-2">
              <h6 class="p-input-title">Código</h6>
              <InputNumber type="text" placeholder=""></InputNumber>
            </div>
            <div class="col-6 mb-2 lg:col-4 lg:mb-2">
              <h6 class="p-input-title" for="tipoCliente">Tipo do Cliente</h6>
              <Dropdown v-model="formRegister.tipoCadastroValue" :options="formRegister.tipoCadastro" optionLabel="name"
                placeholder="Selecione o Tipo do Cliente" />
            </div>
          </div>
          <div class="tipo-cadastro" v-if="formRegister.tipoCadastroValue.code == 'F'">
            <form action="#" id="frmPessoaFisica">
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
              <div class="grid formgrid">
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title">RG</h6>
                  <InputText type="text" placeholder="" />
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title">Orgão Emissor</h6>
                  <InputText type="text" placeholder="" />
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title" for="nacionalidade">Nacionalidade</h6>
                  <Dropdown v-model="formRegister.nacionalidadeValue" :options="formRegister.nacionalidade"
                    optionLabel="name" placeholder="Selecione..." />
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title" for="estadoCivil">Sexo</h6>
                  <Dropdown v-model="frmRegisterpf.sexoValue" :options="frmRegisterpf.sexo" optionLabel="name"
                    placeholder="Selecione..." />
                </div>
              </div>
              <h5 class="mt-4">Complemento</h5>
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
                  <h6 class="p-input-title" for="estadoCivil">Estado Cívil</h6>
                  <Dropdown v-model="frmRegisterpf.estadoCivilValue" :options="frmRegisterpf.estadoCivil"
                    optionLabel="name" placeholder="Selecione..." />
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title">Profissão</h6>
                  <InputText type="text" placeholder="" />
                </div>
              </div>
            </form>
          </div>
          <div class="tipo-cadastro" v-if="formRegister.tipoCadastroValue.code == 'J'">
            <form action="#" id="frmPessoaJuridica">
              <div class="grid formgrid">
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title">CNPJ</h6>
                  <InputNumber v-model="cnpj" type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false">
                  </InputNumber>
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title">Inscrição Estadual</h6>
                  <InputNumber type="text" placeholder="" inputId="withoutgrouping" :useGrouping="false"></InputNumber>
                </div>

              </div>
              <div class="grid formgrid">
                <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                  <h6 class="p-input-title">Razão Social</h6>
                  <InputText type="text" placeholder=""></InputText>
                </div>
                <div class="col-12 mb-2 lg:col-6 lg:mb-2">
                  <h6 class="p-input-title">Nome Fantasia</h6>
                  <InputText type="text" placeholder="" />
                </div>
              </div>
              <div class="grid formgrid">
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title" for="tipoCliente">Tipo de Contribuição</h6>
                  <Dropdown v-model="formRegister.tipoContribuinteValue" :options="formRegister.tipoContribuinte"
                    optionLabel="name" placeholder="Selecione o Tipo..." />
                </div>
                <div class="col-12 mb-2 lg:col-3 lg:mb-2">
                  <h6 class="p-input-title" for="tipoTributacao">Regime Tributário</h6>
                  <Dropdown v-model="frmRegisterpj.tipoTributacaoValue" :options="frmRegisterpj.tipoTributacao"
                    optionLabel="name" placeholder="Selecione o Tipo..." />
                </div>
              </div>
              <div class="grid formgrid">
              </div>
            </form>
          </div>
        </Panel>
        <Panel class="mt-3" header="Endereços" collapsed toggleable>

        </Panel>
        <Panel class="mt-3" header="Contatos" collapsed toggleable>

        </Panel>
        <Panel class="mt-3" header="Documentos" collapsed toggleable>

        </Panel>
      </div>
      <Toolbar>
        <template v-slot:start>
          <router-link :to="'/cadastros/clientes/'">
            <Button label="Voltar" icon="pi pi-undo" class="p-button-secondary mr-2"></Button>
          </router-link>
        </template>
        <template v-slot:end>
          <div class="my-2">
            <Button label="Salvar" icon="pi pi-save" class="p-button-sucess mr-4" :loading="loading" raised @click=""></Button>
          </div>
        </template>
      </Toolbar>
    </div>
  </div>
</template> -->
