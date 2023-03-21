<template>
  <div>
    <v-tooltip
      v-if="hover"
      :max-width="maxWidth"
      color="#FFFFFF"
      bottom
    >
      <template #activator="{ on, attrs, value }">
        <v-btn
          v-bind="attrs"
          icon
          v-on="on"
          @click="copy(copyValue)"
        >
          <v-icon
            :color="value ? 'accent' : null"
          >
            info
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          {{ value }}
          <slot />
        </v-card-text>
      </v-card>
    </v-tooltip>
    <v-menu
      v-else
      offset-y
      :max-width="maxWidth"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          icon
          v-on="on"
        >
          <v-icon
            color="accent"
          >
            info
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-actions
          v-if="copyValue"
        >
          <v-spacer />
          <copy-to-clipboard
            :value="copyValue"
            icon
            no-snackbar
          />
        </v-card-actions>
        <v-card-text>
          {{ value }}
          <slot />
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CopyToClipboard from '@/common/CopyToClipboard/CopyToClipboard.vue';
import { copyText } from '@/helpers/clipboard';

@Component({
  name: 'InfoBtn',
  components: { CopyToClipboard },
  props: {
    value: { type: String },
    copyValue: { type: String },
    hover: { type: Boolean },
    maxWidth: {
      type: Number,
      default: 250
    }
  }
})
export default class InfoBtn extends Vue {
  copy (text: string) {
    if (text != null) {
      copyText(text);
    }
  }
}
</script>

<style scoped></style>
