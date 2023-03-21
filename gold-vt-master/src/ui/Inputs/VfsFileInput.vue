<template>
  <v-layout
    mt-4
    mb-4
  >
    <v-flex>
      <!-- Update if exist -->
      <v-dialog
        v-model="managerOpen"
        width="70vw"
      >
        <template #activator="{ on }">
          <div
            class="file-handler mb-2"
          >
            <a
              v-if="fileId"
              :href="url(file.path)"
              target="_blank"
            >
              {{ file.name }}.{{ file.extension }}
            </a>
            <v-btn
              :text="Boolean(fileId)"
              :x-small="Boolean(fileId)"
              :small="Boolean(!fileId)"
              :fab="Boolean(fileId)"
              v-on="on"
            >
              <v-icon small>
                {{ fileId ? 'mdi-reload' : 'add' }}
              </v-icon>
              {{ !fileId ? $t('vfsFileInput.addLabel') : '' }}
            </v-btn>
            <v-btn
              v-if="fileId"
              text
              x-small
              fab
              @click="$emit('input', null)"
            >
              <v-icon small>
                delete
              </v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>{{ $t('vfsFileInput.managerHeading') }}</v-card-title>
          <v-card-text>
            <vt-file-manager
              :file="file"
              embedded
              @select="handleSelect"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';
import NotificationService from '@/services/NotificationService';

@Component({
  name: 'VfsFileInput',
  props: {
    value: Number,
    file: Object
  }
})
export default class VfsFileInput extends Vue {
  managerOpen: boolean = false;

  get fileId () {
    return this.$props.value;
  }

  handleSelect (file: any) {
    if (file && file.id) {
      this.$emit('input', file.id);
      this.$emit('input:file', file);
    } else {
      NotificationService.add({
        color: 'warning',
        message: 'vfsFileInput.error.file'
      });
    }
    this.managerOpen = false;
  }

  url (path: string): string {
    return buildMediaUrl(path);
  }
}
</script>

<style scoped></style>
