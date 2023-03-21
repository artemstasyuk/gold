<template>
  <v-dialog
    v-model="dialogOpen"
    width="400"
  >
    <form @submit.prevent="handleUpdate">
      <v-card>
        <v-card-title>{{ $t('vfsFileManager.update.fileDialogTitle') }}</v-card-title>
        <v-card-text v-if="dialogOpen">
          {{ $t('vfsFileManager.update.fileDialogText', title) }}
          <!-- v-if for re-create input and focus every time -->
          <v-text-field
            v-if="dialogOpen"
            v-model="model"
            :placeholder="$t('vfsFileManager.update.fileNamePlaceholder')"
            :error-messages="[errorMessage]"
            :hide-details="!errorMessage"
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
  name: 'EditFileDialog',
  props: {
    value: Object
  }
})
export default class EditFileDialog extends Vue {
  errorMessage: string = ''
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
    return this.$props.value ? this.$props.value.relpath : '';
  }

  set model (v: string) {
    this.$emit('input', { ...this.$props.value, relpath: v });
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
      await this.$vfs.setFilePhysicalName({
        fileId: this.$props.value.id,
        name: `${this.model}.${this.$props.value.extension}`
      });

      this.dialogOpen = false;
      this.errorMessage = '';
      this.$emit('reload');
    } catch (err) {
      this.errorMessage = err.message;

      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenUpdateFile',
        params: [err.message]
      });
    }
  }
}
</script>
