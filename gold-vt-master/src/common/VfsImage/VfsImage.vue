<template>
  <v-img
    :src="url(value.webPath)"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :min-height="minHeight"
    :min-width="minWidth"
    :alt="alt"
    :contain="contain"
    :eager="eager"
    :gradient="gradient"
    :lazy-src="lazySrc"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';
import { VfsHashImage } from '@/services/vfs/VfsHashImage';

@Component({
  name: 'VtVfsImage',
  inheritAttrs: true,
  props: {
    value: [Object, VfsHashImage],
    alt: String, // vuetify
    contain: Boolean, // vuetify
    eager: Boolean, // vuetify
    gradient: String, // vuetify
    lazySrc: String, // vuetify
    maxHeight: String, // vuetify
    maxWidth: String, // vuetify
    minHeight: String, // vuetify
    minWidth: String // vuetify
  }
})
export default class VtVfsImage extends Vue {
  url (path: string): string {
    return buildMediaUrl(path);
  }
}
</script>

<style scoped>

</style>
