<template>
  <v-layout
    :class="componentClasses"
    wrap
  >
    <v-flex
      v-if="withLabel"
      xs3
    >
      <v-subheader :class="labelClasses">
        <v-icon v-if="icon">
          {{ icon }}
        </v-icon>
        <v-spacer />
        <slot name="label">
          {{ label }}
        </slot>
        <span
          v-if="required"
          class="error--text"
        ><sup>*</sup></span>
      </v-subheader>
    </v-flex>
    <v-flex
      xs12
      :class="withoutHelp ? 'sm9' : 'sm5'"
    >
      <slot name="component-slot">
        <component
          :is="component"
          v-bind="$attrs"
          :label="componentLabel"
          :error-messages="errorMessages"
          v-on="$listeners"
        />
      </slot>
    </v-flex>
    <v-flex
      v-if="!withoutHelp"
      xs12
      sm4
      class="align-self-center"
    >
      <slot />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VTextField, VTextarea, VCheckbox, VRadioGroup, VSelect, VAutocomplete } from 'vuetify/lib';

@Component({
  name: 'FormField',
  inheritAttrs: false,
  props: {
    label: String,
    icon: String,
    component: {
      type: String,
      default: 'v-text-field'
    },
    required: Boolean,
    withoutHelp: Boolean,
    errorMessages: [String, Array]
  },
  components: { VTextField, VTextarea, VCheckbox, VRadioGroup, VSelect, VAutocomplete } // need "register" vuetify ui
})
export default class FormFieldWrapper extends Vue {
  get withLabel () {
    return this.$vuetify.breakpoint.smAndUp;
  }

  get componentLabel () {
    return !this.withLabel ? this.$props.label : null;
  }

  get labelClasses () {
    const { required } = this.$props;
    return ['text-right', 'mt-2', required && 'black--text'];
  }

  get componentClasses () {
    return ['form-field', this.$props.errorMessages && 'hasError'];
  }
}
</script>

<style></style>
