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
      id: 'login',
      type: 'input',
      title: this.$t('user.list.filter.login'),
      value: null,
      values: null,
      settings: {
        placeholder: ''
      }
    },
    {
      id: 'lastActivityAtFrom',
      type: 'datetime',
      title: this.$t('user.list.filter.lastActivityAtFrom'),
      value: null,
      values: null,
      settings: {
        iso: true,
        placeholder: '',
        component: 'vt-datetime-picker'
      }
    },
    {
      id: 'lastActivityAtTo',
      type: 'datetime',
      title: this.$t('user.list.filter.lastActivityAtTo'),
      value: null,
      values: null,
      settings: {
        iso: true,
        placeholder: '',
        component: 'vt-datetime-picker'
      }
    },
    {
      type: 'divider'
    },
    {
      id: 'statusId',
      type: 'select',
      title: this.$t('user.list.filter.statusId'),
      value: null,
      values: null,
      settings: {
        itemValue: 'value',
        itemText: 'text',
        placeholder: '',
        component: 'vt-status-select'
      }
    }
  ].filter(Boolean)
}
</script>
