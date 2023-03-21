let id = 0;

export function generateId () {
  id += 1;

  return id;
}

export interface IRpcError {
  code: number;
  data: string;
  message: string;
}

export interface IRpcRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params: object;
}

export interface IRpcResponse {
  id: number;
  result?: object;
  error?: IRpcError;
}

export function createRpcRequest (method: string, params: object): IRpcRequest {
  return {
    jsonrpc: '2.0',
    id: generateId(),
    method,
    params
  };
}
