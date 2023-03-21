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

      <div
        v-if="fileId && file"
        class="img-handler mb-2"
      >
        <img
          v-if="fileId"
          v-preview="url(file.path)"
          :src="url(file.path)"
          preview-nav-enable="false"
        >
        <v-icon
          class="reload"
          small
          @click.stop="managerOpen = true"
        >
          mdi-reload
        </v-icon>
        <v-icon
          small
          @click="handleDelete"
        >
          delete
        </v-icon>
      </div>
      <v-btn
        v-else
        @click.stop="managerOpen = true"
      >
        <v-icon small>
          add
        </v-icon>
        {{ $t('vfsFileInput.addLabel') }}
      </v-btn>

      <v-messages
        color="error"
        :value="messages"
      />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';
import NotificationService from '@/services/NotificationService';

@Component({
  name: 'VfsImageInput',
  props: {
    value: Number,
    file: Object,
    errorMessages: String
  }
})
export default class VfsImageInput extends Vue {
  managerOpen: boolean = false;

  get messages () {
    return [
      this.$props.errorMessages
    ];
  }

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

  handleDelete () {
    this.$emit('input', null);
    this.$emit('input:file', null);
  }

  url (path: string): string {
    return buildMediaUrl(path);
  }
}
</script>

<style lang="scss" scoped>
  @import "vuetify/src/styles/settings/colors";

  .v-messages {
    margin-top: 12px;
  }

  .img-handler {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 4px;
    margin-right: 4px;
    margin-bottom: 4px;
    box-shadow: 0 0 2px gray;
    cursor: pointer;

    & img {
      max-width: 100px;
      max-height: 100px;
    }

    & .v-icon {
      position: absolute;
      bottom: 0;
      right: 0;

      &.reload {
        right: 20px;
      }

      & path {
        stroke: white;
      }
    }

    &:hover {
      & .v-icon {
        display: flex;
        color: map_get($red, "base");
        text-shadow: 0px 0px 2px;

        &.reload {
          color: white;
        }
      }
    }
  }
</style>
