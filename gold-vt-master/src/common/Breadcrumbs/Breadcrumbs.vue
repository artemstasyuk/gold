<template>
  <v-layout
    align-start
    justify-center
  >
    <v-flex
      xs12
      md8
    >
      <v-breadcrumbs
        :items="currentBreadcrumbs"
        divider=">"
        class="pl-0 pb-0 pr-0"
      >
        <template #item="{ item }">
          <v-breadcrumbs-item
            append
            :to="{ name: item.name }"
            exact
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import _get from 'lodash/get';

@Component({
  name: 'Breadcrumbs',
  props: {
    items: Array
  }
})
export default class Breadcrumbs extends Vue {
  get currentBreadcrumbs () {
    const breadcrumbs = _get(this, '$route.meta.breadcrumbs', ['dashboard']);

    return breadcrumbs.map((routeName: string) => {
      return {
        text: this.$t(`breadcrumbs.${routeName}`),
        name: routeName
      };
    });
  }
}
</script>

<style scoped></style>
