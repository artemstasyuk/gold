<template>
  <v-dialog
    v-model="fileDialogOpen"
    :persistent="loading || !!selectedImage"
    width="70vw"
    height="70vh"
  >
    <v-card class="uploaded-files-list">
      <v-overlay
        :value="loading"
        absolute
        light
        z-index="10"
      >
        <v-progress-circular
          indeterminate
          size="32"
        />
      </v-overlay>
      <v-card-title>{{ $t('vfsFileManager.upload.filesListLabel') }}</v-card-title>
      <v-card-text>
        <v-container
          fluid
          grid-list-lg
          fill-height
        >
          <v-layout
            wrap
            :style="{ height: `500px`, overflow: 'auto' }"
          >
            <v-flex
              v-for="item in processedFiles"
              :key="item.file.name"
              xs2
            >
              <v-card
                :title="`${item.file.name}`"
                :ripple="item.editable"
                :hover="item.editable"
                @click.native="() => {
                  if (item.editable) {
                    selectedImage = item;
                  }
                }"
              >
                <v-img
                  :src="item.src"
                  height="125"
                  :class="['grey', 'darken-4', item.class]"
                  contain
                />
                <v-card-title class="uploaded-files-list-title">
                  <div class="uploaded-files-list-title__full">
                    <span class="uploaded-files-list-title__ellipsis">{{ item.file.name }}</span>
                  </div>
                  <span v-if="item.editable">
                    <v-icon small>mdi-pencil-outline</v-icon>
                  </span>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-dialog
          v-model="cropDialogOpen"
          width="70vw"
          persistent
        >
          <v-card>
            <v-card-title>{{ $t('vfsFileManager.upload.imageEditLabel') }}</v-card-title>
            <v-card-text class="uploaded-files-list-cropper">
              <vt-image-cropper
                v-if="selectedImage"
                :src="selectedImage.src"
                :type="selectedImage.file.type"
                :view-mode="1"
                :img-style="{ height: '500px', display: 'block', maxWidth: '100%' }"
                :auto-crop="false"
                background
                center
                toggle-drag-mode-on-dblclick
                @change="onCropperChange"
                @close="selectedImage = null"
              />
            </v-card-text>
            <v-card-actions />
          </v-card>
        </v-dialog>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :loading="loading"
          color="success"
          @click="$emit('upload')"
        >
          Загрузить ({{ files.length }})
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { FILE_MANAGER_FILE_ICON_BY_EXT } from '@/consts/filemanager';
import { readFileAsync } from '@/helpers/utils';

type ProcessedFile = {
  file: File
  src: string
  class?: string,
  editable?: boolean
}

@Component({
  name: 'UploadedFilesList',
  props: {
    files: {
      type: Array,
      required: true
    },
    loading: Boolean
  }
})
export default class UploadedFilesList extends Vue {
  files!: Array<File>
  processedFiles: Array<ProcessedFile> = []
  selectedImage: ProcessedFile | null = null

  get fileDialogOpen () {
    return this.files.length > 0;
  }

  set fileDialogOpen (v) {
    this.selectedImage = null;
    this.$emit('close');
  }

  get cropDialogOpen () {
    return !!this.selectedImage;
  }

  set cropDialogOpen (v: boolean) {
    this.selectedImage = null;
  }

  async getImageProps (item: File): Promise<{ src: string, class?: string, editable?: boolean}> {
    if (item.type.includes('image')) {
      const buffer = await readFileAsync(item);
      if (buffer) {
        return { src: buffer as string, editable: true };
      }
    }

    const ext = item.name.split('.').slice(-1)[0];
    return {
      src: FILE_MANAGER_FILE_ICON_BY_EXT[ext] || FILE_MANAGER_FILE_ICON_BY_EXT.default,
      class: 'type-only',
      editable: false
    };
  }

  @Watch('files')
  async onFilesChange () {
    this.processedFiles = await Promise.all(this.files.map(async (file: File) => {
      const props = await this.getImageProps(file);
      return {
        file,
        ...props
      };
    }));
  }

  async onCropperChange (blob: Blob) {
    if (blob && this.selectedImage) {
      const newFile = new File([blob], this.selectedImage.file.name, { type: this.selectedImage.file.type });
      const newFilesArray = [...this.files];
      const fileIndex = newFilesArray.indexOf(this.selectedImage.file);
      if (fileIndex !== -1) {
        newFilesArray[fileIndex] = newFile;
      }
      this.$emit('update', newFilesArray);
      this.selectedImage = null;
    }
  }
}
</script>

<style lang="scss" src="./UploadedFilesList.scss" />
