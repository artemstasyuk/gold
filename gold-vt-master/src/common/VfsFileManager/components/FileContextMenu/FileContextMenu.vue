<template>
  <v-menu close-on-click>
    <template #activator="{ on }">
      <v-btn
        text
        x-small
        fab
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="$emit('edit', item)">
        <v-list-item-title>
          <v-icon
            color="green"
            small
          >
            mdi-pencil
          </v-icon>
          {{ $t('vfsFileManager.actions.editLabel') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="$emit('duplicate', item)">
        <v-list-item-title>
          <v-icon small>
            content_copy
          </v-icon>
          {{ $t('vfsFileManager.actions.duplicateLabel') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="$emit('cut', item)">
        <v-list-item-title>
          <v-icon small>
            mdi-file-hidden
          </v-icon>
          {{ $t('vfsFileManager.actions.cutLabel') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="$emit('delete', item)">
        <v-list-item-title>
          <v-icon
            color="red"
            small
          >
            delete
          </v-icon>
          {{ $t('vfsFileManager.actions.deleteLabel') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="$emit('copy:path', item)">
        <v-list-item-title>
          <v-icon small>
            link
          </v-icon>
          {{ $t('vfsFileManager.actions.copyPathLabel') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        :href="url(item.path)"
        target="_blank"
      >
        <v-list-item-title>
          <v-icon small>
            launch
          </v-icon>
          {{ $t('vfsFileManager.actions.previewLabel') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';

@Component({
  name: 'FileContextMenu',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
export default class FileContextMenu extends Vue {
  item!: Record<string, string>

  url (path: string): string {
    return buildMediaUrl(path);
  }
}
</script>
