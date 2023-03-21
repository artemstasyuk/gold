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
      @change="onInputChange"
    />

    <v-layout
      v-if="valueArray.length > 0"
      column
      mt-4
    >
      <draggable
        v-model="valueArray"
        class="layout column pr-2"
      >
        <div
          v-for="item in valueArray"
          :key="item.hash"
          class="file-handler mb-2"
        >
          <a
            :href="url(item.webPath)"
            target="_blank"
          >
            {{ item.webPath }}
          </a>
          <v-btn
            text
            x-small
            fab
            @click="deleteFile(item.hash)"
          >
            <v-icon small>
              delete
            </v-icon>
          </v-btn>
        </div>
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { buildMediaUrl, getFilesFromDragEvent } from '@/helpers/utils';
import _union from 'lodash/union';
import NotificationService from '@/services/NotificationService';

type ApiFile = {
  hash: string;
  webPath: string;
};

@Component({
  name: 'FileInput',
  components: {
    draggable
  },
  props: {
    value: [String, Array],
    multiple: Boolean
  }
})
export default class FileInput extends Vue {
  cache: Map<string, ApiFile> = new Map<string, ApiFile>();
  isDropZone = false;
  loading = false;
  files: Array<File> = [];

  get valueArray (): Array<ApiFile> {
    const { value } = this.$props;
    const arr = Array.isArray(value) ? value : [value];
    // @ts-ignore Map.get has return type "something | undefined"
    return arr.map(hash => this.cache.get(hash)).filter(Boolean);
  }

  set valueArray (value: Array<ApiFile>) {
    const { multiple } = this.$props;
    const newValue = multiple ? value.map((i: ApiFile) => i.hash) : value[0].hash;
    this.$emit('input', newValue);
  }

  get uploadAvailable () {
    return this.$props.multiple || this.valueArray.length === 0;
  }

  get buttonText () {
    const { multiple } = this.$props;
    return this.$t(multiple ? 'vtFileInput.addLabel' : 'vtFileInput.pickLabel');
  }

  @Watch('files')
  async uploadOnChange () {
    if (this.files.length === 0) {
      return;
    }

    const { multiple, value } = this.$props;

    this.loading = true;

    /* Upload if files has been selected */
    try {
      const result = await this.$vfsService.uploadFiles({ files: this.files });

      if (result.length > 0) {
        for (const item of result) {
          this.cache.set(item.hash, item);
        }

        const uploaded = multiple ? result.map((i: ApiFile) => i.hash) : result[0].hash;
        let newValue = uploaded;

        if (multiple) {
          newValue = _union(value, uploaded);
        }
        this.$emit('input', newValue);
        this.files = [];
      }
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
      this.loading = false;
    }
  }

  onDragEnter (e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
      this.isDropZone = true;
    }
  }

  onDragLeave () {
    this.isDropZone = false;
  }

  async onDrop (e: DragEvent) {
    const { multiple } = this.$props;
    this.isDropZone = false;
    const files = getFilesFromDragEvent(e);
    this.files = await this.processInputFiles(multiple ? files : files.slice(0, 1));
  }

  async onInputChange (files: Array<File> | File) {
    this.files = await this.processInputFiles(Array.isArray(files) ? files : [files]);
  }

  async created () {
    await this.loadCache();
  }

  async updated () {
    await this.loadCache();
  }

  async loadCache () {
    const { value } = this.$props;
    const valueArray = Array.isArray(value) ? value : [value];
    const hashList = valueArray.filter(hash => hash && !this.cache.get(hash));
    if (hashList.length > 0) {
      const result = await this.$vfs.urlByHashList({
        hashList,
        mediaType: null,
        namespace: null
      });

      if (result) {
        for (const item of result) {
          this.cache.set(item.hash, item);
        }

        /* Vue not observe set in Map, change link for reactive */
        this.cache = new Map(this.cache);
      }
    }
  }

  url (path: string) {
    return buildMediaUrl(path);
  }

  deleteFile (hash: string) {
    const { multiple } = this.$props;
    if (this.cache.has(hash)) {
      this.cache.delete(hash);
    }
    if (multiple) {
      const { value } = this.$props;

      this.$emit('input', value.filter((i: string) => i !== hash));
    } else {
      this.$emit('input', null);
    }
  }

  openDialog () {
    // @ts-ignore
    this.$refs.file.$refs.input.click();
  }

  async processInputFiles (files: Array<File>) {
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

.file-handler {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 4px;
  background: map_get($grey, "lighten-5");

  &.sortable-chosen {
    cursor: grab;
  }

  &:hover {
  }
}
</style>
