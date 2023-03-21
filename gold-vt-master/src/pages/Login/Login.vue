<template>
  <vt-login-view>
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-toolbar-title>
          {{ $t("login.formLabel") }}
        </v-toolbar-title>
        <v-spacer />
        <toolbar-lang-switcher />
      </v-toolbar>
      <v-form @submit.prevent="auth">
        <v-card-text>
          <v-text-field
            v-model="store.login"
            prepend-icon="person"
            name="login"
            autocomplete="username"
            :label="$t('login.loginFieldLabel')"
            type="text"
            :disabled="store.isLoading"
          />
          <v-text-field
            id="password"
            v-model="store.password"
            prepend-icon="lock"
            name="password"
            autocomplete="current-password"
            :label="$t('login.passwordFieldLabel')"
            type="password"
            :disabled="store.isLoading"
          />
          <v-switch
            v-model="store.remember"
            :label="$t('login.rememberFieldLabel')"
            :disabled="store.isLoading"
            color="primary"
          />
          <v-alert
            :value="!!store.formError"
            color="error"
            icon="warning"
            outlined
          >
            {{ store.formError && $t(i18nFormError(store.formError)) }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            type="submit"
            :disabled="store.isLoading"
            :loading="store.isLoading"
          >
            {{ $t("login.submitButtonLabel") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </vt-login-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LoginStore from '@/pages/Login/LoginStore';
import { getI18nFormError } from '@/consts/errors';

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  private store = LoginStore;
  private i18nFormError = getI18nFormError;

  mounted () {
    this.store.reset();
  }

  async auth () {
    if (await this.store.send()) {
      this.$router.replace(String(this.$route.query.back || '/'));
    }
  }
}
</script>

<style scoped></style>
