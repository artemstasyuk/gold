<template>
  <v-flex>
    <template v-for="[key, value] in Object.entries(filters)">
      <v-chip
        :key="key"
        class="mr-2"
        small
        close
        @click:close="$emit('reset:filters', key)"
      >
        {{ entity && $t(`${entity}.list.filter.${key}`) }}:
        {{ value | formatChipValue(key) }}
      </v-chip>
    </template>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { reaction } from 'mobx';
import { Observer } from 'mobx-vue';
import TableFiltersChipsFormatter from './Formatters';
import EntityCacheService from '@/services/EntityCacheService';
import { IS_DEV } from '@/consts';

@Observer
@Component({
  name: 'FiltersChips',
  props: {
    entity: String,
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    formatChipValue: (v: any, key: string) => {
      const formatter = TableFiltersChipsFormatter[key];
      if (formatter) {
        return formatter(v);
      } else {
        // eslint-disable-next-line no-console
        IS_DEV && console.warn('Не найден форматер для', key);
      }

      if (Array.isArray(v)) {
        return v.join(', ');
      }

      return v;
    }
  }
})
export default class FiltersChips extends Vue {
  created () {
    reaction(() => EntityCacheService.store, () => this.$forceUpdate());
  }
}
</script>

<style scoped></style>
