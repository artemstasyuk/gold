<template>
  <v-layout
    class="py-2"
  >
    <v-flex
      v-if="hasLeading"
      xs1
    >
      <slot name="leading" />
    </v-flex>
    <v-flex
      :class="hasLeading ? 'xs2' : 'xs3'"
    >
      <slot name="label" />
    </v-flex>
    <v-flex
      :class="withoutHelp ? 'xs9' : 'xs5'"
    >
      <slot />
    </v-flex>
    <v-flex
      v-if="!withoutHelp"
      :class="hasTrailing ? 'xs3' : 'xs4'"
    >
      <slot name="help" />
    </v-flex>
    <v-flex
      v-if="hasTrailing"
      xs1
    >
      <slot name="trailing" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'FormLayout',
  props: {
    withoutHelp: [Boolean]
  }
})
export default class FormLayout extends Vue {
  get hasLeading () {
    return !!this.$slots.leading;
  }

  get hasTrailing () {
    return !!this.$slots.trailing;
  }
}
</script>

<style></style>
