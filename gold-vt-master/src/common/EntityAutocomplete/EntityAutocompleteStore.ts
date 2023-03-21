import { action, observable, reaction } from 'mobx';
import ApiService from '@/services/api';
import { ApiFactoryType } from '@/services/api/ApiService';
import _debounce from 'lodash/debounce';
import EntityCacheService from '@/services/EntityCacheService';
import NotificationService from '@/services/NotificationService';
import { ApiRpcError } from '@/services/api/errors';

export default class EntityAutocompleteStore {
  private $api: ApiFactoryType = ApiService.api;
  @observable.ref items: Array<any> = [];
  @observable search: string | null = null;
  @observable isLoading = false;

  constructor (
    private entity: string,
    private searchBy: string,
    private searchByMultiple: string,
    private searchByType: string,
    private limit: number = 500,
    private searchAdditional: object = {},
    private async: boolean = false,
    private onFetchItems: () => void = () => {}
  ) {
    if (this.async) {
      reaction(() => this.search, () => this.searchRequest());
    }

    reaction(
      () => this.items,
      () => this.onFetchItems()
    );
  }

  @action
  async searchRequest () {
    if (!this.search) {
      // return;
    }

    this.isLoading = true;
    await this.debouncedGet();
  }

  async prefetch () {
    await this.get();
  }

  @action
  async get () {
    try {
      const searchByObj = {
        [this.searchBy]: this.searchByType === 'number' ? Number.parseInt(this.search !== null ? this.search : '') : this.search
      };
      const params = {
        viewOps: {
          pageSize: this.limit
        },
        search: {
          ...searchByObj, ...this.searchAdditional
        }
      };
      this.items = await this.$api[this.entity].get(params);
      this.cacheItems();
    } catch (err) {
      this.processError(err);
    } finally {
      this.isLoading = false;
    }
  }

  debouncedGet = _debounce(this.get, 500);

  // @action
  async loadSelected (id: any) {
    const ids: Array<string | number> = Array.isArray(id) ? id : [id];

    /* Filters items already in list */
    const idsForLoad = ids.filter(id => {
      return !this.items.some(i => i.id === id);
    });

    if (idsForLoad.length === 0) {
      return;
    }

    /* Try load item and add in list, for present */
    try {
      const selected = await this.$api[this.entity].get({
        viewOps: {
          pageSize: this.limit
        },
        search: {
          [this.searchByMultiple]: idsForLoad
        }
      });
      if (selected) {
        this.items = [...selected, ...this.items];
        this.cacheItems();
      }
    } catch (err) {
      this.processError(err);
    }
  }

  cacheItems () {
    for (const item of this.items) EntityCacheService.set(this.entity, item);
  }

  processError (err: ApiRpcError) {
    if (!err.code) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    NotificationService.add({
      color: 'error',
      message: err.code ? `errors.rpc${err.code}` : 'errors.unknown'
    });
  }
}
