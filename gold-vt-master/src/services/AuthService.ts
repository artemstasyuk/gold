import { computed, observable } from 'mobx';
import ApiService from '@/services/api';
import StorageService from '@/services/StorageService';
import { IAuthLoginParams } from '@/services/api/factory';
import VfsService from '@/services/vfs';
import { getCookie } from './cookies';

class AuthService {
  @observable private _token: string | null = null;
  @observable private _vfsToken: string | null = null;

  constructor () {
    const token = StorageService.get('token');
    const vfsToken = StorageService.get('vfsToken');
    ApiService.setOnTokenExpire(() => {
      this.token = null;
    });

    VfsService.setOnTokenExpire(async () => {
      await this.getVfsToken();
    });

    if (token) {
      this.token = token;
    } else {
      const userCookie = getCookie(document.cookie, 'User');
      if (userCookie) {
        this.token = userCookie;
      }
    }

    if (vfsToken) {
      this.vfsToken = vfsToken;
    }
  }

  @computed
  get token () {
    return this._token;
  }

  set token (v: string | null) {
    ApiService.setToken(v);
    if (v === null) {
      StorageService.remove('token');
    } else {
      StorageService.set('token', v);
    }

    this._token = v;
  }

  @computed
  get vfsToken () {
    return this._vfsToken;
  }

  set vfsToken (v: string | null) {
    VfsService.setToken(v);
    if (v === null) {
      StorageService.remove('vfsToken');
    } else {
      StorageService.set('vfsToken', v);
    }

    this._vfsToken = v;
  }

  @computed
  get isAuth () {
    return !!this.token;
  }

  async login (params: IAuthLoginParams) {
    const result = await ApiService.api.auth.login(params);

    if (result) {
      this.token = result;
      await this.getVfsToken();
    }
  }

  async logout () {
    if (this.isAuth) {
      /* todo: wait success logout or just clear token ? */
      await ApiService.api.auth.logout();
      this.token = null;
    }
  }

  async getVfsToken () {
    const vfsResult = await ApiService.api.auth.vfsAuthToken();
    if (vfsResult) {
      this.vfsToken = vfsResult;
    }
  }
}

export default new AuthService();
