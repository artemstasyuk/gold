import ApiService from '@/services/api';
import { ApiFactoryType } from '@/services/api/ApiService';
import { action, computed, observable, toJS } from 'mobx';
import { IFieldError } from '@/services/api/factory';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import NotificationService from '@/services/NotificationService';
import { ApiRpcError } from '@/services/api/errors';
import { collectTypesFromObject, typeCastObjectByMeta } from '@/helpers/typeCast';

export interface IEntityModelStore<T> {
  entityName: string;
  model: T;
  defaultModel: T;
  errors: Record<string, any>;
  formError: string | null;
  $api: ApiFactoryType;
}

export default class EntityModelStore<T> implements IEntityModelStore<T> {
  entityName: string;
  @observable _model!: T;
  @observable _defaultModel!: T;
  @observable errors: any = {};
  @observable isLoading = false;
  @observable formError: string | null = null;
  $api: ApiFactoryType = ApiService.api;
  _meta = {
    types: {}
  };

  get model () {
    return this._model;
  }

  set model (value) {
    this._model = observable.object(value);
  }

  get defaultModel () {
    return this._defaultModel;
  }

  set defaultModel (value) {
    this._defaultModel = observable.object(value);
  }

  constructor (Model: any) {
    this.entityName = Model.entityName;
    this.create(Model);
  }

  protected create (Model: any) {
    const model = new Model();
    this._meta.types = collectTypesFromObject(model);

    /* Clean model with null */
    for (const key of Object.keys(model)) {
      model[key] = null;
    }

    this.model = model;
    this.defaultModel = model;
  }

  @action
  async getById (id: number) {
    try {
      this.isLoading = true;
      const result = await this.$api[this.entityName].getByID({
        id
      });

      if (result) {
        this.model = result as T;
        this.defaultModel = result as T;
        return true;
      }
    } catch (err) {
      this.rpcErrorProcess(err);
    } finally {
      this.isLoading = false;
    }

    return false;
  }

  @action
  async add () {
    try {
      this.isLoading = true;
      const validate = await this.validate();
      if (validate) {
        const result = await this.$api[this.entityName].add({
          [this.entityName]: typeCastObjectByMeta(this.model, this._meta.types)
        });
        if (result) {
          this.model = result as T;
          this.defaultModel = result as T;
        }
        return result;
      }
      return this.isValid;
    } catch (err) {
      this.rpcErrorProcess(err);
    } finally {
      this.isLoading = false;
    }
    return false;
  }

  @action
  async update () {
    try {
      this.isLoading = true;
      const validated = await this.validate();
      if (validated) {
        const result = await this.$api[this.entityName].update({
          [this.entityName]: typeCastObjectByMeta(this.model, this._meta.types)
        });
        if (result) {
          /* update method response with boolean, not model */
          this.defaultModel = { ...toJS(this.model) } as T;
        }
        return result;
      }
      return this.isValid;
    } catch (err) {
      this.rpcErrorProcess(err);
    } finally {
      this.isLoading = false;
    }
    return false;
  }

  @action
  async delete () {
    // @ts-ignore
    const id = this.model.id;
    if (id) {
      return this.$api[this.entityName].delete({
        id
      });
    }
  }

  @action
  async validate () {
    /* Reset all errors */
    this.errors = {};

    try {
      const result: Array<any> = await this.$api[this.entityName].validate({
        [this.entityName]: typeCastObjectByMeta(this.model, this._meta.types)
      });
      if (result) {
        this.errors = result.reduce(
          (acc, item: IFieldError) => {
            /* not chain .filter because "TS2538: Type null cannot be used as an index type" */
            if (item.field) {
              acc[item.field] = [item.error];
            }
            return acc;
          },
          {} as Record<string, Array<string | null>>
        );
      }
      return this.isValid;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Validate error:', err);
      this.rpcErrorProcess(err);
    }
    return false;
  }

  @computed
  get isChanged () {
    return !isEqual(
      pickBy(toJS(this.model), (i: any) => i),
      pickBy(toJS(this.defaultModel), (i: any) => i)
    );
  }

  @computed
  get isValid () {
    return Object.keys(this.errors).length === 0;
  }

  rpcErrorProcess (e: ApiRpcError) {
    if (e.code === 400) {
      NotificationService.add({
        message: `errors.rpc${e.code}`
      });
    }
  }
}
