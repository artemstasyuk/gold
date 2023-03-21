<template>
  <v-dialog
    v-model="model"
    width="300"
  >
    <v-card v-if="model">
      <v-card-title>{{ $t('vfsFileManager.actions.deleteConfirmation') }}</v-card-title>
      <v-card-text>
        {{ $t('vfsFileManager.actions.deleteFolderConfirmationQuestion', model.name) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click.stop="$emit('cancel')"
        >
          {{ $t('vfsFileManager.actions.cancelLabel') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="deleteFolder(model.id)"
        >
          {{ $t('vfsFileManager.actions.deleteLabel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotificationService from '@/services/NotificationService';

@Component({
  name: 'DeleteFolderDialog',
  props: {
    value: Object
  }
})
export default class DeleteFolderDialog extends Vue {
  get model () {
    return this.$props.value;
  }

  set model (v: any) {
    if (!v) {
      this.$emit('cancel');
    }
  }

  async deleteFolder (folderId: number) {
    if (!folderId) {
      return;
    }

    try {
      await this.$vfs.deleteFolder({
        folderId
      });
    } catch (err) {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenDeleteFolder',
        params: [err.message]
      });
    } finally {
      this.$emit('reload');
    }
  }
}
</script>
