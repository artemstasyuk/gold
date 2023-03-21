<template>
  <div class="files-tiles">
    <v-container
      fluid
      grid-list-lg
      fill-height
    >
      <v-layout
        wrap
        :style="{ height: wrapperHeight && `${wrapperHeight}px`, overflow: 'auto' }"
      >
        <v-flex
          v-for="item in list"
          :key="item.id"
          xs3
          class="five-in-line"
        >
          <v-card :title="`${item.name}.${item.extension}`">
            <a
              :href="getUrl(item)"
              target="_blank"
              @click="e => handleFileSelect(e, item)"
            >
              <v-img
                v-bind="getImageProps(item)"
                height="125"
                class="grey darken-4"
                contain
              />
            </a>
            <v-card-title class="files-tiles-card-title">
              <span :class="!checkboxModel.includes(item.id) && 'hover-only'">
                <v-checkbox
                  v-model="checkboxModel"
                  hide-details
                  class="shrink mt-0 pt-0"
                  color="primary"
                  :ripple="false"
                  :value="item.id"
                />
              </span>
              <div class="files-tiles-card-title__full">
                <span class="files-tiles-card-title__ellipsis">{{ item.name }}</span>
                <span class="file-item__ext">.{{ item.extension }}</span>
              </div>
              <span class="hover-only">
                <file-context-menu
                  :item="item"
                  @edit="$listeners.edit"
                  @cut="$listeners.cut"
                  @delete="$listeners.delete"
                  @duplicate="$listeners.duplicate"
                  @copy:path="$listeners['copy:path']"
                />
              </span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout
      class="files-tiles-pagination"
      justify-end
    >
      <v-data-footer
        :options="options"
        :pagination="pagination"
        :items-per-page-options="[10, 25, 50, 100]"
        items-per-page-text="Элементов на странице"
        @update:options="$listeners['update:options']"
      />
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buildMediaUrl } from '@/helpers/utils';
import { FILE_MANAGER_FILE_ICON_BY_EXT } from '@/consts/filemanager';
import FileContextMenu from '../FileContextMenu/FileContextMenu.vue';

@Component({
  name: 'FilesTiles',
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
export default class FilesTiles extends Vue {
  selected!: Array<any>
  list!: Array<any>
  options!: Record<string, any>

  get wrapperHeight () {
    return !this.$props.embedded ? null : 507;
  }

  get checkboxModel () {
    return this.selected.map(i => i.id);
  }

  set checkboxModel (v: Array<any>) {
    this.$emit('update:selected', this.list.filter(i => v.includes(i.id)));
  }

  get pagination () {
    const { totalItems, totalPage, page, itemsPerPage } = this.options;
    const pageStart = page > 1 ? (page - 1) * itemsPerPage : 0;
    return {
      page,
      itemsPerPage,
      itemsLength: totalItems,
      pageCount: totalPage,
      pageStart,
      pageStop: Math.min(pageStart + itemsPerPage, totalItems)
    };
  }

  getImageProps (item: Record<string, any>): { src: string, class?: string} {
    if (item.previewpath) {
      return { src: buildMediaUrl(item.previewpath) };
    }

    if (['jpg', 'png', 'gif', 'apng', 'jpeg', 'bpm', 'tiff'].includes(item.extension)) {
      return { src: buildMediaUrl(item.path) };
    }

    return {
      src: FILE_MANAGER_FILE_ICON_BY_EXT[item.extension] || FILE_MANAGER_FILE_ICON_BY_EXT.default,
      class: 'type-only'
    };
  }

  getUrl (item: Record<string, any>) {
    return buildMediaUrl(item.path);
  }

  handleFileSelect (e: Event, item: any) {
    if (this.$props.embedded) {
      e.preventDefault();
      this.$emit('select', item);
    }
  }
}
</script>

<style lang="scss" src="./FileTiles.scss" />
