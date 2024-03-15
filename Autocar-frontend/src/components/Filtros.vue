<script>
export default {
  name: "Filtros",
  props: {
    filters: {
      type: Array,
      default: []
    },
    updateFilter: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      fields: [],
      options: [],
      values: []
    }
  },
  mounted() {
    if (!this.fields?.length && this.filters?.length)
        this.fields = [this.filters]
  },
  methods: {
    changed: function (index) {
      this.values[index] = null
    },

    addNewFilter: function () {
      this.fields.push(this.filters)
    },

    removeFilter: function (index) {
      this.fields.splice(index, 1)
      this.options.splice(index, 1)
      this.values.splice(index, 1)
    },

    search: function () {
      this.updateFilter(this.result)
    }
  },

  computed: {

    result: function () {

      const result = {};
      const properties = this.options.map(x => x.property)
      const values = this.values.map(x => x)

      for (var i = 0; i < properties.length; i++) {
        if (values[i]) {
          result[properties[i]] = values[i];
        }
      }

      return result;
    }
  },

  watch: {
    filters: function () {
      if (!this.fields?.length && this.filters?.length)
        this.fields = [this.filters]
    },
  }
}
</script>

<template>
  <div v-if="fields?.length">
    <span class="text-md text-900 font-bold">Filtros</span>
    <div class="col-12 md:col-12">
      <slot name="container">
        <div v-for="(field, index) in fields" :key="field.field">
          <div v-if="filters?.length" class="grid formgrid">
            <div class="col-12 mb-2 lg:col-3">
              <Dropdown v-model="options[index]" :options="filters" optionLabel="field" placeholder="Selecione uma opção"
                class="w-full" @change="changed(index)" />
            </div>

            <div class="col-12 mb-2 lg:col-5">
              <div v-if="options[index] && options[index].type == 'multiselect'">
                <MultiSelect v-model="values[index]" :options="options[index].options" optionLabel="opcao"
                  optionValue="id" :maxSelectedLabels="3" class="w-full" />
              </div>
              <div v-else>
                <InputText type="text" v-model="values[index]" style="width: 100%;"/>
              </div>
            </div>

            <div class="col-12 mb-2 lg:col-1 flex justify-content-start">
                <Button v-tooltip.top="'Excluir'" icon="pi pi-filter-slash" class="p-button" text
                  :disabled="index == 0 && fields.length == 1" @click="removeFilter(index)">
                </Button>
            </div>
            <div v-if="index == 0" class="col-12 mb-2 lg:col-3 flex justify-content-end">
              <Button v-tooltip.top="'Adicionar'" label="" icon="fa-regular fa-filters" class="p-button mr-3 w-4rem"
                @click="addNewFilter">
              </Button>
              <Button v-tooltip.top="'Buscar'" label="Buscar" icon="pi pi-search" class="p-button w-15rem"
                @click="search">
              </Button>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
