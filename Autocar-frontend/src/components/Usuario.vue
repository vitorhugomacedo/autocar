<script>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
  props: ["usuario", "updateUsuario"],
  name: "Usuario",
  setup() {
    const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        nome: yup.string()
          .required('Campo obrigatório'),
        email: yup.string()
          .required('Campo obrigatório')
          .email('E-mail inválido'),
        senha: yup.string()
          .required('Campo obrigatório')
          .length(6, 'Deve conter pelo menos 6 dígitos'),
      }),
    });

    const [nome] = defineField('nome');
    const [email] = defineField('email');
    const [senha] = defineField('senha');

    return {
      nome,
      email,
      senha,
      handleSubmit,
      errors,
    };
  },

  data() {
    return {
      onSubmit: null,
      valid: false
    }
  },

  mounted() {
    this.onSubmit = this.handleSubmit(async values => { this.valid = true });

    if (this.usuario != null) {
      this.nome = this.usuario.nome;
      this.email = this.usuario.email;
      this.senha = this.usuario.senha;
    }
  },

  methods: {

    handleKeyup: function () {
      this.updateUsuario(
        {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        })
    },

    validate: async function () {
      this.valid = false
      await this.onSubmit()

      return this.valid;
    }
  },

  watch: {
    usuario: function () {

      if (this.usuario.nome != null) {
        this.nome = this.usuario.nome;
        this.email = this.usuario.email;
        this.senha = this.usuario.senha;
      }
    }
  }
}
</script>

<template>
  <Panel header="Usuário" toggleable class="mb-4">

    <div class="grid formgrid">
      <div class="col-12 mb-2 lg:col-5 lg:mb-2">
        <h6 class="p-input-title"><span class="p-error">*</span>Responsável</h6>
        <InputText type="text" v-model="nome" :class="{ 'p-invalid': errors.nome }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.nome || '' }}</small>
      </div>

      <div class="col-12 mb-2 lg:col-4 lg:mb-2">
        <h6 class="p-input-title"><span class="p-error">*</span>E-mail</h6>
        <InputText type="text" v-model="email" :class="{ 'p-invalid': errors.email }" @keyup="handleKeyup"></InputText>
        <small class="p-error" id="text-error">{{ errors.email || '' }}</small>
      </div>

      <div class="col-12 mb-2 lg:col-3 lg:mb-2">
        <h6 class="p-input-title"><span class="p-error">*</span>Senha</h6>
        <!-- <InputText type="text" v-model="senha" :class="{ 'p-invalid': errors.senha }" @keyup="handleKeyup"></InputText> -->
        <Password v-model="senha" promptLabel="Digite sua senha..." weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte" :class="{ 'p-invalid': errors.senha }" @keyup="handleKeyup"/>
        <small class="p-error" id="text-error">{{ errors.senha || '' }}</small>
      </div>
    </div>

  </Panel>
</template>
