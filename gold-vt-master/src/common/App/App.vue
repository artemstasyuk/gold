<template>
  <v-app>
    <router-view />
    <api-logger />
    <notification />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import ApiLogger from '@/common/ApiLogger/ApiLogger.vue';
import Notification from '@/common/Notification/Notification.vue';

@Component({
  components: {
    ApiLogger,
    Notification
  }
})
export default class App extends Vue {}
</script>
