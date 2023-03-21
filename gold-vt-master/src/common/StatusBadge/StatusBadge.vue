<template>
  <v-chip
    v-if="status"
    :color="status.color"
    text-color="white"
    v-bind="$attrs"
    label
  >
    {{ status.text }}
  </v-chip>
  <span v-else>{{ value }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import STATUSES from '@/consts/status';
import { Status } from '@/services/api/factory';

@Component({
  name: 'StatusBadge',
  props: {
    value: [Number, String, Status, Object]
  }
})
export default class StatusBadge extends Vue {
  get status () {
    const { value } = this.$props;
    const id = typeof value === 'object' ? value.id : value;
    return STATUSES.find(i => i.value === id);
  }
}
</script>

<style scoped></style>
