<template>
  <vt-dashboard-view>
    <v-layout justify-center>
      <v-flex
        lg10
        xs12
      >
        <h2 class="ellipsed mr-1">
          VFS
        </h2>
        <v-card>
          <v-card-text>
            <vt-file-manager />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </vt-dashboard-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'FileManager'
})
export default class FileManager extends Vue {}
</script>

<style scoped></style>
