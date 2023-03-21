<template>
  <v-radio-group
    v-if="compactMode"
    v-model="model"
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
import { Observer } from 'mobx-vue';

@Observer
@Component({
  name: 'RatingSelect',
  props: {
    value: Number,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    compact: Boolean
  }
})
export default class RatingSelect extends Vue {
  min!: number
  max!: number

  get model () {
    return this.$props.value;
  }

  set model (value) {
    this.$emit('input', value);
  }

  get allItems () {
    let min = 1;
    let max = 5;
    if (this.min < this.max) {
      min = this.min;
      max = this.max;
    }
    return [...Array.from({ length: (max - min) + 1 }).keys()].map(v => {
      return {
        value: v + min,
        text: String(v + min)
      };
    });
  }

  get compactMode () {
    const { compact } = this.$props;
    return compact && this.allItems.length <= 2;
  }
}
</script>

<style scoped></style>
