<template>
  <v-dialog
    v-if="selectedFiles.length > 0"
    v-model="deleteConfirmationDialog"
    width="300"
  >
    <template #activator="{ on }">
      <v-btn
        color="red"
        class="mr-2"
        dark
        v-on="on"
      >
        {{ $t('vfsFileManager.actions.deleteLabel') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('vfsFileManager.actions.deleteConfirmation') }}
      </v-card-title>
      <v-card-text>
        {{ $t('vfsFileManager.actions.deleteManyConfirmationQuestion') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click.stop="deleteConfirmationDialog = false"
        >
          {{ $t('vfsFileManager.actions.cancelLabel') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="deleteFiles"
        >
          {{ $t('vfsFileManager.actions.deleteLabel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'DeleteDialog',
  props: {
    selectedFiles: {
      type: Array,
      default: () => []
    }
  }
})
export default class DeleteDialog extends Vue {
  deleteConfirmationDialog: boolean = false;

  deleteFiles () {
    this.deleteConfirmationDialog = false;
    this.$emit('delete');
  }
}
</script>
