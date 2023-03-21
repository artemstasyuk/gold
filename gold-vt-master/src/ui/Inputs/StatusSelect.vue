<template>
  <v-radio-group
    v-if="compactMode"
    v-model="model"
    :error-messages="errorMessages"
    v-bind="$attrs"
  >
    <v-radio
      v-for="item in allItems"
      :key="item.value"
      :value="item.value"
      :label="item.text"
      color="primary"
    />
  </v-radio-group>
  <v-select
    v-else
    v-model="model"
    :items="allItems"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import STATUSES from '@/consts/status';
import { Observer } from 'mobx-vue';

@Observer
@Component<StatusSelect>({
  name: 'StatusSelect',
  props: {
    value: [Number, Array],
    items: {
      type: Array,
      default: () => []
    },
    compact: Boolean,
    errorMessages: [Array, String]
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
export default class StatusSelect extends Vue {
  get model () {
    return this.$props.value;
  }

  set model (value) {
    this.$emit('input', value);
  }

  get allItems () {
    const { items } = this.$props;
    return [...STATUSES, ...items];
  }

  get compactMode () {
    const { compact } = this.$props;
    return compact && this.allItems.length <= 2;
  }
}
</script>

<style scoped></style>
