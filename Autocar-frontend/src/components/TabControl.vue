<script>

export default {
  name: "TabControl",
  props: {
    tabs: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      tabAtiva: 0
    };
  },

  methods: {
    changeTab: function(tab, index) {
      if (!tab.blocked) {
        this.tabAtiva = index;
        this.$emit('tab', this.tabAtiva);
      }
    }
  }
};
</script>

<style scoped>
  .disabled {
    cursor: none;
    background: #eee;
    color: #ccc;
  }
</style>

<template>
  <div class="card mb-0 md:w-18rem">
    <ul class="list-none m-0 p-0">
      <li v-for="(tab, index) in tabs" class="mb-2" @click="changeTab(tab, index)">
        <span class="p-ripple flex align-items-center cursor-pointer select-none p-3 transition-colors transition-duration-150 border-round" 
          :class="{'bg-primary': tabAtiva == index, 'hover:surface-hover': tabAtiva != index, 'disabled': tab.blocked }" data-pd-ripple="true">
          <i class="mr-2 text-lg" :class="tab.icon"></i><span>{{ tab.label }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
