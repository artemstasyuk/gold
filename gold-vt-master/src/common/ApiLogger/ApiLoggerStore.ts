import { action, computed, observable } from 'mobx';

class ApiLoggerStore {
  @observable enabled = false;
  @observable _history: Array<any> = [];

  @computed
  get history () {
    return this._history.map(request => {
      if (request.rpcResponse) {
        return { ...request, extensions: request.rpcResponse.extensions };
      }

      return { ...request, extensions: {} };
    });
  }

  @action
  add (item: any) {
    this._history.push(item);
  }
}

export default new ApiLoggerStore();
