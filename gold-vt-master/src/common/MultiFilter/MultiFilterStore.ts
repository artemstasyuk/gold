import { action, computed, observable, reaction, toJS } from 'mobx';
import { format } from 'date-fns';
import cloneDeep from 'lodash/cloneDeep';

import EntityAutocompleteStore from '../EntityAutocomplete/EntityAutocompleteStore';

import { IStaticItems, StaticType } from './types';
import { customStaticValues } from './customValues';
import { generalStaticValues } from './generalValues';
import { parseDateFromTimeZone } from '@/helpers/date';

interface IFilterItem {
  id: string,
  type: FilterType,
  title: string,
  value: string | boolean | number | Array<any>
  values?: Array<any>,
  selected: boolean,
  settings: any,
  shownDate?: string
}

type FilterType =
    | 'date'
    | 'input'
    | 'select'
    | 'boolean'
    | 'default'
    | 'checkbox'
    | 'datetime'
    | 'multi-select'

const FILTERS_WITH_SELECT = new Set(['multi-select', 'select', 'boolean']);

export default class MultiFilterStore {
  @observable.shallow
  items: Array<IFilterItem> = [];

  @observable.shallow
  activeItemsList: Array<any> = [];

  @observable
  isLoading = false;

  @observable.ref filters: IFilterItem[] = []

  @observable.ref
  activeItem = {} as IFilterItem

  @observable.ref
  activeItemSettings = {} as IFilterItem['settings']

  @observable
  isPanelVisible = false

  @observable
  isDebug = false

  constructor (
      private initialFilters: any,
      private onUpdateFilters: () => void,
      private updateSettings: () => void
  ) {
    reaction(
      () => this.hasActiveItem,
      (value) => {
        if (!value) return;

        this.openPanel();
      }
    );

    reaction(
      () => this.activeItemSettings,
      () => {
        this.updateSettings();
      }
    );
  }

  @computed
  get hasActiveItem () {
    if (this.isDebug) {
      console.log('hasActiveItem', Boolean(this.activeItem.id));
    }

    return Boolean(this.activeItem.id);
  }

  @computed
  get isInputActive () {
    return this.activeItem.type === 'input';
  }

  @computed
  get isDateActive () {
    return this.activeItem.type === 'date';
  }

  @computed
  get isDateTimeActive () {
    return this.activeItem.type === 'datetime';
  }

  @computed
  get isMultiSelectActive () {
    return this.activeItem.type === 'multi-select';
  }

  @computed
  get activeItemLabel () {
    if (this.isDateActive) {
      return null;
    }

    return this.activeItem?.title;
  }

  @action.bound
  setItems (items: IFilterItem[]) {
    this.items = items;
  }

  @action.bound
  onRemove (itemIndex: number) {
    this.filters = this.filters.reduce((acc, filter, index) => {
      if (itemIndex === index) {
        return acc;
      }

      acc.push(filter);

      return acc;
    }, [] as IFilterItem[]);

    this.closePanel();
    this.onUpdateFilters();
  }

  @action.bound
  openPanel () {
    this.isPanelVisible = true;

    if (this.isDebug) {
      console.log('openPanel', this.isPanelVisible);
    }
  }

  @action.bound
  closePanel () {
    this.isPanelVisible = false;

    this.resetActiveItem();

    if (this.isDebug) {
      console.log('closePanel', this.isPanelVisible);
    }
  }

  @action.bound
  resetActiveItem () {
    if (this.isDebug) {
      console.log('resetActiveItem');
    }

    this.activeItem = {} as IFilterItem;
    this.activeItemsList = [];
    this.activeItemSettings = {} as IFilterItem['settings'];
  }

  @action.bound
  onSelectActiveFilter (item: IFilterItem) {
    if (this.isDebug) {
      console.log('onSelectActiveFilter', item);
    }

    this.activeItem = { ...item };
    this.activeItemSettings = { ...item.settings };
  }

  @action.bound
  onSelectCheckboxFilter (item: IFilterItem) {
    if (this.isDebug) {
      console.log('onSelectCheckboxFilter', item);
    }

    const newItem = {
      ...item,
      value: !item.value
    };

    this.filters = this.filters
      ? [...this.filters, newItem]
      : [newItem];

    if (this.isDebug) {
      console.log('onSelectCheckboxFilter:filters', this.filters);
    }

    this.onUpdateFilters();
  }

  @action.bound
  onSelectBooleanFilter (item: IFilterItem) {
    if (this.isDebug) {
      console.log('onSelectBooleanFilter', item);
    }

    const newItem = {
      ...item,
      value: true,
      values: generalStaticValues['vt-boolean-select'].items
    };

    this.filters = this.filters
      ? [...this.filters, newItem]
      : [newItem];

    if (this.isDebug) {
      console.log('onSelectBooleanFilter:filters', this.filters);
    }

    this.onUpdateFilters();
  }

  @action.bound
  onSaveActiveItemValue () {
    if (this.isDebug) {
      console.log('onSaveActiveItemValue', this.activeItem);
    }

    const filters = this.filters || [];
    const isSelected = this.filters.some(item => item.id === this.activeItem.id);
    const itemCopy = {
      ...cloneDeep(this.activeItem),
      values: this.getActiveListItemById()
    };

    if (isSelected) {
      this.filters = filters.map(item => {
        if (item.id === this.activeItem.id) {
          item = itemCopy;
        }

        return item;
      });
    } else {
      this.filters.push(itemCopy);
    }

    this.reset();
    this.onUpdateFilters();

    if (this.isDebug) {
      console.log('onSaveActiveItemValue:filters', this.filters);
    }
  }

  @action.bound
  onMultiSelectChange () {
    if (this.isDebug) {
      console.log('onMultiSelectChange', this.activeItem);
    }

    this.activeItem = {
      ...this.activeItem,
      values: this.getActiveListItemById()
    };
    this.activeItemSettings = { ...this.activeItem.settings };

    if (this.isDebug) {
      console.log('onMultiSelectChange:activeItem', this.activeItem);
    }
  }

  @action.bound
  onChange () {
    if (this.isDebug) {
      console.log('change', this.activeItem.value);
    }

    if (this.activeItem.value === null || this.activeItem.value === undefined) return;

    if (Array.isArray(this.activeItem.value) && this.activeItem.value.length === 0) return;

    switch (this.activeItem.type) {
      case 'multi-select': this.onMultiSelectChange(); break;
      default: this.onSaveActiveItemValue();
    }
  }

  @action.bound
  reset () {
    if (this.isDebug) {
      console.log('reset');
    }

    this.closePanel();
  }

  @action.bound
  setActiveItemsList (items: Array<any>) {
    if (this.isDebug) {
      console.log('setActiveItemsList', items);
    }

    this.activeItemsList = items;
  }

  @action.bound
  getActiveListItemById () {
    const { value } = this.activeItem;
    const { itemValue } = this.activeItemSettings;

    const ids: Array<string | number> = Array.isArray(value)
      ? value
      : [value];

    const idKey = itemValue || 'id';

    if (this.isMultiSelectActive) {
      return this.activeItemsList.filter((item: any) =>
        ids.includes(item[idKey])
      );
    }

    return [this.activeItemsList.find((item: any) =>
      ids.includes(item[idKey])
    )];
  }

  @action.bound
  getFilterValues () {
    return this.filters.reduce((acc, filter) => {
      const key = filter.id;
      acc[key] = filter.value;

      return acc;
    }, {} as any);
  }

  @action.bound
  async setInitialFilters () {
    if (this.isDebug) {
      console.log('setInitialFilters');
    }

    await Promise.all([
      ...Object.keys(toJS(this.initialFilters)).map(async key => {
        const index = this.items.findIndex(item => item.id === key);

        if (index === -1) return null;

        const item = this.items[index];
        item.selected = true;
        const value = this.initialFilters[key];
        let values = [];

        if (FILTERS_WITH_SELECT.has(item.type)) {
          values = await this.loadFilterItem(item, value);
        }

        const newItem = {
          ...item,
          value,
          values
        };

        this.filters = this.filters
          ? [...this.filters, newItem]
          : [newItem];

        return key;
      })
    ]);
  }

  @action.bound
  onFilterItemClick (item: IFilterItem, index: number) {
    if (this.isDebug) {
      console.log('onFilterItemClick', item, index);
    }

    if (this.isPanelVisible) return;

    const filterItem = this.filters[index];

    switch (item.type) {
      case 'checkbox': return;
      default: this.onSelectActiveFilter(filterItem);
    }
  }

  @action.bound
  onItemClick (item: IFilterItem) {
    if (this.isDebug) {
      console.log('onItemClick', item);
    }

    switch (item.type) {
      case 'boolean': this.onSelectBooleanFilter(item); break;
      case 'checkbox': this.onSelectCheckboxFilter(item); break;
      default: this.onSelectActiveFilter(item);
    }
  }

  async loadFilterItem (item: IFilterItem, value: any): Promise<any> {
    const { component } = item.settings;

    if (component === 'vt-entity-autocomplete') {
      return await this.loadEntityItem(item, value);
    }

    if (Object.keys(generalStaticValues).includes(component)) {
      return await this.loadStatisticItem(component, item, value, generalStaticValues);
    }

    if (Object.keys(customStaticValues).includes(component)) {
      return await this.loadStatisticItem(component, item, value, customStaticValues);
    }

    return Array.isArray(value) ? value : [value];
  }

  async loadEntityItem (item: IFilterItem, value: any) {
    if (this.isDebug) {
      console.log('loadEntityItem: item', item);
      console.log('loadEntityItem: value', value);
    }

    const {
      entity,
      searchBy = 'titleLike',
      searchByType = 'string',
      searchByMultiple = 'ids'
    } = item.settings;

    const store = new EntityAutocompleteStore(
      entity,
      searchBy,
      searchByMultiple,
      searchByType
    );

    await store.loadSelected(value);

    return store.items;
  }

  loadStatisticItem (
    component: StaticType,
    item: IFilterItem,
    value: any,
    staticValues: IStaticItems
  ) {
    const {
      items = [],
      itemValue
    } = item.settings;

    const staticItems = staticValues[component].items;

    const allItems = [...staticItems, ...items];

    return [allItems.find(item => item[itemValue] === value)];
  }

  isItemDisabled (item: IFilterItem) {
    const filterItem = this.filters.find(filter => filter.id === item.id);

    return Boolean(filterItem);
  }

  getItemValue (index: number) {
    const filterItem = this.filters[index];

    if (filterItem.type === 'checkbox') {
      return '';
    }

    if (filterItem.type === 'datetime' && filterItem.settings.iso) {
      const date = parseDateFromTimeZone(filterItem.value as string);
      return `: ${format(new Date(date), 'dd.MM.yyyy HH:mm:ss')}`;
    }

    if (['multi-select'].includes(filterItem.type)) {
      const textKey = filterItem.settings.itemText || 'title';
      return `: ${filterItem.values?.map((value: any) => value[textKey]).join(', ')}`;
    }

    if (['select'].includes(filterItem.type)) {
      const textKey = filterItem.settings.itemText || 'title';
      const values = filterItem.values;
      const firstValue = values ? values[0] : '';
      return `: ${firstValue[textKey]}`;
    }

    if (filterItem.type === 'boolean') {
      const textKey = filterItem.settings.itemText || 'title';
      const valueKey = filterItem.settings.itemValue || 'value';
      const activeItem = filterItem.values?.find((value: any) => value[valueKey] === filterItem.value);
      return `: ${activeItem[textKey]}`;
    }

    return `: ${filterItem.value}`;
  }
}
