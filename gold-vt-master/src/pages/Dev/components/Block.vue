<template>
  <v-card class="mb-2">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-flex v-if="tag">
        <code>&lt;{{ tag }} /&gt;</code>
      </v-flex>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Block',
  props: {
    title: String,
    tag: String
  }
})
export default class Block extends Vue {}
</script>

<style scoped></style>
