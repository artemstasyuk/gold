<template>
  <v-switch
    v-model="model"
    v-bind="$attrs"
    color="primary"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  name: 'BooleanSelect',
  props: {
    value: Boolean
  }
})
export default class VtSwitch extends Vue {
  get model () {
    return this.$props.value;
  }

  set model (value) {
    this.$emit('input', value);
  }
}
</script>

<style scoped></style>
