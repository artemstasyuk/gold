export interface IApiServerErrorParams {
  method: string;
  params: any;
  status: any;
}

export interface IApiRpcErrorParams {
  method: string;
  params: any;
  error: any;
}

export class ApiRpcError extends Error {
  method: string;
  params: object;
  code: number;
  data: string;
  message: any;

  constructor ({ method, params, error }: IApiRpcErrorParams) {
    super();

    this.name = 'ApiRpcError';
    this.message = `Method "${method}" returned code ${error.code} because ${error.data}.`;
    this.method = method;
    this.params = params;
    this.code = error.code;
    this.data = error.data;
    this.message = error.message;
  }
}

export class ApiServerError extends Error {
  method: string;
  params: object;
  status: number;

  constructor ({ method, params, status }: IApiServerErrorParams) {
    super();

    this.name = 'ApiServerError';
    this.message = `Method "${method}" returned status ${status}.`;
    this.method = method;
    this.params = params;
    this.status = status;
  }
}

export class ApiConnectionError extends Error {
  event: object;

  constructor (event: any) {
    super();
    this.name = 'ApiConnectionError';
    this.message = 'Api connection error';
    this.event = event;
  }
}
