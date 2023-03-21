<template>
  <v-flex
    v-if="branch && branch.length > 0"
    class="folder-branch"
  >
    <span
      v-for="item in branch"
      :key="item.id"
      class="folder-branch__item"
    >
      <a @click="$emit('select', item.id)">{{ item.name }}</a>
    </span>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'FolderBranch',
  props: {
    branch: {
      type: Array,
      default: []
    }
  }
})
export default class FolderBranch extends Vue {}
</script>

<style lang="scss" src="./FolderBranch.scss" />
