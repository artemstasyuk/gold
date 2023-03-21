<template>
  <v-menu
    bottom
    offset-y
  >
    <template #activator="{ on }">
      <v-avatar v-on="on">
        <v-icon
          flat
          dark
          @click.prevent=""
        >
          account_circle
        </v-icon>
      </v-avatar>
    </template>
    <v-list>
      <v-subheader v-if="store.userProfile">
        {{ store.userProfile.login }}
      </v-subheader>
      <v-divider v-if="store.userProfile" />
      <change-password />
      <v-list-item @click="logout">
        <v-list-item-title>
          {{ $t("toolbarProfile.logoutLabel") }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AuthService from '@/services/AuthService';
import ProfileStore from '@/common/Profile/ProfileStore';
import ChangePassword from '@/common/ChangePassword/ChangePassword.vue';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  name: 'ToolbarProfile',
  components: { ChangePassword }
})
export default class ToolbarProfile extends Vue {
  private store = ProfileStore;

  mounted () {
    if (AuthService.isAuth) {
      this.store.get();
    }
  }

  async logout () {
    await AuthService.logout();
  }
}
</script>

<style scoped></style>
