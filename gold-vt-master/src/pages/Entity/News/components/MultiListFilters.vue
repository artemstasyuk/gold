<template>
  <vt-multi-filter
    :items="filterItems"
    :filters="filters"
    autofocus
    :label="$t('common.list.filter.title')"
    @submitFilters="$emit('submitFilters')"
  />
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import EntityListFilters from '@/common/Entity/EntityListFilters';

@Observer
@Component
export default class MultiListFilters extends EntityListFilters {
  filterItems = [
    {
      id: 'title',
      type: 'input',
      title: this.$t('news.list.filter.title'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        component: 'v-text-field'
      }
    },
    {
      id: 'alias',
      type: 'input',
      title: this.$t('news.list.filter.alias'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        component: 'vt-transliterator'
      }
    },
    {
      id: 'content',
      type: 'input',
      title: this.$t('news.list.filter.content'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        component: 'v-text-field'
      }
    },
    {
      id: 'categoryId',
      type: 'select',
      title: this.$t('news.list.filter.categoryId'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        itemText: 'text',
        itemValue: 'value',
        entity: 'category',
        searchBy: 'title',
        async: true,
        component: 'vt-entity-autocomplete'
      }
    },
    {
      id: 'createdAt',
      type: 'datetime',
      title: this.$t('news.list.filter.createdAt'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        iso: true,
        component: 'vt-datetime-picker'
      }
    },
    {
      id: 'updatedAt',
      type: 'datetime',
      title: this.$t('news.list.filter.updatedAt'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        iso: true,
        component: 'vt-datetime-picker'
      }
    },
    {
      id: 'publicationDate',
      type: 'datetime',
      title: this.$t('news.list.filter.publicationDate'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        iso: true,
        component: 'vt-datetime-picker'
      }
    },
    {
      id: 'statusId',
      type: 'select',
      title: this.$t('news.list.filter.statusId'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        itemText: 'text',
        itemValue: 'value',
        component: 'vt-status-select'
      }
    },
    {
      id: 'ids',
      type: 'select',
      title: this.$t('news.list.filter.ids'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        itemText: 'text',
        itemValue: 'value',
        component: 'v-text-field'
      }
    },
    {
      id: 'divider'
    },
    {
      id: 'notId',
      type: 'input',
      title: this.$t('news.list.filter.notId'),
      value: null,
      values: null,
      settings: {
        placeholder: '',
        component: 'v-text-field'
      }
    }
  ].filter(Boolean)
}
</script>
