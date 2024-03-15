<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import LoginService from '@/service/LoginService';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const password2 = ref('');
const checked = ref(false);
const loginService = new LoginService();
const router = useRouter();

const logoUrl = computed(() => {
  return `layout/images/${layoutConfig.darkTheme.value ? 'LOGO-AUTOCAR-BRANCA' : 'LOGO-AUTOCAR-PRETA'}.png`;
});

</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
          <img :src="logoUrl" alt="Auto Car Logo" class="mb-5 w-14rem flex-shrink-0" />
          <div>
              <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                  <div class="text-center mb-5">
                      <div class="text-900 text-3xl font-medium mb-3">Bem vindo(a), Teste!</div>
                      <span class="text-600 font-medium">Cadastre uma nova senha para acessar ao sistema:</span>
                  </div>

                  <div>
                      <label for="password" class="block text-900 font-medium text-xl mb-2">Nova senha</label>
                      <Password id="password" v-model="password" placeholder="Digite sua senha..." weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte" promptLabel="Digite a senha..." :toggleMask="true" class="w-full mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                      <label for="password2" class="block text-900 font-medium text-xl mb-2">Confirme a senha</label>
                      <Password id="password2" v-model="password2" placeholder="Digite novamente..." :feedback="false" :toggleMask="true" class="w-full mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                      <Button label="Cadastrar Senha" class="w-full p-3 text-xl"></Button>
                  </div>
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
