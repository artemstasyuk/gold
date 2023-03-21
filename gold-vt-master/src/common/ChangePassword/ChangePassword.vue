<template>
  <div>
    <div @click.stop="modal = true">
      <slot>
        <v-list-item @click.prevent>
          <v-list-item-title>
            Сменить пароль
          </v-list-item-title>
        </v-list-item>
      </slot>
    </div>
    <change-password-modal :open.sync="modal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import ChangePasswordModal from './components/ChangePasswordModal/ChangePasswordModal.vue';

@Component({
  name: 'ChangePassword',
  components: { ChangePasswordModal }
})
export default class ChangePassword extends Vue {
  data () {
    return {
      modal: false
    };
  }
}
</script>
