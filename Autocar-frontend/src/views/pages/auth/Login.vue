<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import LoginService from '@/service/LoginService';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const loginService = new LoginService();
const router = useRouter();

const logoUrl = computed(() => {
  return `layout/images/${layoutConfig.darkTheme.value ? 'LOGO-AUTOCAR-BRANCA' : 'LOGO-AUTOCAR-PRETA'}.png`;
});

  const logar = async () => {
    await loginService.authenticate(email.value, password.value)

    const auth = JSON.parse(localStorage.getItem('auth'));

    const route = auth.tipoUsuario === 1 ? '/superadmin' : '/dashboard';

    router.push(route)
}
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex align-items-center justify-content-center">
      <div class="left">
        <div class="w-full surface-card py-7 p-7 px-7 sm:px-8" style="border-radius: 10px">
          <div class="text-center mb-5">
            <img :src="logoUrl" alt="AutoCarLogo" class="mb-5 w-20rem flex-shrink-0" />
          </div>
          <div>
            <label for="email1" class="block text-700 text-x font-medium mb-2">E-mail</label>
            <InputText id="email1" type="text" placeholder="Digite seu e-mail..." class="w-full md:w-30rem mb-5"
              style="padding: .8rem" v-model="email" />

            <label for="password1" class="block text-700 font-medium text-x mb-2">Senha</label>
            <Password id="password1" v-model="password" placeholder="Digite sua senha..." :feedback="false"
              :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '.8rem' }"></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Lembrar senha</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)">Esqueceu sua senha?</a>
            </div>
            <Button label="Entrar" class="w-full mt-5 mb-4 p-3 text-xl" @click="logar"></Button>
            <div class="text-center mb-0 mt-4">
              <span class="text-600 font-medium line-height-3">Ainda não tem conta?</span>
              <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Cadastre-se!</a>
            </div>
          </div>
          </div>
          <div class="copyright mt-6 align-items-center justify-content-center" style="padding: 0 30px 30px 30px;">
            <div class="text-center text-color-secondary">2021 - 2024 © Auto Car - Sistema de Gestão para Revendas de Veículos</div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}</style>
