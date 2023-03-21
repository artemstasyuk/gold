<template>
  <v-snackbar
    v-if="service.current"
    v-model="service.notification"
    :color="service.current.color"
    :timeout="service.current.timeout || 6000 "
  >
    <v-badge
      :content="service.queueLen"
      :color="service.current.color"
    >
      {{
        !service.current.raw
          ? service.current.message
          : $t(service.current.message, ...(service.current.params || []))
      }}
    </v-badge>
    <template #action>
      <v-btn
        dark
        small
        text
        @click.stop="onClose"
      >
        <v-icon>{{ service.isLast ? "close" : "navigate_next" }}</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotificationService from '@/services/NotificationService';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  name: 'Notification'
})
export default class Notification extends Vue {
  service = NotificationService;

  onClose () {
    NotificationService.notification = false;
  }
}
</script>

<style scoped></style>
