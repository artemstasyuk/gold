<template>
  <component
    :is="enabled ? 'SlickList' : 'div'"
    :value="items"
    use-window-as-scroll-container
    v-bind="$attrs"
    class="sortable-list"
    @input="onInput"
  >
    <component
      :is="enabled ? 'SlickItem' : 'div'"
      v-for="(item, index) in items"
      :key="index"
      :index="index"
      :class="itemClass"
    >
      <slot
        :item="item"
        :index="index"
      />
    </component>
  </component>
</template>

<script lang="ts">
// https://github.com/Jexordexan/vue-slicksort
import Vue from 'vue';
import Component from 'vue-class-component';

import { SlickList, SlickItem } from 'vue-slicksort';

@Component({
  inheritAttrs: true,

  components: {
    SlickItem,
    SlickList
  },

  props: {
    items: {
      type: Array,
      required: true
    },

    enabled: {
      type: Boolean,
      default: true
    },

    itemClass: {
      type: [String, Object, Array],
      default: undefined
    }
  }
})
export default class SortableList extends Vue {
  readonly items!: any[]
  readonly enabled!: boolean
  readonly itemClass?: string | object | any[]

  onInput (items: any) {
    this.$emit('update', items);
  }
}
</script>
