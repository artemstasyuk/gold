<template>
  <v-text-field
    v-model="innerValue"
    :label="$props.label"
    v-bind="$attrs"
    :error-messages="$props.errorMessages"
    :disabled="$props.disabled"
    @focus="canEdit = false"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import cyrillicToTranslit from 'cyrillic-to-translit-js/dist/bundle.js';

@Component({
  name: 'Transliterator',

  props: {
    value: String,
    label: String,
    errorMessages: [String, Array],
    disabled: {
      type: Boolean,
      default: false
    },
    valueForTransliterating: String
  }
})
export default class Transliterator extends Vue {
  canEdit: boolean = false

  beforeMount () {
    if (!this.$route.params.id) {
      this.canEdit = true;
    }
  }

  @Watch('valueForTransliterating')
  onValueForTransliteratingChanged (value: string) {
    if (this.canEdit) {
      const tempValue = cyrillicToTranslit().transform(value, '-').replace(/[^\da-z-]/gi, '').toLowerCase();

      this.$emit('input', tempValue);
    }
  }

  @Watch('innerValue')
  onInnerValueChanged (value: string) {
    if (!value) {
      this.canEdit = true;
    }
  }

  set innerValue (value: string) {
    this.$emit('input', value);
  }

  get innerValue () {
    return this.$props.value;
  }
}
</script>
