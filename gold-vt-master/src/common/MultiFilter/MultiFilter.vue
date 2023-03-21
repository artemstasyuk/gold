<template>
  <div
    class="vt-multi-filter"
  >
    <v-autocomplete
      ref="autocomplete"
      v-model="store.filters"
      chips
      multiple
      small-chips
      return-object
      deletable-chips
      hide-details
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :menu-props="{ closeOnContentClick:true }"
      :placeholder="placeholder"
      prepend-inner-icon="search"
      v-bind="$attrs"
      class="vt-autocomplete"
      @change="store.onChange"
      @click.native="store.closePanel"
    >
      <template
        #selection="data"
      >
        <slot
          name="chip"
          :item="data.item"
          :value="store.getItemValue(data.index)"
          :chip:click="() => store.onFilterItemClick(data.item, data.index)"
          :chip:close="() => store.onRemove(data.index)"
        >
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            class="vt-multi-filter__chip"
            @click.stop="store.onFilterItemClick(data.item, data.index)"
          >
            <div class="vt-multi-filter__chip-inner">
              {{ data.item.title }} {{ store.getItemValue(data.index) }}
            </div>

            <v-icon
              size="custom"
              class="ml-2 vt-multi-filter__chip-icon"
              @click.self.stop="store.onRemove(data.index)"
            >
              mdi-close-circle
            </v-icon>
          </v-chip>
        </slot>
      </template>

      <template #item="data">
        <slot
          name="list-item"
          :item="data.item"
          :click="() => store.onItemClick(data.item)"
          :disabled="store.isItemDisabled(data.item)"
        >
          <v-list-item
            :disabled="store.isItemDisabled(data.item)"
            :class="[
              'vt-multi-filter__list-item',
              `_type_${data.item.type}`
            ]"
            @click="data.item.type !== 'divider' && store.onItemClick(data.item)"
          >
            <v-divider
              v-if="data.item.type === 'divider'"
            />
            <v-list-item-content
              v-else
            >
              <v-list-item-title
                v-html="data.item.title"
              />
              <v-list-item-subtitle
                v-html="data.item.subtitle"
              />
            </v-list-item-content>
          </v-list-item>
        </slot>
      </template>
    </v-autocomplete>

    <v-card
      v-if="store.isPanelVisible"
      v-click-outside="onClickOutside"
      class="vt-multi-filter__card pa-2"
      :class="`_type_${store.activeItem.type}`"
      @keypress.enter="onEnter"
    >
      <vt-form-field
        ref="formField"
        v-model="store.activeItem.value"
        :label="store.activeItemLabel"
        clearable
        autofocus
        without-help
        hide-details
        initially-opened
        v-bind="activeItemSettings"
        @input="onInput"
        @fetch:items="onFetchItems"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';
import { toJS } from 'mobx';

import MultiFilterStore from './MultiFilterStore';

import FormField from '@/ui/FormField/FormField.vue';

@Observer
@Component<MultiFilter>({
  name: 'MultiFilter',

  props: {
    items: {
      type: Array,
      required: true
    },

    filters: {
      type: Object,
      required: true
    },

    placeholder: {
      type: String,
      default: null
    },

    itemValue: {
      type: String,
      default: 'id'
    },

    itemText: {
      type: String,
      default: 'title'
    }
  }
})
export default class MultiFilter extends Vue {
  store = new MultiFilterStore(
    this.$props.filters,
    this.onUpdateFilters,
    this.onUpdateSettings
  );

  activeItemSettings = null

  $refs!: {
    formField: FormField
  }

  get isPanelVisible () {
    return this.store;
  }

  created () {
    this.store.setItems(this.$props.items);

    const keys = Object.keys(toJS(this.$props.filters));

    if (keys.length > 0) {
      this.store.setInitialFilters();
    }
  }

  onUpdateFilters () {
    if (this.$props.filters) {
      this.updateFilters();
    }

    this.$emit('submitFilters');
  }

  onUpdateSettings () {
    this.activeItemSettings = toJS(this.store.activeItemSettings);

    this.triggerClick();
  }

  async triggerClick () {
    await this.$nextTick();

    if (this.store.isDateTimeActive) return;

    const field = this.$refs.formField;

    if (!field) return;

    const input: HTMLInputElement = field.$el.querySelectorAll('input')[0];

    if (!input) return;

    input.click();
  }

  onClickOutside () {
    if (this.store.isDateTimeActive) {
      return;
    }

    if (this.store.isDateActive) {
      return;
    }

    this.store.closePanel();
  }

  onFetchItems (items: Array<any>) {
    this.store.setActiveItemsList(items);
  }

  onInput () {
    if (this.store.isInputActive) return;

    this.store.onChange();
  }

  onEnter () {
    if (this.store.isMultiSelectActive) {
      return this.store.onSaveActiveItemValue();
    }

    this.store.onChange();
  }

  updateFilters () {
    const newFilters = this.store.getFilterValues();

    Object.assign(this.$props.filters, newFilters);

    Object.keys(toJS(this.$props.filters)).forEach(key => {
      // Reset value
      this.$props.filters[key] = null;

      // Apply new value
      this.$props.filters[key] = newFilters[key];
    });

    console.log('updateFilters: $props.filters', this.$props.filters);
  }
}
</script>

<style lang="scss">
  .vt-multi-filter {
    position: relative;

    &__list-item {
      &._type_divider {
        min-height: 0;
      }
    }

    &__card {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(0, 100%);
      z-index: 8;
      font-weight: normal;

      &._type_date {
        visibility: hidden;
      }

      .form-field {
        > div {
          max-width: none;
          flex-basis: auto;
        }
      }
    }

    &__chip-icon {
      font-size: 18px!important;
    }

    &__chip-inner {
      max-width: 300px;
      display: block;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis; /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-weight: normal;
    }
  }
</style>
