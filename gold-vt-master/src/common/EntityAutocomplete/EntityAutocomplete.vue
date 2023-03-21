<template>
  <v-autocomplete
    v-model="model"
    :items="store.items"
    :search-input.sync="store.search"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    :disabled="disabled"
    :clearable="clearable"
    :loading="store.isLoading"
    :hide-no-data="
      (store.items.length === 0 && !store.search) || store.isLoading
    "
    :placeholder="placeholder"
    :multiple="multiple"
    :small-chips="chips"
    :deletable-chips="chips"
    :error-messages="errorMessages"
    :outlined="outlined"
    :rounded="rounded"
    :solo="solo"
    :dense="dense"
    :hide-details="hideDetails"
    :filter="filter"
    prepend-inner-icon="search"
    class="vt-autocomplete"
    cache-items
    @focus="onFocus"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';
import EntityAutocompleteStore from '@/common/EntityAutocomplete/EntityAutocompleteStore';

@Observer
@Component({
  name: 'EntityAutocomplete',
  props: {
    entity: String,
    itemValue: {
      type: String,
      default: 'id'
    },
    itemText: {
      type: String,
      default: 'title'
    },
    label: String, // vuetify
    value: [Array, String, Number],
    disabled: Boolean, // vuetify
    clearable: Boolean, // vuetify,
    placeholder: String, // vuetify,
    multiple: Boolean, // vuetify
    chips: Boolean, // vuetify
    outlined: Boolean, // vuetify
    solo: Boolean, // vuetify
    dense: Boolean, // vuetify
    rounded: Boolean, // vuetify
    hideDetails: Boolean, // vuetify
    errorMessages: [Array, String],
    prefetch: Boolean,
    prefetchOnFocus: Boolean,
    limit: Number,
    searchBy: {
      type: String,
      default: 'titleLike'
    },
    searchByType: {
      type: String,
      default: 'string'
    },
    searchByMultiple: {
      type: String,
      default: 'ids'
    },
    searchAdditional: Object,
    async: Boolean
  }
})
export default class EntityAutocomplete extends Vue {
  private store: any;

  get model () {
    return Array.isArray(this.$props.value)
      ? [...this.$props.value]
      : this.$props.value;
  }

  set model (value) {
    this.$emit('input', value);
  }

  created () {
    this.store = new EntityAutocompleteStore(
      this.$props.entity,
      this.$props.searchBy,
      this.$props.searchByMultiple,
      this.$props.searchByType,
      this.$props.limit,
      this.$props.searchAdditional,
      this.$props.async,
      () => this.getItems()
    );

    if (this.$props.prefetch) {
      this.store.prefetch();
    }
  }

  getItems () {
    this.$emit('fetch:items', this.store?.items);
  }

  async onFocus () {
    if (this.$props.prefetchOnFocus) {
      this.store.prefetch();
    }
  }

  async updated () {
    if (this.model) {
      await this.store.loadSelected(this.model);
    }
  }

  filter (item: any, queryText: string, itemText: string) {
    for (const value of Object.values(item)) {
      if ((value + '').toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) {
        return true;
      }
    }
    return itemText.toLocaleLowerCase().includes(queryText.toLocaleLowerCase());
  }
}
</script>

<style lang="scss">
  .vt-autocomplete {
    .v-chip.v-size--small {
      height: auto !important;
    }
  }
</style>
