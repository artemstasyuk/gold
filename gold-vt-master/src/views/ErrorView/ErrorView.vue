<template>
  <default-layout :title="title">
    <template #drawer>
      <drawer />
    </template>
    <template #toolbarMenu>
      <toolbar-navigation />
    </template>
  </default-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DefaultLayout from '@/layouts/default.vue';
import Drawer from '@/common/Drawer/Drawer.vue';
import ToolbarNavigation from '@/common/ToolbarNavigation/ToolbarNavigation.vue';

@Component({
  name: 'ErrorView',
  components: { DefaultLayout, Drawer, ToolbarNavigation }
})
export default class ErrorView extends Vue {
  get title () {
    return this.$t('common.view.title');
  }
}
</script>

<style scoped></style>
