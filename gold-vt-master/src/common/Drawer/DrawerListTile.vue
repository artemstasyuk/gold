<template>
  <v-list-item
    :to="item.name && { name: item.name }"
    v-bind="$attrs"
    @click.stop=""
  >
    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'DrawerListTile',
  props: {
    item: Object
  }
})
export default class DrawerListTile extends Vue {
  created () {
    // just example
  }
}
</script>

<style scoped></style>
