<template>
  <v-dialog
    ref="dialog"
    :value="$props.open"
    persistent
    width="400px"
  >
    <v-card>
      <v-card-title>Смена пароля</v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="onChangePassword"
        >
          <v-text-field
            v-model="form.password"
            prepend-icon="lock"
            type="password"
            :label="$t('user.form.newPasswordLabel')"
            :error-messages="error"
            :disabled="isLoading"
            @input="error = ''"
          />
        </v-form>
        <v-layout
          mt-4
          wrap
          justify-end
        >
          <v-btn
            text
            color="primary"
            mt-2
            @click="closeModal"
          >
            {{ $t("common.form.cancelLabel") }}
          </v-btn>
          <v-btn
            text
            color="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="onChangePassword"
          >
            {{ $t("common.form.saveAndCloseButtonLabel") }}
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AuthService from '@/services/AuthService';

interface IForm {
  password: string
}

@Component({
  name: 'ChangePasswordModal',
  props: {
    open: Boolean
  }
})
export default class ChangePasswordModal extends Vue {
  isLoading = false

  form: IForm = {
    password: ''
  }

  error = ''

  async onChangePassword () {
    const isValid = this.validate();
    if (!isValid) return;

    this.isLoading = true;

    try {
      AuthService.token = await this.$api.auth.changePassword(this.form);
      this.closeModal();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  validate () {
    if (this.form.password && (this.form.password.length < 4 || !(/^\S+$/.test(this.form.password)))) {
      this.error = this.$t('errors.validation.format');
    }

    if (!this.form.password) {
      this.error = this.$t('errors.validation.required');
    }

    return Boolean(!this.error);
  }

  closeModal () {
    this.form.password = '';
    this.error = '';
    this.$emit('update:open', false);
  }
}
</script>
