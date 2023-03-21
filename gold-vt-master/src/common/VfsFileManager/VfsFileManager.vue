<template>
  <div class="file-manager">
    <v-layout justify-start>
      <v-flex>
        <folder-branch
          :branch="branch"
          @select="getFolder"
        />
      </v-flex>
    </v-layout>
    <v-layout
      class="file-manager__controls blue-grey lighten-5"
      align-center
    >
      <v-flex
        :xs2="!embedded"
        :xs3="embedded"
      >
        <create-folder-dialog
          v-if="folderId"
          :disabled="isFavoriteView"
          :root-folder-id="folderId"
          @reload="handleReload"
        />
        <v-btn
          icon
          :color="isFavoriteView ? 'amber' : null"
          @click="isFavoriteView = !isFavoriteView"
        >
          <v-icon>
            star
          </v-icon>
        </v-btn>
        <v-btn
          v-if="folderForMove"
          text
          icon
          :title="$t('vfsFileManager.actions.pasteLabel', ` (${filesForMove.length})`)"
          @click="handlePasteFolder"
        >
          <v-icon>
            mdi-file-replace-outline
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs="6">
        <v-text-field
          v-model="search"
          :placeholder="$t('vfsFileManager.search.placeholder')"
          prepend-inner-icon="search"
          hide-details
          solo
        />
      </v-flex>
      <v-flex
        class="pl-2"
        align-center
      >
        <v-btn-toggle
          v-model="isTiles"
          mandatory
        >
          <v-btn :value="true">
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn :value="false">
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-spacer />
      <v-flex shrink>
        <!-- insert -->
        <v-btn
          v-if="filesForMove.length > 0"
          :title="$t('vfsFileManager.actions.pasteLabel', ` (${filesForMove.length})`)"
          class="mr-2"
          @click="handlePasteFiles"
        >
          <v-icon>
            mdi-file-replace-outline
          </v-icon>
        </v-btn>

        <!-- cut -->
        <v-btn
          v-if="selectedFiles.length > 0"
          :title="$t('vfsFileManager.actions.cutLabel')"
          class="mr-2"
          @click="handleCutFiles"
        >
          <v-icon>
            mdi-file-hidden
          </v-icon>
        </v-btn>

        <delete-dialog
          :selected-files="selectedFiles"
          @delete="deleteSelectedFiles"
        />
        <upload-dialog
          v-if="folderId"
          ref="uploadDialog"
          :folder-id="folderId"
          @reload="getFiles"
        />
      </v-flex>
    </v-layout>
    <v-layout
      class="file-manager__browse"
      justify-between
    >
      <v-flex
        class="file-manager__tree"
        shrink
        :xs2="!embedded"
        :xs3="embedded"
      >
        <tree-list
          :folder="treeList"
          @select="getFolder"
          @reload="handleReload"
          @fav="changeFav"
          @edit="item => folderForEdit = item"
          @cut="item => folderForMove = item"
        />
      </v-flex>
      <v-flex
        :xs10="!embedded"
        :xs9="embedded"
        class="file-manager__list"
      >
        <component
          :is="isTiles ? 'files-tiles' : 'files-list'"
          :list="list"
          :selected="selectedFiles"
          :options="options"
          :is-loading="isLoading"
          :embedded="embedded"
          @update:options="updateOptions"
          @update:selected="handleSelectedFilesUpdate"
          @select="handleSelect"
          @delete="confirmDeleteFile"
          @edit="item => fileForEdit = item"
          @cut="handleCutFiles"
          @duplicate="handleDuplicate"
          @copy:path="handleCopyPath"
        />
      </v-flex>
      <!-- dialog and logic need this for work with nested dialogs & overlays -->
      <delete-confirm-dialog
        v-model="fileForDelete"
        @delete="deleteFile"
        @cancel="cancelDeleteFile"
      />
      <edit-file-dialog
        v-model="fileForEdit"
        @cancel="fileForEdit = null"
        @reload="handleReload"
      />
      <edit-folder-dialog
        v-model="folderForEdit"
        @cancel="folderForEdit = null"
        @reload="handleReload"
      />
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator';
import { reaction } from 'mobx';
import { IReactionDisposer } from 'mobx/lib/core/reaction';
import debounce from 'lodash/debounce';
import { FILE_MANAGER_PER_PAGE } from '@/consts/filemanager';
import AuthService from '@/services/AuthService';
import NotificationService from '@/services/NotificationService';
import { IVfsGetFilesParams } from '@/services/vfs/VfsFactory';
import TreeList from './components/TreeList/TreeList.vue';
import FolderBranch from './components/FolderBranch/FolderBranch.vue';
import FilesList from './components/FilesList/FilesList.vue';
import FilesTiles from './components/FilesTiles/FilesTiles.vue';
import UploadDialog from './components/UploadDialog/UploadDialog.vue';
import DeleteDialog from './components/DeleteDialog/DeleteDialog.vue';
import DeleteConfirmDialog from './components/DeleteConfirmDialog/DeleteConfirmDialog.vue';
import CreateFolderDialog from './components/CreateFolderDialog/CreateFolderDialog.vue';
import EditFileDialog from './components/EditFileDialog/EditFileDialog.vue';
import EditFolderDialog from '@/common/VfsFileManager/components/EditFolderDialog/EditFolderDialog.vue';
import { copyText } from '@/helpers/clipboard';
import { buildMediaUrl } from '@/helpers/utils';

@Component({
  name: 'VfsFileManager',
  components: {
    EditFolderDialog,
    CreateFolderDialog,
    EditFileDialog,
    DeleteConfirmDialog,
    DeleteDialog,
    UploadDialog,
    FilesList,
    FilesTiles,
    FolderBranch,
    TreeList
  },
  props: {
    embedded: Boolean,
    file: Object
  }
})
export default class VfsFileManager extends Vue {
  vfsTokenReactionDispose: IReactionDisposer | null = null
  isLoading: boolean = false;
  isTiles: boolean = false;
  isFavoriteView: boolean = false;
  list: Array<any> = [];
  selectedFiles: Array<any> = [];
  favoritesList: Array<any> = [];
  count: number = 0;
  folder: Record<string, any> | null = null;
  branch: Array<any> = [];
  search: string = '';
  pagination: Record<string, any> = {
    page: 1,
    itemsPerPage: FILE_MANAGER_PER_PAGE
  }

  /* Delete */
  fileForDelete: Record<string, any> | null = null;
  /* Edit */
  fileForEdit: Record<string, any> | null = null;
  folderForEdit: Record<string, any> | null = null;
  /* Move */
  filesForMove: Array<any> = [];
  folderForMove: Record<string, any> | null = null;

  $refs!: {
    uploadDialog: HTMLElement & UploadDialog
  }

  get folderId () {
    return this.folder ? this.folder.id : null;
  }

  created () {
    this.vfsTokenReactionDispose = reaction(
      () => AuthService.vfsToken,
      () => {
        // eslint-disable-next-line no-console
        console.warn('Try refresh vfs token...');
        AuthService.vfsToken && this.handleReload();
      }
    );
  }

  async mounted () {
    const { file } = this.$props;
    const { query: { filename } } = this.$route;

    if ((file && file.id) || filename) {
      try {
        let currentFileFolder;
        if (filename) {
          currentFileFolder = await this.$vfs.searchFolderByFile({
            filename: filename
          });
        } else if (file && file.id) {
          currentFileFolder = await this.$vfs.searchFolderByFileId({
            fileId: file.id
          });
        }

        if (currentFileFolder && currentFileFolder.id) {
          await this.getFolder(currentFileFolder.id);
          await this.getFavorites();
          return;
        }
      } catch {
        NotificationService.add({
          color: 'error',
          message: 'vfsFileManager.error.notFound'
        });
      }
    }

    await this.getFolder();
    await this.getFavorites();
  }

  beforeDestroy () {
    this.vfsTokenReactionDispose && this.vfsTokenReactionDispose();
  }

  get options () {
    return {
      ...this.pagination,
      totalItems: this.count,
      totalPages: Math.ceil(this.count / this.pagination.itemsPerPage) || 1
    };
  }

  set options (options: any) {
    this.pagination = {
      page: options.page,
      itemsPerPage: options.itemsPerPage
    };
  }

  get treeList () {
    if (this.isFavoriteView) {
      return {
        folders: this.favoritesList.map(i => {
          return {
            ...i,
            isFavorite: true
          };
        })
      };
    } else {
      return this.folder && this.folder.folders
        ? {
            ...this.folder,
            folders: this.folder.folders.map((i: any) => {
              return {
                ...i,
                isFavorite: this.favoritesList.some(f => f.id === i.id)
              };
            })
          }
        : this.folder;
    }
  }

  @Watch('search')
  updateFiles = debounce(async () => {
    await this.getFiles();
  }, 300)

  @Watch('isFavoriteView')
  async updateFavorites () {
    if (this.isFavoriteView) {
      await this.getFavorites();
    }
  }

  async getFavorites () {
    this.isLoading = true;
    try {
      this.favoritesList = await this.$vfs.getFavorites();
    } catch {
      //
    } finally {
      this.isLoading = false;
    }
  }

  async updateOptions (options: any) {
    const needUpdate = this.options.page !== options.page || this.options.itemsPerPage !== options.itemsPerPage;
    this.options = options;
    if (needUpdate) {
      this.isLoading = true;
      try {
        await this.getFiles();
      } catch {
        // handle update errors
      } finally {
        this.isLoading = false;
      }
    }
  }

  async getFolder (id?: number) {
    let params;
    if (id) {
      params = {
        rootFolderId: id
      };
    }
    this.isLoading = true;
    /* Reset pagination on folder walk */
    this.pagination.page = 1;

    /* Reset search on folder open */
    this.search = '';

    try {
      const folder = await this.$vfs.getFolder(params);

      if (folder) {
        this.folder = folder;
        await this.getFolderBranch();
        await this.getFiles();
      }
    } catch {
      if (id !== 1) {
        await this.getFolder(1);
      }
    } finally {
      this.isLoading = false;
    }
  }

  async getFolderBranch () {
    if (!this.folderId) return;

    const folderBranch = await this.$vfs.getFolderBranch({
      folderId: this.folderId
    });
    if (folderBranch) {
      this.branch = folderBranch;
    }
  }

  async getFiles () {
    if (!this.folderId) {
      return;
    }
    const params = {
      folderId: this.folderId,
      page: this.options.page,
      pageSize: this.options.itemsPerPage
    } as IVfsGetFilesParams;

    if (this.search) {
      params.query = this.search;
    }

    /* Clear selected & wait for delete files */
    this.selectedFiles = [];
    this.fileForDelete = null;

    this.list = await this.$vfs.getFiles(params) || [];
    this.count = await this.$vfs.countFiles(params) || 1;
  }

  async deleteSelectedFiles () {
    if (this.selectedFiles.length === 0) {
      return;
    }
    try {
      await this.$vfs.deleteFiles({
        fileIds: this.selectedFiles.map(f => f.id)
      });
      /* Update folders & files */
      this.folder && await this.getFolder(this.folderId);
    } catch {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenDeleteFiles'
      });
    } finally {
      this.selectedFiles = [];
    }
  }

  async confirmDeleteFile (file: Record<string, any>) {
    this.fileForDelete = file;
  }

  async cancelDeleteFile () {
    this.fileForDelete = null;
  }

  async deleteFile (id: number) {
    this.fileForDelete = null;
    if (!id) {
      return;
    }

    try {
      await this.$vfs.deleteFiles({
        fileIds: [id]
      });
      /* Update folders & files */
      this.folder && await this.getFolder(this.folderId);
    } catch {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenDeleteFiles'
      });
    }
  }

  handleSelectedFilesUpdate (v: Array<any>) {
    this.selectedFiles = v;
    /* If new files selected reset files list for moving */
    if (v.length > 0) {
      this.filesForMove = [];
    }
  }

  handleSelect (item: any) {
    this.$emit('select', item);

    if (this.$props.embedded) {
      /* Message for cross-origin work */
      window && window.parent && window.parent.postMessage({
        mceAction: 'selectFile',
        file: item
      }, '*');
    }
  }

  async handleReload () {
    await this.getFolder(this.folderId);
    await this.getFavorites();
  }

  async changeFav (item: any) {
    if (item.id) {
      try {
        await this.$vfs.manageFavorites({
          folderId: item.id,
          isInFavorites: !this.favoritesList.some(i => i.id === item.id)
        });
        await this.getFavorites();
      } catch (err) {
        NotificationService.add({
          color: 'error',
          message: 'vfsFileManager.error.whenManageFavorites',
          params: [err.message]
        });
      }
    }
  }

  async handlePasteFiles () {
    try {
      await this.$vfs.moveFiles({
        fileIds: this.filesForMove.map(i => i.id),
        destinationFolderId: this.folderId
      });
    } catch (err) {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenMoveFiles',
        params: [err.message]
      });
    }

    this.filesForMove = [];
    await this.handleReload();
  }

  async handlePasteFolder () {
    if (!this.folderForMove) return;

    try {
      await this.$vfs.moveFolder({
        folderId: this.folderForMove.id,
        destinationFolderId: this.folderId
      });
    } catch (err) {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenMoveFolder',
        params: [err.message]
      });
    }

    this.folderForMove = null;
    await this.handleReload();
  }

  handleCutFiles (file: Record<string, any>) {
    this.filesForMove = file.id ? [file] : [...this.selectedFiles];

    this.selectedFiles = [];
  }

  handleCopyPath (file: Record<string, any>) {
    copyText(buildMediaUrl(file.path));
    NotificationService.add({
      color: 'success',
      message: 'vfsFileManager.actions.copyPathSuccess'
    });
  }

  async handleDuplicate (item: Record<string, any>) {
    try {
      const response = await fetch(buildMediaUrl(item.path), {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
      });
      const blob = await response.blob();
      const name = `${item.name} copy.${item.extension}`;
      this.$refs.uploadDialog.files = [new File([blob], name, { type: blob.type })];
    } catch {
      NotificationService.add({
        color: 'error',
        message: 'vfsFileManager.error.whenDuplicateFile',
        params: [`${item.name}.${item.extension}`] // original file name
      });
    }
  }
}
</script>

<style lang="scss" src="./VfsFileManager.scss" />
