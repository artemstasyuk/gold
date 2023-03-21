<template>
  <v-dialog
    v-model="model"
    width="300"
  >
    <v-card v-if="model">
      <v-card-title>{{ $t('vfsFileManager.actions.deleteConfirmation') }}</v-card-title>
      <v-card-text>
        {{ $t('vfsFileManager.actions.deleteConfirmationQuestion', `${model.name}.${model.extension}`) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click.stop="$emit('cancel')"
        >
          {{ $t('vfsFileManager.actions.cancelLabel') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="$emit('delete', model.id)"
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
  name: 'DeleteConfirmDialog',
  props: {
    value: Object
  }
})
export default class DeleteConfirmDialog extends Vue {
  get model () {
    return this.$props.value;
  }

  set model (v: any) {
    //
  }
}
</script>

<style scoped></style>
