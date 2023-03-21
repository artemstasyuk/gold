<template>
  <v-app>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      :width="310"
      fixed
      clipped
      temporary
    >
      <slot name="drawer">
        No drawer component.
      </slot>
    </v-navigation-drawer>
    <v-app-bar
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="isDrawerOpen = !isDrawerOpen"
      />
      <v-toolbar-title class="mr-4">
        {{ title }}
      </v-toolbar-title>
      <slot
        v-if="$vuetify.breakpoint.mdAndUp"
        name="toolbarMenu"
      />
      <v-spacer />
      <slot name="toolbarMenuRight" />
      <slot name="profile" />
    </v-app-bar>
    <v-main>
      <v-container
        fill-height
        fluid
        :grid-list-md="withGridList"
      >
        <v-layout
          column
          mt-n6
        >
          <v-flex shrink>
            <slot name="breadcrumbs" />
          </v-flex>
          <slot name="content">
            <no-content />
          </slot>
        </v-layout>
      </v-container>
    </v-main>
    <!-- Image preview container -->
    <lg-preview />
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import NoContent from '@/ui/NoContent/NoContent.vue';

@Component({
  name: 'DefaultLayout',
  components: { NoContent },
  props: {
    title: String,
    withGridList: {
      type: Boolean,
      default: false
    }
  }
})
export default class DefaultLayout extends Vue {
  data () {
    return {
      isDrawerOpen: false
    };
  }
}
</script>

<style scoped></style>
