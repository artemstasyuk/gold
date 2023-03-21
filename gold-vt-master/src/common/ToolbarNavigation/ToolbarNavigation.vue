<template>
  <v-toolbar-items>
    <template v-for="group in list">
      <toolbar-navigation-dropdown
        :key="group.title"
        :group="group"
      />
    </template>
  </v-toolbar-items>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Menu from '@/consts/menu';
import ToolbarNavigationDropdown from '@/common/ToolbarNavigation/Dropdown.vue';

@Component({
  name: 'ToolbarNavigation',
  components: { ToolbarNavigationDropdown }
})
export default class ToolbarNavigation extends Vue {
  data () {
    return {
      list: Menu
    };
  }
}
</script>

<style scoped></style>
