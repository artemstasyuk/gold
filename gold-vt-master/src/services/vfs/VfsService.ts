import HttpRpcClient from '@/services/api/HttpRpcClient';
import { factory } from './VfsFactory';
import { ApiServerError } from '@/services/api/errors';
import _defaults from 'lodash/defaults';

type KeyValue = {
  [key: string]: KeyValue | any;
};

type UploadFilesOptions = {
  files: Array<File>;
  hash?: boolean;
  body?: Record<string, any>;
}

const defaultUploadFileOptions = {
  files: [],
  hash: true,
  body: {}
};

export type VfsFactoryType = ReturnType<typeof factory> & KeyValue;

export default class VfsService {
  private _client: HttpRpcClient
  private _vfsUrl: string = import.meta.env.VITE_VFS_URL || ''
  private _vfsHashUploadUrl: string = import.meta.env.VITE_VFS_HASH_UPLOAD_URL || ''
  private _vfsFileUploadUrl: string = import.meta.env.VITE_VFS_FILE_UPLOAD_URL || ''
  private _vfsAuthorizationHeader: string = import.meta.env.VITE_VFS_AUTHORIZATION_HEADER || 'AuthorizationJWT'
  api: VfsFactoryType

  constructor () {
    this._client = new HttpRpcClient({
      url: `${this._vfsUrl}`
    });

    this._client.authorizationHeaderName = this._vfsAuthorizationHeader;

    this.api = factory(this._client.call);
  }

  inject (target: any) {
    target.prototype.$vfsService = this;
    target.prototype.$vfs = this.api.vfs;
  }

  setToken (token: string | null) {
    this._client.setToken(token);
  }

  setOnTokenExpire (cb: () => void) {
    this._client.onTokenExpire = cb;
  }

  async uploadFiles (options: UploadFilesOptions) {
    const { files, hash, body } = _defaults(options, defaultUploadFileOptions);
    return Promise.all(
      files.map(async (f: File) => {
        const uploadUrl = hash ? this._vfsHashUploadUrl : this._vfsFileUploadUrl;
        const data = new FormData();
        if (body) {
          for (const k of Object.keys(body)) {
            if (body[k]) {
              data.append(k, JSON.stringify(body[k]));
            }
          }
        }
        data.append('Filedata', f);
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: data,
          headers: {
            [this._client.authorizationHeaderName]: String(this._client.token)
          }
        });

        if (!response.ok) {
          /* Call when api return auth error */
          if (Number(response.status) === 401 && this._client.onTokenExpire) {
            this._client.onTokenExpire();
          }

          throw new ApiServerError({
            method: 'uploadFiles',
            params: files,
            status: response.status
          });
        }

        return response.json();
      })
    );
  }
}
