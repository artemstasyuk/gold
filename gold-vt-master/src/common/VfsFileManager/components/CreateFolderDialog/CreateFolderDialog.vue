<template>
  <v-dialog
    v-model="dialogOpen"
    width="400"
  >
    <template #activator="{ on }">
      <v-btn
        icon
        :disabled="disabled"
        v-on="on"
      >
        <v-icon>mdi-folder-plus-outline</v-icon>
      </v-btn>
    </template>
    <form @submit.prevent="handleCreate">
      <v-card>
        <v-card-title>{{ $t('vfsFileManager.create.createFolderDialogTitle') }}</v-card-title>
        <v-card-text>
          <!-- v-if for re-create input and focus every time -->
          <v-text-field
            v-if="dialogOpen"
            v-model="folderName"
            :placeholder="$t('vfsFileManager.create.createFolderNamePlaceholder')"
            hide-details
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
            :disabled="!folderName"
          >
            {{ $t('vfsFileManager.actions.createFolderLabel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'CreateFolderDialog',
  props: {
    rootFolderId: {
      type: Number,
      default: 1
    },
    disabled: Boolean
  }
})
export default class CreateFolderDialog extends Vue {
  dialogState: boolean = false;
  folderName: string = '';

  get dialogOpen () {
    return this.dialogState;
  }

  set dialogOpen (v: boolean) {
    this.dialogState = v;
    this.folderName = '';
  }

  async handleCreate () {
    try {
      await this.$vfs.createFolder({
        rootFolderId: this.$props.rootFolderId,
        name: this.folderName
      });
    } catch {
      //
    } finally {
      this.dialogOpen = false;
      this.$emit('reload');
    }
  }
}
</script>

<style scoped></style>
