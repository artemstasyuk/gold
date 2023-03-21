<template>
  <span>
    <v-tooltip
      bottom
      open-delay="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="icon"
          v-bind="attrs"
          icon
          v-on="on"
          @click="copy(value)"
        >
          <v-icon>
            content_copy
          </v-icon>
        </v-btn>
        <span
          v-else
          v-bind="attrs"
          v-on="on"
          @click="copy(value)"
        >
          {{ value }}
        </span>
      </template>
      <span>
        {{ $t('copy-to-clipboard.hoverLabel') }}
      </span>
    </v-tooltip>
    <v-snackbar
      v-if="!noSnackbar"
      v-model="snackbar"
      timeout="1000"
    >
      {{ $t('copy-to-clipboard.doneLabel') }}
    </v-snackbar>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { copyText } from '@/helpers/clipboard';

@Component({
  name: 'CopyToClipboard',
  props: {
    value: String,
    icon: Boolean, // when true shows only copy icon, else - full content of value
    noSnackbar: Boolean // when you dont want to show snackbar
  },
  data: () => ({
    snackbar: false
  })
})
export default class CopyToClipboard extends Vue {
  copy (text: string) {
    this.$data.snackbar = true;
    copyText(text);
  }
}
</script>

<style scoped></style>
