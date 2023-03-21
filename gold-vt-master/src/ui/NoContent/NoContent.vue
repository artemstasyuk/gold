<template>
  <v-layout
    align-center
    justify-center
  >
    Нет содержимого или модуля.
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'NoContent'
})
export default class NoContent extends Vue {}
</script>

<style scoped></style>
