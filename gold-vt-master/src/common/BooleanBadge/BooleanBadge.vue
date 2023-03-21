<template>
  <v-chip
    :color="booleanValue ? 'success' : 'grey'"
    text-color="white"
    v-bind="$attrs"
    label
  >
    {{ $t(`booleanBadge.${booleanValue}`) }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { toBoolean } from '@/helpers/typeCast';

@Component({
  name: 'BooleanBadge',
  props: {
    value: [Boolean, Number, String]
  }
})
export default class BooleanBadge extends Vue {
  get booleanValue () {
    return toBoolean(this.$props.value);
  }
}
</script>

<style scoped></style>
