import ApiService from '@/services/api';
import { ApiFactoryType } from '@/services/api/ApiService';
import { action, computed, observable, toJS } from 'mobx';
import _pickBy from 'lodash/pickBy';
import { collectTypesFromObject, typeCastByMeta } from '@/helpers/typeCast';
import { isValue } from '@/helpers/utils';
import { ViewOps } from '@/services/api/factory';
import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import NotificationService from '@/services/NotificationService';

export default class EntityCollectionStore {
  $api: ApiFactoryType = ApiService.api;
  private _meta = {
    types: {},
    viewOpsTypes: {}
  };

  @observable.ref list: Array<any> = [];
  @observable filters: any = {};
  @observable activeFilters: any = {};
  @observable viewOps: ViewOps = new ViewOps();
  @observable count = 0;
  @observable private isLoading = false;

  constructor (private _model: any, private _searchModel: any) {
    const searchModel = new this._searchModel();

    /* Collect field types */
    this._meta.types = collectTypesFromObject(searchModel);
    this._meta.viewOpsTypes = collectTypesFromObject(this.viewOps);

    /* Clean model with null */
    for (const key of Object.keys(searchModel)) {
      searchModel[key] = null;
    }
    /* Set filters object with search model fields */
    this.filters = observable.object(searchModel);
  }

  @computed
  get modelEntityName () {
    return this._model.entityName;
  }

  @computed
  get pagination () {
    return {
      descending: this.viewOps.sortDesc,
      page: this.viewOps.page,
      rowsPerPage: this.viewOps.pageSize, // -1 for All",
      sortBy: this.viewOps.sortColumn,
      totalItems: this.count,
      totalPages: Math.ceil(this.count / this.viewOps.pageSize) || 1
    };
  }

  set pagination (value) {
    const newOps = {
      page: value.page,
      pageSize: value.rowsPerPage,
      sortColumn: value.sortBy || '',
      sortDesc: value.descending
    };
    if (!_isEqual({ ...this.viewOps }, newOps)) {
      this.viewOps = newOps;
    }
  }

  /* todo: refactor this */
  @computed
  get vuetifyTableOptions () {
    return {
      ...this.pagination,
      sortBy: [this.pagination.sortBy],
      sortDesc: [this.pagination.descending],
      itemsPerPage: this.pagination.rowsPerPage
    };
  }

  @computed
  get query () {
    const filters = Object.entries(this.filters)
      .filter(([, value]) => isValue(value))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, any>
      );

    const viewOps = _isEqual({ ...this.viewOps }, { ...new ViewOps() })
      ? {}
      : Object.entries(this.viewOps)
        .filter(([, value]) => isValue(value))
        .reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
            {} as Record<string, any>
        );

    return {
      ...filters,
      ...viewOps
    };
  }

  @computed
  get activeFiltersCount () {
    return Object.values(this.activeFilters).length;
  }

  @action
  async fetch () {
    this.isLoading = true;
    const activeFilters = _pickBy(this.filters, isValue);
    try {
      const count = await this.$api[this.modelEntityName].count({
        search: activeFilters
      });
      const result = await this.$api[this.modelEntityName].get({
        search: _pickBy(this.filters, isValue),
        viewOps: this.viewOps
      });
      if (result && isValue(count)) {
        this.count = count;
        this.list = result;
      }
    } catch (err) {
      NotificationService.add({
        message: `errors.rpc${err.code}`
      });
    } finally {
      this.activeFilters = activeFilters;
      this.isLoading = false;
    }
  }

  @action
  async delete (id: number) {
    const result = await this.$api[this.modelEntityName].delete({
      id
    });
    if (result) {
      await this.fetch();
    }
  }

  @action
  resetFilters () {
    for (const key of Object.keys(this.filters)) {
      this.filters[key] = null;
    }
  }

  @action
  setStateFromQuery (query: any) {
    const viewOpsKeys = Object.keys(toJS(this.viewOps));
    const filterKeys = Object.keys(toJS(this._meta.types)) || [];
    const filters = _omit(query, viewOpsKeys);
    const viewOps = _pick(query, viewOpsKeys);
    this.filters = Object.entries(filters)
      .filter(([key, value]) => isValue(value) && filterKeys.includes(key))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = typeCastByMeta(value, key, this._meta.types);
          return acc;
        },
        {} as Record<string, any>
      );
    this.viewOps = Object.entries({ ...this.viewOps, ...viewOps }).reduce(
      (acc, [key, value]) => {
        acc[key] = typeCastByMeta(value, key, this._meta.viewOpsTypes);
        return acc;
      },
      {} as Record<string, any>
    ) as ViewOps;
  }
}
