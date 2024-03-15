<script>

export default {
  props: {
    modelValue: "",
    mask: {
      type: String,
      default: ""
    },
  },
  name: "InputMasked",
  emits: ['update:modelValue', 'keyup'],
  data() {
    return {
      dynamicMask: "",
      value: "",
      ctrlDown: false
    }
  },

  mounted() {
    this.value = this.modelValue || "";

    const mask = this.mask.substring(0, this.value.length + 1);
    this.dynamicMask = mask.length == 1 ? '9' : mask;
  },

  methods: {
    onKeyUp(e) {
      this.$emit('keyup', e);
      if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = false;
    },

    onKeyDown(e) {
      if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = true;

      if (this.ctrlDown && (e.keyCode == 86)) {
        this.value = '';
        this.dynamicMask = this.mask;
      }
    }
  },

  watch: {
    value: function () {

      this.$emit('update:modelValue', this.value);

      const value = this.value.replace(/[^0-9]/g, '')
      const simbolos = this.mask.substring(0, this.value.length + 1).replace(/[0-9]/g, '')

      const mask = this.mask.substring(0, value.length + simbolos.length + 1);
      this.dynamicMask = mask.length == 1 ? '9' : mask;
    },

    modelValue: function () {
      this.value = this.modelValue || "";
      
      const mask = this.mask.substring(0, this.value.length + 1);
      this.dynamicMask = mask.length == 1 ? '9' : mask;
    }
  }
}

</script>

<template>
  <InputMask v-model="value" slotChar="" :mask="dynamicMask" @keyup="onKeyUp" :autoClear="false" @keydown="onKeyDown" />
</template>
