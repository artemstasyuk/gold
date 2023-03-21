<template>
  <v-menu
    v-if="groupHasList"
    open-on-hover
    bottom
    offset-y
  >
    <template #activator="{ on }">
      <v-btn
        :to="group.name && { name: group.name }"
        text
        v-on="on"
        @click.stop=""
      >
        <span>{{ group.title }}</span>
        <v-icon dark>
          arrow_drop_down
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="item in group.list"
        :key="item.title"
        :to="{ name: item.name || defaultRoute }"
        @click.stop=""
      >
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn
    v-else
    :to="{ name: group.name || defaultRoute }"
    text
    @click.stop=""
  >
    <span>{{ group.title }}</span>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Dropdown',
  props: {
    group: {
      type: Object,
      required: true
    },
    defaultRoute: {
      type: String,
      default: 'dashboard'
    }
  }
})
export default class ToolbarNavigationDropdown extends Vue {
  get groupHasList () {
    const { group } = this.$props;
    return group.list && group.list.length > 0;
  }
}
</script>

<style scoped></style>
