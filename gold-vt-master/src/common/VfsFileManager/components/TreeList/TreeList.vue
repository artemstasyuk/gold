<template>
  <div v-if="folder">
    <div
      v-if="folder.parentId"
      class="tree-item"
    >
      <a @click="$emit('select', folder.parentId)">
        <v-icon>mdi-folder-open-outline</v-icon>
        ..
      </a>
    </div>
    <div
      v-for="item in folder.folders"
      :key="item.id"
      class="tree-item"
    >
      <v-btn
        :color="item.isFavorite ? 'amber' : null"
        text
        icon
        x-small
        @click="$emit('fav', item)"
      >
        <v-icon x-small>
          star
        </v-icon>
      </v-btn>
      <a @click="$emit('select', item.id)"><v-icon>mdi-folder-outline</v-icon>{{ item.name }}</a>
      <v-spacer />
      <v-menu close-on-click>
        <template #activator="{ on }">
          <v-btn
            class="tree-item__menu"
            text
            icon
            x-small
            v-on="on"
          >
            <v-icon x-small>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$emit('edit', item)">
            <v-list-item-title>
              <v-icon
                color="green"
                small
              >
                mdi-pencil
              </v-icon>
              {{ $t('vfsFileManager.actions.editLabel') }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="$emit('cut', item)">
            <v-list-item-title>
              <v-icon small>
                mdi-content-cut
              </v-icon>
              {{ $t('vfsFileManager.actions.cutLabel') }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="folderForDelete = item">
            <v-list-item-title>
              <v-icon
                color="red"
                small
              >
                mdi-delete
              </v-icon>
              {{ $t('vfsFileManager.actions.deleteLabel') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <delete-folder-dialog
      v-model="folderForDelete"
      @reload="handleReload"
      @cancel="folderForDelete = null"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DeleteFolderDialog from '@/common/VfsFileManager/components/DeleteFolderDialog/DeleteFolderDialog.vue';

@Component({
  name: 'TreeList',
  components: { DeleteFolderDialog },
  props: {
    folder: {
      required: true
    }
  }
})
export default class TreeList extends Vue {
  folderForDelete: Record<string, any> | null = null;
  folderForEdit: Record<string, any> | null = null;

  handleReload () {
    this.folderForDelete = null;
    this.folderForEdit = null;
    this.$emit('reload');
  }
}
</script>

<style lang="scss" src="./TreeList.scss" />
