<template>
  <v-select
    v-model="model"
    :items="allItems"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';
import BOOLEAN_TYPES from '@/consts/booleanTypes';

@Observer
@Component<BooleanSelect>({
  name: 'BooleanSelect',
  props: {
    value: Boolean
  },

  watch: {
    allItems: {
      immediate: true,
      handler () {
        this.$emit('fetch:items', this.allItems);
      }
    }
  }
})
export default class BooleanSelect extends Vue {
  get model () {
    return this.$props.value;
  }

  set model (value) {
    this.$emit('input', value);
  }

  get allItems () {
    return BOOLEAN_TYPES;
  }
}
</script>

<style scoped></style>
