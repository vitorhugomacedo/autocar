<script>
import EnderecoService from '@/service/EnderecoService';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
  props: ["enderecos", "updateEnderecos", "multiplo"],
  name: "Enderecos",
  setup() {
    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        cep: yup.string()
          .required('Campo obrigatório'),
        logradouro: yup.string()
          .required('Campo obrigatório'),
        numero: yup.string()
          .required('Campo obrigatório'),
        bairro: yup.string()
          .required('Campo obrigatório'),
        complemento: yup.string(),
        cidade: yup.string()
          .required('Campo obrigatório'),
        uf: yup.string()
          .required('Campo obrigatório'),
      }),
    });

    const [cep] = defineField('cep');
    const [logradouro] = defineField('logradouro');
    const [numero] = defineField('numero');
    const [bairro] = defineField('bairro');
    const [complemento] = defineField('complemento');
    const [cidade] = defineField('cidade');
    const [uf] = defineField('uf');

    return {
      cep,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      uf,
      handleSubmit,
      errors,
    };
  },

  data() {
    return {
      id: 0,
      codigoIBGE: "",
      listaEnderecos: [],
      onSubmit: null,
      valid: false
    }
  },

  mounted() {
    if (!this.multiplo) {
      this.onSubmit = this.handleSubmit(async values => { this.valid = true });
      const endereco = this.enderecos[0]

      if (endereco) {
        this.id = endereco.id;
        this.cep = endereco.cep;
        this.logradouro = endereco.logradouro;
        this.numero = endereco.numero;
        this.bairro = endereco.bairro;
        this.complemento = endereco.complemento;
        this.cidade = endereco.cidade;
        this.uf = endereco.uf;
        this.codigoIBGE = endereco.codigoIBGE;
      }
    }
    else {
      this.listaEnderecos = this.enderecos
    }
  },

  methods: {

    handleBuscaCEP: async function () {

      const cep = this.cep.replace(/[^0-9]/g, '');
      if (cep.length < 8) return;

      const enderecoService = new EnderecoService();
      const endereco = await enderecoService.buscaCEP(cep.replace("-", ""));

      this.logradouro = endereco.logradouro;
      this.numero = endereco.numero;
      this.bairro = endereco.bairro;
      this.complemento = endereco.complemento;
      this.cidade = endereco.localidade;
      this.uf = endereco.uf;
      this.codigoIBGE = endereco.ibge;

      this.handleKeyup()
    },
    handleKeyup: function () {
      if (!this.multiplo) {
        this.updateEnderecos([
          {
            cep: this.cep,
            logradouro: this.logradouro,
            numero: this.numero,
            bairro: this.bairro,
            complemento: this.complemento,
            cidade: this.cidade,
            uf: this.uf,
            codigoIBGE: this.codigoIBGE,
          }
        ])
      }
    },
    addAddress: function () {
      this.updateEnderecos(this.listaEnderecos);
    },
    validate: async function () {
      this.valid = false
      await this.onSubmit()

      return this.valid;
    }
  },

  watch: {
    enderecos: function () {
      if (!this.multiplo) {
        const endereco = this.enderecos[0]

        if (endereco) {
          this.id = endereco.id;
          this.cep = endereco.cep;
          this.logradouro = endereco.logradouro;
          this.numero = endereco.numero;
          this.bairro = endereco.bairro;
          this.complemento = endereco.complemento;
          this.cidade = endereco.cidade;
          this.uf = endereco.uf;
          this.codigoIBGE = endereco.codigoIBGE;
        }
      }
      else {
        this.listaEnderecos = this.enderecos
      }
    }
  }
}
</script>

<template>
  <Panel header="Endereços" toggleable class="mb-4">

    <div class="grid formgrid">
      <div class="col-6 mb-2 lg:col-3">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-primary">*</span>CEP</h6>
        <InputMasked v-model="cep" mask="99999-999" :class="{ 'p-invalid': errors.cep }" @keyup="handleBuscaCEP"></InputMasked>
        <small class="p-error" id="text-error">{{ errors.cep || '' }}</small>
      </div>
    </div>

    <div class="grid formgrid">
      <div class="col-12 mb-2 lg:col-10">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-error">*</span>Logradouro</h6>
        <InputText type="text" v-model="logradouro" :class="{ 'p-invalid': errors.logradouro }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.logradouro || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-2">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-error">*</span>Número</h6>
        <InputText type="text" v-model="numero" :class="{ 'p-invalid': errors.numero }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.numero || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-3">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-error"></span>Bairro</h6>
        <InputText type="text" v-model="bairro" :class="{ 'p-invalid': errors.bairro }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.bairro || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-3">
        <h6 class="p-input-title">Complemento</h6>
        <InputText type="text" v-model="complemento" :class="{ 'p-invalid': errors.complemento }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.complemento || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-4">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-error">*</span>Cidade</h6>
        <InputText type="text" v-model="cidade" disabled :class="{ 'p-invalid': errors.cidade }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.cidade || '' }}</small>
      </div>
      <div class="col-12 mb-2 lg:col-2">
        <h6 class="p-input-title"><span v-if="!multiplo" class="p-error">*</span>UF</h6>
        <InputText type="text" v-model="uf" disabled :class="{ 'p-invalid': errors.uf }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.uf || '' }}</small>
      </div>
    </div>
  </Panel>
</template>
