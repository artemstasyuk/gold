<template>
  <v-list>
    <template v-for="group in list">
      <v-list-group
        v-if="group.list"
        :key="group.title"
        :value="false"
        no-action
      >
        <template #activator>
          <drawer-list-tile
            :key="group.title"
            :item="group"
            class="ml-n4"
          />
        </template>
        <template v-for="tile in group.list">
          <drawer-list-tile
            :key="tile.title"
            :item="tile"
          />
        </template>
      </v-list-group>
      <drawer-list-tile
        v-else
        :key="group.title"
        :item="group"
      />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DrawerListTile from '@/common/Drawer/DrawerListTile.vue';

@Component({
  name: 'DrawerList',
  components: { DrawerListTile },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
})
export default class DrawerList extends Vue {}
</script>

<style></style>
