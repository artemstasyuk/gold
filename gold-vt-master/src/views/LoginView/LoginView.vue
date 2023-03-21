<template>
  <vt-login-layout>
    <slot />
  </vt-login-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'LoginView'
})
export default class LoginView extends Vue {}
</script>

<style scoped></style>
