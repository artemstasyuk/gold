<template>
  <drawer-list :list="list" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import DrawerList from '@/common/Drawer/DrawerList.vue';
import Menu from '@/consts/menu';

@Component({
  components: {
    DrawerList
  }
})
export default class Drawer extends Vue {
  list = Menu
}
</script>

<style scoped></style>
