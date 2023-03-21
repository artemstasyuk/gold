<template>
  <div class="upload-dialog">
    <v-btn
      color="success"
      @click="openDialog"
    >
      {{ $t('vfsFileManager.actions.addLabel') }}
    </v-btn>
    <v-file-input
      v-show="false"
      ref="file"
      :multiple="true"
      type="file"
      @change="onInputChange"
    />
    <div
      ref="dropzone"
      :class="['upload-dialog__dropzone', { 'enable': fileOver }]"
      @dragover.prevent
      @drop.prevent.stop="onDrop"
    >
      {{ $t('vfsFileManager.upload.dropzoneText') }}
    </div>
    <uploaded-files-list
      :files="files"
      :loading="isLoading"
      @close="() => { files = []}"
      @upload="uploadFiles"
      @update="newFiles => {
        files = newFiles;
      }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getFilesFromDragEvent } from '@/helpers/utils';
import NotificationService from '@/services/NotificationService';
import UploadedFilesList from './components/UploadedFilesList/UploadedFilesList.vue';

type ApiFile = {
  id: number;
  path: string;
};

@Component({
  name: 'UploadDialog',
  components: { UploadedFilesList },
  props: {
    folderId: {
      type: Number,
      required: true
    }
  }
})
export default class UploadDialog extends Vue {
  $refs!: {
    dropzone: HTMLElement,
    file: Element & {
      $refs: { input: HTMLElement }
    }
  }

  dialog: boolean = false;
  isLoading: boolean = false;
  files: Array<File> = [];
  fileOver: boolean = false;

  get manager (): Element {
    return document.querySelectorAll('.file-manager')[0];
  }

  mounted () {
    document.addEventListener('dragenter', this.onDragEnter);
    document.addEventListener('dragleave', e => {
      if (!e.screenX) {
        this.onDragLeave();
      }
    });
  }

  beforeDestroy () {
    document.removeEventListener('dragenter', this.onDragEnter);
  }

  onDragEnter (_e: Event) {
    this.fileOver = true;
    document.removeEventListener('dragenter', this.onDragEnter);
  }

  onDragLeave () {
    this.fileOver = false;
    document.addEventListener('dragenter', this.onDragEnter);
  }

  openDialog () {
    this.$refs.file.$refs.input.click();
  }

  onDrop (e: DragEvent) {
    this.files = getFilesFromDragEvent(e);
    this.onDragLeave();
  }

  async onInputChange (files: Array<File> | File) {
    this.files = Array.isArray(files) ? files : [files];
  }

  async uploadFiles () {
    if (this.files.length === 0 || !this.$props.folderId) {
      return;
    }

    this.isLoading = true;

    /* Upload if files has been selected */
    try {
      await this.$vfsService.uploadFiles({
        files: this.files,
        hash: false,
        body: {
          folderId: this.$props.folderId
        }
      });
    } catch (err) {
      let template = 'errors.unknown';
      let code;

      /* HTTP errors */
      if (err.status) {
        template = 'errors.server';
        code = err.status;
      }

      NotificationService.add({
        message: template,
        params: [code],
        color: 'error'
      });
    } finally {
      this.isLoading = false;
      this.dialog = false;
      this.files = [];
      this.$emit('reload', this.$props.folderId);
    }
  }
}
</script>

<style lang="scss" src="./UploadDialog.scss" />
