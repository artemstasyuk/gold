<template>
  <default-layout :title="title">
    <template #drawer>
      <drawer />
    </template>
    <template #breadcrumbs>
      <breadcrumbs />
    </template>
    <template #content>
      <slot />
    </template>
    <template #toolbarMenu>
      <toolbar-navigation />
    </template>
    <template #profile>
      <toolbar-lang-switcher />
      <toolbar-profile />
    </template>
  </default-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DefaultLayout from '@/layouts/default.vue';
import Drawer from '@/common/Drawer/Drawer.vue';
import ToolbarNavigation from '@/common/ToolbarNavigation/ToolbarNavigation.vue';
import ToolbarProfile from '@/common/Profile/ToolbarProfile.vue';
import Breadcrumbs from '@/common/Breadcrumbs/Breadcrumbs.vue';

@Component({
  name: 'DashboardView',
  components: {
    Breadcrumbs,
    ToolbarProfile,
    ToolbarNavigation,
    Drawer,
    DefaultLayout
  }
})
export default class DashboardView extends Vue {
  get title () {
    return this.$t('common.view.title');
  }
}
</script>

<style scoped></style>
