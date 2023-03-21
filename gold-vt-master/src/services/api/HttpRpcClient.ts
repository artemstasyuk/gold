/* eslint-disable @typescript-eslint/no-empty-function */
import 'whatwg-fetch';

import { createRpcRequest, IRpcResponse } from '@/services/api/rpc';

import { ApiRpcError, ApiServerError } from '@/services/api/errors';
import NotificationService from '@/services/NotificationService';

export default class HttpRpcClient {
  url: string;
  token?: string | null;
  authorizationHeaderName: string = 'Authorization2';

  onResponse = (_payload: any) => {};
  onTokenExpire = () => {};

  constructor ({ url }: { url: string }) {
    this.url = url;
  }

  setToken (token: string | null) {
    this.token = token;
  }

  call = async (method: string, params: object = {}) => {
    const rpcRequest = createRpcRequest(method, params);

    const startTime = new Date();

    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(rpcRequest),
      headers: this.headers
    });

    this.onResponse({
      method,
      params,
      headers: this.headers,
      duration: Date.now() - Number(startTime),
      startTime
    });

    if (!response.ok) {
      NotificationService.add({
        message: 'errors.server',
        params: [response.status],
        color: 'error'
      });

      /* Call when api return auth error */
      if (Number(response.status) === 401 && this.onTokenExpire) {
        this.onTokenExpire();
      }
      throw new ApiServerError({ method, params, status: response.status });
    }

    const rpcResponse: IRpcResponse = await response.json();

    if (rpcResponse.error) {
      const error = rpcResponse.error;

      /* Call when api return auth error */
      if (Number(error.code) === 401 && this.onTokenExpire) {
        this.onTokenExpire();
      }

      if (Number(error.code === 500)) {
        NotificationService.add({
          message: `errors.rpc${error.code}`,
          color: 'error'
        });
      }

      throw new ApiRpcError({ method, params, error });
    }

    return rpcResponse.result;
  };

  private get headers () {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip'
    };

    if (import.meta.env.VITE_RPC_USER) {
      headers.Authorization =
        'Basic ' + btoa(`${import.meta.env.VITE_RPC_USER}:${import.meta.env.VITE_RPC_PASSWORD}`);
    }

    if (this.token) {
      headers[this.authorizationHeaderName] = this.token;
    }

    return headers;
  }
}
