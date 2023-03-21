<template>
  <div>
    <v-data-table
      v-model="model"
      :headers="headers"
      :items="list"
      :options="options"
      :server-items-length="options.totalItems"
      :loading="isLoading"
      :footer-props="{
        itemsPerPageOptions: [10, 25, 50, 100]
      }"
      show-select
      :dense="embedded"
      :height="listHeight"
      :class="{ disabled: isLoading }"
      @update:options="e => $emit('update:options', e)"
    >
      <template #item.name="{ item }">
        <a
          :href="url(item.path)"
          target="_blank"
          class="file-item"
          @click="e => handleFileSelect(e, item)"
        >{{ item.name }}<span class="file-item__ext">.{{ item.extension }}</span></a>
      </template>
      <template #item.date="{ item }">
        <span>{{ item.date }}</span>
      </template>
      <template #item.size="{ item }">
        <span>{{ item.sizeH.join('') }}</span>
      </template>
      <template #item.action="{ item }">
        <file-context-menu
          :item="item"
          @edit="$listeners.edit"
          @cut="$listeners.cut"
          @delete="$listeners.delete"
          @duplicate="$listeners.duplicate"
          @copy:path="$listeners['copy:path']"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';
import FileContextMenu from '@/common/VfsFileManager/components/FileContextMenu/FileContextMenu.vue';

@Component({
  name: 'FilesList',
  components: { FileContextMenu },
  props: {
    list: {
      type: Array,
      default: []
    },
    selected: {
      type: Array,
      default: []
    },
    options: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    embedded: Boolean,
    isLoading: Boolean
  }
})
export default class FilesList extends Vue {
  fileForEdit: Record<string, any> | null = null;
  headers: Record<string, any> = [
    {
      text: this.$t('vfsFileManager.list.headers.name'),
      align: 'left',
      value: 'name',
      sortable: false
    },
    {
      text: this.$t('vfsFileManager.list.headers.size'),
      align: 'left',
      value: 'sizeH',
      width: '100px',
      sortable: false
    },
    {
      text: this.$t('vfsFileManager.list.headers.date'),
      align: 'left',
      value: 'date',
      width: '150px',
      sortable: false
    },
    {
      text: '',
      value: 'action',
      sortable: false,
      align: 'right',
      width: '50px'
    }
  ]

  get model () {
    return this.$props.selected;
  }

  set model (value) {
    this.$emit('update:selected', value);
  }

  get listHeight () {
    return !this.$props.embedded ? null : 507;
  }

  url (path: string): string {
    return buildMediaUrl(path);
  }

  handleFileSelect (e: Event, item: any) {
    if (this.$props.embedded) {
      e.preventDefault();
      this.$emit('select', item);
    }
  }
}
</script>

<style lang="scss">
  @import "vuetify/src/styles/styles";

  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  .file-item {
    text-decoration: none;

    &:hover {
      color: map-get($blue, 'darken-1');

      & .file-item__ext {
        color: map-get($blue, 'darken-1');
      }
    }

    &__ext {
      color: map-get($grey, 'lighten-1');
    }
  }
</style>
