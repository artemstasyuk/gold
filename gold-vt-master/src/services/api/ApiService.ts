import { factory } from '@/services/api/factory';
import HttpRpcClient from '@/services/api/HttpRpcClient';
import ApiLoggerStore from '@/common/ApiLogger/ApiLoggerStore';

type KeyValue = {
  [key: string]: KeyValue | any;
};

export type ApiFactoryType = ReturnType<typeof factory> & KeyValue;

export default class ApiService {
  private readonly _vfsUrl: string;
  private _client: HttpRpcClient;
  private _logger: typeof ApiLoggerStore;
  public api: ApiFactoryType;

  constructor () {
    this._client = new HttpRpcClient({
      url: `${import.meta.env.VITE_RPC_URL}`
    });

    this._logger = ApiLoggerStore;
    this._vfsUrl = import.meta.env.VITE_VFS_URL;

    if (window.location.search.indexOf('__level') > 0) {
      ApiLoggerStore.enabled = true;

      /* todo: make array of callbacks */
      this._client.onResponse = (payload: any) => {
        ApiLoggerStore.add(payload);
      };
    }

    this.api = factory(this._client.call);
  }

  setToken (token: string | null) {
    this._client.setToken(token);
  }

  setOnTokenExpire (cb: () => void) {
    this._client.onTokenExpire = cb;
  }
}
