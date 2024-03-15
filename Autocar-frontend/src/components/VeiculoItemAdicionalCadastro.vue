<script>
import VeiculoItemAdicionalService from '@/service/VeiculoItemAdicionalService';
import { useToast } from 'primevue/usetoast';

export default {
  name: "VeiculoItemAdicionalCadastro",
  components: {
  },
  props: {
    idVeiculo: {
      type: Number,
      default: 0
    },
  },
  setup() {
    const toast = useToast();

    const veiculoItemAdicionalService = new VeiculoItemAdicionalService();

    return {
      toast,
      veiculoItemAdicionalService,
    };
  },

  data() {
    return {
      itensAdicionais: [],
      loading: false,
      selecionados: []
    };
  },

  async mounted() {
    this.itensAdicionais = await this.veiculoItemAdicionalService.get(this.idVeiculo);
    this.selecionados = this.itensAdicionais.filter(x => x.selecionado).map(x => x.id);
    console.log(this.selecionados)
  },

  methods: {
    submit: async function () {

      const body = {
        idVeiculo: this.idVeiculo,
        idItensAdicionais: this.selecionados,
      }

      try {
        this.loading = true;

        await this.veiculoItemAdicionalService.save(body)

        this.toast.add({ severity: 'success', summary: 'Cadastro salvo com sucesso', detail: '', life: 3000 });
      } catch (e) {
        this.toast.add({ severity: 'error', summary: e.message, detail: '', life: 3000 });
      }

      this.loading = false;
    }
  },
};

</script>

<template>
  <ScrollPanel>
    <Toast />
<div class="flex flex-column justify-content-between">
  <div class="grid formgrid">
    <div class="col-12 mb-2 lg:col-2 lg:mb-2 md:col-5">
      <div v-for="itemAdicional of itensAdicionais" :key="itemAdicional.id" class="flex align-items-center">
        <Checkbox class="mr-2" v-model="selecionados" :inputId="itemAdicional.nome" name="itemAdicional"
          :value="itemAdicional.id" />
        <label :for="itemAdicional.nome">{{ itemAdicional.nome }}</label>
      </div>
    </div>
  </div>

  <div class="col-12 lg:col-12">
    <div class="grid formgrid p-fluid">
      <div class="flex field p-1 col-12 md:col-3" v-for="itemAdicional of itensAdicionais" :key="itemAdicional.id"> 
        <ToggleButton :value="itemAdicional.id" v-model="selecionados" :inputId="itemAdicional.nome" name="itemAdicional" onLabel="Locked" offLabel="" onIcon="pi pi-check"
          offIcon="fa-regular fa-ban" class="w-2rem h-2rem mr-2" aria-label="Do you confirm" />
          <div class="">
            <h6 class="" :for="itemAdicional.nome">{{ itemAdicional.nome }}</h6>
          </div>
      </div>
    </div>
  </div>
</div>
    <ScrollTop
        target="parent"
        :threshold="100"
        icon="pi pi-arrow-up"
        :pt="{
            root: 'w-2rem h-2rem border-round-sm bg-primary',
            icon: {
                class: 'text-base'
            }
        }"
    />
</ScrollPanel>
<div class="col-12 lg:col-12">
    <div class="grid formgrid p-fluid">
      <div class="col-12 flex justify-content-end md:col-12 sm:justify-content-center">
        <Button label="Salvar Itens Adicionais" icon="pi pi-save" class="p-button-sucess w-15rem" :loading="loading"
          raised @click="submit"></Button>
      </div>
    </div>
  </div>
</template>
