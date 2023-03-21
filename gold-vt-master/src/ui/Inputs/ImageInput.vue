<template>
  <v-flex
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <v-file-input
      v-show="false"
      ref="file"
      v-bind="$attrs"
      :value="files"
      :multiple="multiple"
      :loading="loading"
      accept="image/*"
      @change="onInputChange"
    />

    <v-layout
      v-if="valueArray.length > 0"
      mb-4
    >
      <draggable
        v-model="valueArray"
        class="layout"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="item in valueArray"
              :key="item.hash"
              :cols="multiple ? 3 : 12"
              class="img-handler"
            >
              <v-img
                v-preview="url(item.webPath)"
                :src="url(item.webPath)"
                :lazy-src="url(item.webPath)"
                :height="multiple ? 92 : 200"
                class="grey darken-2"
                :contain="multiple"
                :preview-nav-enable="multiple ? 'true' : 'false'"
              >
                <!--  preview-nav-enable value is chinese tricks -->
                <v-icon
                  small
                  @click.prevent.stop="deleteFile(item.hash)"
                >
                  delete
                </v-icon>
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </draggable>
    </v-layout>

    <template v-if="uploadAvailable">
      <v-layout
        v-if="isDropZone"
        class="dropzone"
        justify-center
        align-center
        @dragover.prevent
        @drop.prevent.stop="onDrop"
      >
        <span class="dropzone-label">
          {{ $t("vtFileInput.dropzoneLabel") }}
        </span>
      </v-layout>
      <v-layout
        v-else
        mt-4
        mb-4
      >
        <v-btn
          small
          @click="openDialog"
        >
          <v-icon>add</v-icon>
          {{ buttonText }}
        </v-btn>
      </v-layout>
    </template>
  </v-flex>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import FileInput from '@/ui/Inputs/FileInput.vue';
import { resizeAndCropImageFile } from '@/helpers/utils';

@Component({
  name: 'ImageInput',
  props: {
    value: [String, Array],
    multiple: Boolean,
    imageWidth: Number,
    imageHeight: Number,
    crop: Boolean
  }
})
export default class ImageInput extends Mixins(FileInput) {
  files: Array<File> = [];

  async processInputFiles (files: Array<File>) {
    const { imageWidth: width, imageHeight: height, crop } = this.$props;
    if (width || height) {
      files = await Promise.all(files.map(file => resizeAndCropImageFile(file, { width, height, crop }))) as Array<File>;
    }

    return files;
  }
}
</script>

<style scoped lang="scss">
@import "vuetify/src/styles/settings/colors";

.dropzone {
  min-height: 66px;
  margin-top: 4px;
  border: dashed 2px map-get($blue, "darken-2");
  border-radius: 4px;

  &-label {
  }
}

.img-handler {
  cursor: pointer;

  & .v-icon {
    position: absolute;
    bottom: 0;
    right: 0;

    & path {
      stroke: white;
    }
  }

  &:hover {
    & .v-icon {
      display: flex;
      color: map_get($red, "base");
    }
  }
}
</style>
