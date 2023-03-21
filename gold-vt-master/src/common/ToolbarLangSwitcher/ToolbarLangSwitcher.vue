<template>
  <v-menu
    v-if="canSwitch"
    bottom
    offset-y
  >
    <template #activator="{ on }">
      <v-btn
        text
        icon
        tile
        v-on="on"
        @click.stop=""
      >
        <span> {{ $vuetify.lang.current }}</span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="item in langs"
        :key="item.key"
        @click="switchTo(item.key)"
      >
        <v-list-item-title v-text="item.key" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { SUPPORTED_LOCALES } from '@/consts';
import ToolbarNavigationDropdown from '@/common/ToolbarNavigation/Dropdown.vue';
import Storage from '@/services/StorageService';

@Component({
  name: 'ToolbarLangSwitcher',
  components: { ToolbarNavigationDropdown }
})
export default class ToolbarLangSwitcher extends Vue {
  get langs () {
    return SUPPORTED_LOCALES.map(k => {
      return { key: k };
    });
  }

  get canSwitch () {
    return SUPPORTED_LOCALES.length > 1;
  }

  switchTo (lang: string) {
    if (SUPPORTED_LOCALES.includes(lang)) {
      this.$vuetify.lang.current = lang;
      Storage.set('language', lang);
    }
  }
}
</script>

<style scoped></style>
