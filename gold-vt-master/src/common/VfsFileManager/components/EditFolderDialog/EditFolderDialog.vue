<template>
  <v-dialog
    v-model="dialogOpen"
    width="400"
  >
    <form @submit.prevent="handleUpdate">
      <v-card v-if="dialogOpen">
        <v-card-title>{{ $t('vfsFileManager.update.folderDialogTitle') }}</v-card-title>
        <v-card-text>
          {{ $t('vfsFileManager.update.fileDialogText', title) }}
          <!-- v-if for re-create input and focus every time -->
          <v-text-field
            v-if="dialogOpen"
            v-model="model"
            :placeholder="$t('vfsFileManager.update.folderNamePlaceholder')"
            hide-details
            autofocus
            autocomplete="off"
            solo
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click.stop="dialogOpen = false"
          >
            {{ $t('vfsFileManager.actions.cancelLabel') }}
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            :disabled="!model"
          >
            {{ $t('vfsFileManager.actions.editLabel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotificationService from '@/services/NotificationService';

@Component({
  name: 'EditFolderDialog',
  props: {
    value: Object
  }
})
export default class EditFolderDialog extends Vue {
  title: string = '';

  get dialogOpen () {
    return this.$props.value;
  }

  set dialogOpen (v: boolean) {
    if (!v) {
      this.$emit('cancel');
    }
  }

  get model () {
    return this.$props.value ? this.$props.value.name : '';
  }

  set model (v: string) {
    this.$emit('input', { ...this.$props.value, name: v });
  }

  updated () {
    if (this.$props.value !== null) {
      if (!this.title) {
        this.title = this.model;
      }
    } else {
      this.title = '';
    }
  }

  async handleUpdate () {
    try {
      await this.$vfs.renameFolder({
        folderId: this.$props.value.id,
        name: this.model
      });
    } catch (err) {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenUpdateFolder',
        params: [err.message]
      });
    } finally {
      this.dialogOpen = false;
      this.$emit('reload');
    }
  }
}
</script>
