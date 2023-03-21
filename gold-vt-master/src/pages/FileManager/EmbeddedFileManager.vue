<template>
  <v-card>
    <v-card-text>
      <vt-file-manager embedded />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'EmbeddedFileManager'
})
export default class EmbeddedFileManager extends Vue {}
</script>

<style scoped></style>
